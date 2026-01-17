import { z } from "zod";

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  onSale: boolean;
  brands: { name: string };
  images: string[];
  description: string;
  sizes: string[];
  colors?: string[];
  created_at?: string | Date;
}

export interface Brand {
  id: string;
  name: string;
  image: string;
}

export const orderSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters long"),
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  city: z.string().min(2, "City must be at least 2 characters long"),
  notes: z.string().max(500, "Notes must be at most 500 characters long"),
});

export type OrderFormData = z.infer<typeof orderSchema>;

export interface OrderItem {
  product_id: string;
  product_title: string;
  product_price: number;
  product_image: string;
  size: string;
  color?: string | null;
  quantity: number;
}

export interface OrderPayload extends OrderFormData {
  items: OrderItem[];
  total: number;
}

export interface OrderSheetPayload extends OrderPayload {
  status: string | "Pending";
  created_at: string;
}
