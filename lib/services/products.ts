import { supabase } from "../supabaseClient";

export async function getBrands() {
  const { data, error } = await supabase.from("brands").select();
  if (error) throw error;
  return data;
}

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, title, price, originalPrice, onSale, images, description, brands(name), sizes, created_at"
    );
  if (error) throw error;
  return data;
}

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  onSale: boolean;
  brands: { name: string };
  images: string[];
  description: string;
  sizes: string[];
  created_at: Date;
}

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, title, price, originalPrice, onSale, images, description, brands(name), sizes, created_at"
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error.message);
    return data;
  }

  return data;
};
