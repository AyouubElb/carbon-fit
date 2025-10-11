import { OrderPayload, OrderSheetPayload } from "../types";
import { appendOrderToSheet } from "./google-sheets";
import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const supabaseAdmin = createBrowserClient(url, key);

export const createOrder = async (orderData: OrderPayload) => {
  const insertPayload = {
    full_name: orderData.fullName,
    phone: orderData.phone,
    address: orderData.address,
    city: orderData.city,
    notes: orderData.notes ?? null,
    total: orderData.total,
    order_items: orderData.items,
  };

  // Insert into DB
  const { data, error } = await supabaseAdmin
    .from("orders")
    .insert(insertPayload)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data || !("id" in data)) {
    throw new Error("Failed to insert order (no data returned).");
  }
  // Attempt to append to Google Sheets synchronously
  try {
    const orderForSheet: OrderSheetPayload = {
      fullName: data.full_name ?? orderData.fullName,
      phone: data.phone ?? orderData.phone,
      address: data.address ?? orderData.address,
      city: data.city ?? orderData.city,
      notes: data.notes ?? orderData.notes,
      items: data.order_items ?? orderData.items,
      total: data.total ?? orderData.total,
      status: data.status ?? "Pending",
      created_at: data.created_at ?? new Date().toISOString(),
    };

    await appendOrderToSheet(orderForSheet);
  } catch (sheetsErr) {
    // Sheets append failed — attempt compensating rollback (delete the inserted order)
    try {
      const { error: deleteError } = await supabaseAdmin
        .from("orders")
        .delete()
        .eq("id", data.id);

      if (deleteError) {
        // If deletion failed, throw a composite error
        throw new Error(
          `Failed to append order to Google Sheets: ${
            (sheetsErr as Error).message ?? String(sheetsErr)
          }. Additionally, attempted rollback (delete) failed: ${
            deleteError.message
          }`
        );
      }
    } catch (deleteThrows) {
      throw new Error(
        `Failed to append order to Google Sheets: ${
          (sheetsErr as Error).message ?? String(sheetsErr)
        }. Attempted rollback also failed: ${String(deleteThrows)}`
      );
    }

    // If deletion succeeded
    throw new Error(
      `Failed to append order to Google Sheets: ${
        (sheetsErr as Error).message ?? String(sheetsErr)
      }. Order insertion was rolled back.`
    );
  }

  return data;
};
