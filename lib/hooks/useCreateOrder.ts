// lib/hooks/useCreateOrder.ts
import { useMutation } from "@tanstack/react-query";
import { ordersApi } from "@/lib/api/orders.api";
import { OrderPayload } from "@/lib/types";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (orderData: OrderPayload) => ordersApi.createOrder(orderData),
    onError: (error) => {
      console.error("Order creation failed:", error);
    },
  });
};
