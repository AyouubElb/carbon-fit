import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/lib/types";

// Raw Supabase row type from database query
interface ProductRow {
  id: string;
  title: string;
  price: number;
  originalPrice?: number | null;
  onSale: boolean;
  images: string[];
  description: string;
  brands: { name: string } | { name: string }[];
  sizes: string[];
  colors?: string[];
  created_at?: string;
}

interface GetProductsParams {
  brands?: string[];
  sortBy?: string;
  priceMin?: number;
  priceMax?: number;
  page?: number;
  pageSize?: number;
}

export const productsApi = {
  async getProducts(params: GetProductsParams = {}): Promise<Product[]> {
    const {
      brands,
      sortBy,
      priceMin,
      priceMax,
      page = 1,
      pageSize = 12,
    } = params;

    console.log("Fetching products is called with params:", params);

    // Build base query
    let query = supabase
      .from("products")
      .select(
        "id, title, price, originalPrice, onSale, images, description, brands(name), sizes, created_at"
      );

    // Apply brand filter with multiple brands
    if (brands && brands.length > 0) {
      query = supabase
        .from("products")
        .select(
          "id, title, price, originalPrice, onSale, images, description, brands!inner(name), sizes, created_at"
        )
        .in("brands.name", brands);
    }

    // Apply price filters
    if (priceMin !== undefined) {
      query = query.gte("price", priceMin);
    }
    if (priceMax !== undefined) {
      query = query.lte("price", priceMax);
    }

    // Apply sorting
    if (sortBy) {
      const orderMap: Record<string, { column: string; ascending: boolean }> = {
        "Alphabetically, A-Z": { column: "title", ascending: true },
        "Alphabetically, Z-A": { column: "title", ascending: false },
        "Price, low to high": { column: "price", ascending: true },
        "Price, high to low": { column: "price", ascending: false },
        "Date, old to new": { column: "created_at", ascending: true },
        "Date, new to old": { column: "created_at", ascending: false },
      };
      const order = orderMap[sortBy] || {
        column: "created_at",
        ascending: false,
      };
      query = query.order(order.column, { ascending: order.ascending });
    }

    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error } = await query;

    if (error) throw error;
    if (!data) return [];

    // Normalize the data
    return data.map((row: ProductRow) => {
      const rawBrand = Array.isArray(row.brands) ? row.brands[0] : row.brands;

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
        brands: { name: String(rawBrand?.name ?? "") },
        sizes: Array.isArray(row.sizes) ? row.sizes.map(String) : [],
        created_at: row.created_at ? String(row.created_at) : undefined,
      };
    });
  },

  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from("products")
      .select(
        "id, title, price, originalPrice, onSale, images, description, brands(name), sizes, colors, created_at"
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching product:", error.message);
      return null;
    }
    if (!data) return null;

    const row = data as ProductRow;
    let brandObj = { name: "" };

    if (Array.isArray(row.brands)) {
      brandObj =
        row.brands.length > 0
          ? { name: String(row.brands[0].name ?? "") }
          : brandObj;
    } else if (row.brands && typeof row.brands === "object") {
      brandObj = { name: String(row.brands.name ?? "") };
    }

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
      brands: brandObj,
      sizes: Array.isArray(row.sizes) ? row.sizes.map(String) : [],
      colors: Array.isArray(row.colors) ? row.colors.map(String) : [],
      created_at: row.created_at ? String(row.created_at) : undefined,
    };
  },

  async getProductCount(
    params: Omit<GetProductsParams, "page" | "pageSize">
  ): Promise<number> {
    const { brands, priceMin, priceMax } = params;

    let query = supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (brands && brands.length > 0) {
      query = query.in("brands.name", brands);
    }
    if (priceMin !== undefined) {
      query = query.gte("price", priceMin);
    }
    if (priceMax !== undefined) {
      query = query.lte("price", priceMax);
    }

    const { count, error } = await query;

    if (error) throw error;
    return count || 0;
  },

  async getBrands() {
    const { data, error } = await supabase.from("brands").select();
    if (error) throw error;
    return data || [];
  },
};
