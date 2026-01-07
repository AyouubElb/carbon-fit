import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { productsApi } from "@/lib/api/products.api";
import { Product } from "@/lib/types";

interface UseProductsParams {
  brands?: string[];
  sortBy?: string;
  priceMin?: number;
  priceMax?: number;
  page?: number;
  pageSize?: number;
}

export const useProducts = (
  params: UseProductsParams = {},
  options?: Omit<UseQueryOptions<Product[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", params],
    queryFn: () => productsApi.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product | null, Error>({
    queryKey: ["product", id],
    queryFn: () => productsApi.getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductCount = (
  params: Omit<UseProductsParams, "page" | "pageSize">
) => {
  return useQuery<number, Error>({
    queryKey: ["products-count", params],
    queryFn: () => productsApi.getProductCount(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => productsApi.getBrands(),
    staleTime: 10 * 60 * 1000, // Brands change rarely
  });
};
