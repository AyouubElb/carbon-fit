import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const OrderConfirmationPage = () => {
  return (
    <section className=" bg-[#1f1f21] px-4 py-7 md:p-[50px]">
      <div className="max-w-3xl mx-auto border border-[#ecc174] border-3 p-10 text-center space-y-8">
        {/* Confirmation Message */}
        <div className="spacey-4">
          <h1 className="font-heading text-[56px] md:text-6xl text-[#E8E8E8] font-medium mb-8 leading-wider">
            Order Confirmed!
          </h1>
          <p className="text-lg text-[#E8E8E8] leading-relaxed">
            Thank you for your order! We&apos;ve received your request and will
            contact you soon to confirm the details.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-[#2a2a2c] border border-[#ecc174]/20 text-[#E8E8E8] rounded-none p-8 space-y-6 shadow-xl shadow-[#ecc174]/10 ring-[#ecc174]/10">
          <h2 className="text-2xl font-semibold text-[#ecc174]">
            What happens next?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#ecc174]/10 border border-[#ecc174]/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-[#ecc174]" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[#E8E8E8] mb-2">
                  We&apos;ll Call You
                </h3>
                <p className="text-[#E8E8E8]/70 text-sm">
                  Our team will contact you within 24 hours to confirm your
                  order and delivery details.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#ecc174]/10 border border-[#ecc174]/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Package className="h-6 w-6 text-[#ecc174]" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[#E8E8E8] mb-2">
                  Fast Delivery
                </h3>
                <p className="text-[#E8E8E8]/70 text-sm">
                  Your order will be delivered to your address within 2-5
                  business days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        {/*<div className="bg-[#2a2a2c] border border-[#ecc174]/20 rounded-2xl p-6 shadow-2xl shadow-black/50 ring-1 ring-[#ecc174]/10">
          <h3 className="font-semibold text-[#ecc174] mb-2">
            Cash on Delivery
          </h3>
          <p className="text-[#E8E8E8]/70 text-sm">
            Pay when your order arrives. No advance payment required. Have the
            exact amount ready for a smooth delivery experience.
          </p>
        </div>*/}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-[#ecc174] hover:bg-[#ecc174]/90 text-[#1f1f21] px-8 py-3 text-lg font-semibold shadow-lg rounded-sm"
          >
            <Link href="/products">
              Continue Shopping <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-8 py-3 text-lg font-semibold bg-transparent border-[#ecc174]/80 border-2 rounded-sm text-[#E8E8E8] hover:bg-[#ecc174] hover:border-[#ecc174]/50 hover:transition hover:duration-400 hover:ease-in-out"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmationPage;
