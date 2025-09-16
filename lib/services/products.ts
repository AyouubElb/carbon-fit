import { supabase } from "../supabaseClient";

export async function getBrands() {
  const { data, error } = await supabase.from("brands").select();
  if (error) throw error;
  return data;
}

interface Brand {
  name: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  onSale: boolean;
  brands: Brand;
  images: string[];
  description: string;
  sizes: string[];
  created_at?: string | Date;
}

interface SupabaseProductRow {
  id?: unknown;
  title?: unknown;
  price?: unknown;
  originalPrice?: unknown;
  onSale?: unknown;
  images?: unknown;
  description?: unknown;
  brands?: { name: unknown } | { name: unknown }[] | unknown;
  sizes?: unknown;
  created_at?: unknown;
  [key: string]: unknown;
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, title, price, originalPrice, onSale, images, description, brands(name), sizes, created_at"
    );

  if (error) throw error;
  if (!data) return [];

  const rows = data as SupabaseProductRow[];

  const products = rows.map<Product>((row) => {
    // pick first brand if array, or use object / fallback
    const rawBrand = Array.isArray(row.brands)
      ? row.brands[0]
      : (row.brands as { name: unknown } | undefined);

    return {
      id: String(row.id ?? ""),
      title: String(row.title ?? ""),
      price: Number(row.price ?? 0),
      originalPrice:
        row.originalPrice !== undefined && row.originalPrice !== null
          ? Number(row.originalPrice)
          : undefined,
      onSale: Boolean(row.onSale),
      images: Array.isArray(row.images) ? row.images.map(String) : [],
      description: String(row.description ?? ""),
      brands: { name: String((rawBrand?.name ?? "") as unknown) },
      sizes: Array.isArray(row.sizes) ? row.sizes.map(String) : [],
      created_at: row.created_at ? String(row.created_at) : undefined,
    };
  });

  return products;
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
    return null;
  }

  if (!data) return null;

  const row = data as SupabaseProductRow;

  // Normalize brand: if row.brands is an array pick first item, otherwise use object, fallback to empty name
  let brandObj = { name: "" };
  if (Array.isArray(row.brands)) {
    brandObj =
      row.brands.length > 0
        ? { name: String((row.brands[0] as { name: unknown }).name ?? "") }
        : brandObj;
  } else if (row.brands && typeof row.brands === "object") {
    brandObj = { name: String((row.brands as { name: unknown }).name ?? "") };
  }

  const product: Product = {
    id: String(row.id ?? ""),
    title: String(row.title ?? ""),
    price: Number(row.price ?? 0),
    originalPrice:
      row.originalPrice !== undefined && row.originalPrice !== null
        ? Number(row.originalPrice)
        : undefined,
    onSale: Boolean(row.onSale),
    images: Array.isArray(row.images)
      ? (row.images as unknown[]).map(String)
      : [],
    description: String(row.description ?? ""),
    brands: brandObj, // normalized to single object
    sizes: Array.isArray(row.sizes) ? (row.sizes as unknown[]).map(String) : [],
    created_at: row.created_at ? String(row.created_at) : undefined,
  };

  return product;
};
