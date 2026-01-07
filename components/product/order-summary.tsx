"use client";

import {
  CheckCircle,
  FileText,
  Loader2,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { SUPABASE_IMAGE_URL } from "@/lib/supabaseClient";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  OrderFormData,
  OrderItem,
  OrderPayload,
  orderSchema,
  Product,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useCreateOrder } from "@/lib/hooks/useCreateOrder";

interface OrderSummaryProps {
  product: Product;
  selectedSize: string;
  quantity: number;
}

const OrderSummary = ({
  product,
  selectedSize,
  quantity,
}: OrderSummaryProps) => {
  const { mutate: createOrder, isPending } = useCreateOrder();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const subtotal = product.price * quantity;
  const total = subtotal; // Free shipping

  const onSubmit = (data: OrderFormData) => {
    if (!selectedSize) return;

    // Map cart items to the shape we want to send to the server
    const item: OrderItem = {
      product_id: product.id,
      product_title: product.title,
      product_price: product.price,
      product_image: product.images[0],
      size: selectedSize,
      color: null,
      quantity,
    };

    const payload: OrderPayload = {
      ...data,
      items: [item],
      total,
    };

    createOrder(payload, {
      onSuccess: (orderData) => {
        toast.success("Order placed successfully!", {
          className: "bg-white",
          description: "Order placed successfully!",
          duration: 2000,
          position: "top-right",
          style: {
            border: "1px solid #22c55e",
            borderRadius: "0.5rem",
          },
          icon: "✅",
        });
        reset();
      },
      onError: (error) => {
        toast.error(error.message, {
          className: "bg-white dark:bg-zinc-900",
          description: "Order failed. Please try again",
          duration: 3000,
          position: "top-right",
          style: {
            border: "1px solid #ef4444",
            borderRadius: "0.5rem",
          },
          icon: "❌",
        });
      },
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-4 pb-4 border-b">
        <div className="relative w-16 h-16 bg-gray-100 rounded-none flex-shrink-0">
          <Image
            src={SUPABASE_IMAGE_URL + product.images[0] || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover rounded-none"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-black underline">{product.title}</h4>
          <div className="flex items-center gap-2">
            <span className="text-gray-700 text-sm font-medium">Taille:</span>
            <span className="text-base font-bold">{selectedSize}</span>
          </div>
        </div>
        <span className="font-bold text-black">
          {product.price.toFixed(2)} dh
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-700 font-medium">Subtotal</span>
          <span className="text-black font-bold">{subtotal.toFixed(2)} dh</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700 font-medium">Shipping</span>
          <span className="text-black font-bold">Free</span>
        </div>
        <div className="flex justify-between font-medium text-lg pt-2 border-t">
          <span className="text-black font-medium">Total</span>
          <span className="text-black font-bold">{total.toFixed(2)} dh</span>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="pt-4">
        <h4 className="font-bold text-black text-lg mb-3">Shipping method</h4>
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-black"></div>
            <span className="text-black font-medium">Free shipping</span>
          </div>
          <span className="text-black font-bold">Free</span>
        </div>
      </div>

      {/* Shipping Address Form */}
      <div className="pt-4">
        <h4 className="text-black font-bold text-xl mb-4 text-center">
          Enter your shipping address
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit, (errors) =>
            console.log("validation errors", errors)
          )}
          className="space-y-4"
        >
          <div>
            <Label
              htmlFor="fullName"
              className="block text-black font-bold mb-2"
            >
              Nom complet <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <User
                className={
                  errors.fullName
                    ? `absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 -translate-y-[22px]`
                    : `absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400`
                }
                size={20}
              />
              <Input
                id="fullName"
                {...register("fullName")}
                placeholder="Nom complet"
                className="w-full pl-12 pr-4 py-5 bg-gray-100 border-0 !rounded-lg text-black !text-base placeholder-gray-500 !focus:outline-none !focus:ring-2 !focus:ring-[rgb(236,193,116)]"
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">
                  {errors?.fullName?.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="phone" className="block text-black font-bold mb-2">
              Numéro de téléphone <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Phone
                className={
                  errors.fullName
                    ? `absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 -translate-y-[22px]`
                    : `absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400`
                }
                size={20}
              />
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="Numéro de téléphone"
                className="w-full pl-12 pr-4 py-5 bg-gray-100 border-0 !rounded-lg text-black !text-base placeholder-gray-500 !focus:outline-none !focus:ring-2 !focus:ring-[rgb(236,193,116)]"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors?.phone?.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <Label
              htmlFor="address"
              className="block text-black font-bold mb-2"
            >
              Adresse de livraison <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <MapPin
                className={
                  errors.fullName
                    ? `absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 -translate-y-[22px]`
                    : `absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400`
                }
                size={20}
              />
              <Input
                id="address"
                {...register("address")}
                placeholder="Adresse de livraison"
                className="w-full pl-12 pr-4 py-5 bg-gray-100 border-0 !rounded-lg text-black !text-base placeholder-gray-500 !focus:outline-none !focus:ring-2 !focus:ring-[rgb(236,193,116)]"
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  {errors?.address?.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="city" className="block text-black font-bold mb-2">
              Ville <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <MapPin
                className={
                  errors.fullName
                    ? `absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 -translate-y-[22px]`
                    : `absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400`
                }
                size={20}
              />
              <Input
                id="city"
                {...register("city")}
                placeholder="Ville"
                className="w-full pl-12 pr-4 py-5 bg-gray-100 border-0 !rounded-lg text-black !text-base placeholder-gray-500 !focus:outline-none !focus:ring-2 !focus:ring-[rgb(236,193,116)]"
              />
              {errors.city && (
                <span className="text-red-500 text-sm">
                  {errors?.city?.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="city" className="block text-black font-bold mb-2">
              Remarques de commande (facultatif)
            </Label>
            <div className="relative">
              <FileText
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <Textarea
                id="notes"
                {...register("notes")}
                placeholder="Any special instructions for delivery..."
                rows={3}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[rgb(236,193,116)] resize-none"
              />
              {errors.notes && (
                <span className="text-red-500 text-sm">
                  {errors?.notes?.message}
                </span>
              )}
            </div>
          </div>

          {/* Complete Order Button */}
          <div className="">
            <Button
              type="submit"
              className="w-full bg-black py-6 text-white text-base font-medium rounded-none hover:bg-gray-800"
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-x-2">
                  <Loader2 className="size-4 animate-spin" />
                  COMMANDER - {total.toFixed(2)} dh
                </span>
              ) : (
                <span className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  COMMANDER - {total.toFixed(2)} dh
                </span>
              )}
            </Button>
            {!selectedSize && (
              <span className="text-red-500 text-sm mt-3">
                Veuillez sélectionner une taille pour continuer
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderSummary;
