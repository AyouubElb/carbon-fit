"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Loader2, Mail, MapPin, Phone, User } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useCart } from "@/contexts/cart-context";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import {
  OrderFormData,
  OrderItem,
  OrderPayload,
  orderSchema,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const OrderForm = () => {
  const { items, clearCart } = useCart();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = async (data: OrderFormData) => {
    setIsLoading(true);

    // Map cart items to the shape we want to send to the server
    const mappedItems: OrderItem[] = items.map((it) => ({
      product_id: it.id,
      product_title: it.name,
      product_price: it.price,
      product_image: it.image,
      size: it.size,
      color: it.color ?? null,
      quantity: it.quantity,
    }));

    const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

    const payload: OrderPayload = {
      ...data,
      items: mappedItems,
      total,
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const { error } = await response.json();
        console.error("Order error:", error);
        setIsLoading(false);
        toast.error(error.message as string, {
          className: "bg-white dark:bg-zinc-900",
          description: "Order is failed. Please try again",
          duration: 3000,
          position: "top-right",
          style: {
            border: "1px solid #ef4444",
            borderRadius: "0.5rem",
          },
          icon: "❌",
        });
        return;
      }

      const orderData = await response.json();
      console.log("Order response:", orderData);
      toast.success("Order placed successfully!", {
        className: "bg-white ",
        description: "Order placed successfully!",
        duration: 2000,
        position: "top-right",
        style: {
          border: "1px solid #22c55e",
          borderRadius: "0.5rem",
        },
        icon: "✅",
      });

      // reset input fields
      reset();

      // Clear cart and redirect to confirmation
      clearCart();
      router.push("/order-confirmation");
    } catch (fetchError) {
      console.error("Network error:", fetchError);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="bg-white rounded-xl py-6 shadow-sm space-y-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Delivery Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              {...register("fullName")}
              className="bg-white"
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">
                {errors?.fullName?.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="bg-white"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors?.email?.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              className="bg-white"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors?.phone?.message}
              </span>
            )}
          </div>

          <Separator />

          {/* Delivery Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Delivery Address
            </h3>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                {...register("address")}
                className="bg-white"
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">
                  {errors?.fullName?.message}
                </span>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input id="city" {...register("city")} className="bg-white" />
                {errors.city && (
                  <span className="text-red-500 text-sm">
                    {errors?.city?.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  {...register("postalCode")}
                  className="bg-white"
                />
                {errors.postalCode && (
                  <span className="text-red-500 text-sm">
                    {errors?.postalCode?.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Order Notes (Optional)</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Any special instructions for delivery..."
              className="bg-white"
              rows={3}
            />
            {errors.notes && (
              <span className="text-red-500 text-sm">
                {errors?.notes?.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-600 py-5 text-lg font-semibold cursor-pointer"
            disabled={isSubmitting}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-x-2">
                <Loader2 className="size-4 animate-spin" />
                Place Order (Cash on Delivery)
              </span>
            ) : (
              "Place Order (Cash on Delivery)"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
