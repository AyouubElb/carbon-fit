// lib/api/orders.api.ts
import { supabase } from "@/lib/supabaseClient";
import { OrderPayload } from "@/lib/types";

export const ordersApi = {
  async createOrder(orderData: OrderPayload) {
    const insertPayload = {
      full_name: orderData.fullName,
      phone: orderData.phone,
      address: orderData.address,
      city: orderData.city,
      notes: orderData.notes ?? null,
      total: orderData.total,
      order_items: orderData.items,
    };

    const { data, error } = await supabase
      .from("orders")
      .insert(insertPayload)
      .select()
      .single();

    if (error) throw error;

    // Queue Google Sheets sync asynchronously (don't block)
    if (data) {
      // Use API route for background job
      fetch("/api/sync-order-to-sheets", {
        method: "POST",
        body: JSON.stringify({ orderId: data.id }),
      }).catch(console.error); // Fire and forget
    }

    return data;
  },
};
