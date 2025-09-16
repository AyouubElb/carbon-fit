"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { useCart } from "@/contexts/cart-context";
import { SUPABASE_IMAGE_URL } from "@/lib/supabaseClient";

const OrderSummary = () => {
  const { items, total } = useCart();

  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-xl py-6 gap-0 space-y-2 shadow-sm">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex gap-4"
            >
              <Image
                src={SUPABASE_IMAGE_URL + item.image || "/placeholder.svg"}
                alt={item.name}
                width={100}
                height={80}
                className="aspect-square object-cover rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">{item.name}</h4>
                <p className="text-sm font-medium text-lime-600">
                  {item.brand}
                </p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="text-sm shadow-sm">
                    {item.size}
                  </Badge>
                  {item.color && (
                    <Badge variant="outline" className="text-xs">
                      {item.color}
                    </Badge>
                  )}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-slate-600">
                    Qty: {item.quantity}
                  </span>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <Separator />

          <div className="space-y-2 font-medium">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="text-lime-600">Free</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-lime-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Info */}
      <Card className="py-6 rounded-xl bg-emerald-50 border border-solid border-emerald-200 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lime-800">Cash on Delivery</h3>
            <p className="text-sm text-lime-700">
              Pay when your order arrives at your doorstep. No advance payment
              required.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
