import { supabase } from "../supabaseClient";
import { OrderPayload } from "../types";

export const createOrder = async (orderData: OrderPayload) => {
  const insertPayload = {
    full_name: orderData.fullName,
    email: orderData.email,
    phone: orderData.phone,
    address: orderData.address,
    city: orderData.city,
    postal_code: orderData.postalCode,
    notes: orderData.notes || null,
    total: orderData.total,
    order_items: orderData.items, // array of objects -> stored as jsonb
  };

  const { data, error } = await supabase
    .from("orders")
    .insert(insertPayload)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
