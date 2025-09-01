import OrderForm from "@/components/checkout/order-form";
import OrderSummary from "@/components/checkout/order-summary";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto px-4 py-8 md:px-[50px]">
        {/* Header */}
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="text-base font-medium hover:bg-transparent hover:text-lime-700"
          >
            <Link href="/collections">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
          <h1 className="font-heading text-[56px] md:text-[72px] font-medium text-slate-900">
            Checkout
          </h1>
          <p className="font-medium text-slate-600">
            Complete your order with cash on delivery
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <OrderForm />

          {/* Order Summary */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
