import { NextRequest, NextResponse } from "next/server";
import { appendOrderToSheet } from "@/lib/services/google-sheets";
import { OrderSheetPayload } from "@/lib/types";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    // Fetch the full order details from Supabase
    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (fetchError) {
      console.error("Error fetching order:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch order details" },
        { status: 500 }
      );
    }

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Prepare order data for Google Sheets
    const orderForSheet: OrderSheetPayload = {
      fullName: order.full_name,
      phone: order.phone,
      address: order.address,
      city: order.city,
      notes: order.notes,
      items: order.order_items,
      total: order.total,
      status: order.status ?? "Pending",
      created_at: order.created_at ?? new Date().toISOString(),
    };

    // Append to Google Sheets
    await appendOrderToSheet(orderForSheet);

    // Update order to mark as synced
    await supabase
      .from("orders")
      .update({ synced_to_sheets: true, synced_at: new Date().toISOString() })
      .eq("id", orderId);

    console.log(`Order ${orderId} successfully synced to Google Sheets`);

    return NextResponse.json({
      success: true,
      message: "Order synced to Google Sheets",
    });
  } catch (error) {
    console.error("Google Sheets sync error:", error);

    // Log the error but don't fail - the order is already in the database
    return NextResponse.json(
      {
        error: "Failed to sync order to Google Sheets",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
