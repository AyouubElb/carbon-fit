import { MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const OrderSummary = () => {
  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-4 py-3 border-y border-[#c7c7c7]">
        <div className="w-18 h-18 bg-gray-100 rounded-none flex-shrink-0">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-cover rounded-none"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-black underline">
            {product.title}
          </h4>
          <p className="text-gray-600 text-base font-medium">{selectedSize}</p>
        </div>
        <span className="text-lg font-bold text-black">
          {product.price.toFixed(2)} dh
        </span>
      </div>

      <div className="bg-[#EBEBEB] py-2 px-3 rounded-lg space-y-2">
        <div className="flex justify-between text-lg">
          <span className="text-gray-600 font-semibold">Subtotal</span>
          <span className="text-black font-bold">{subtotal.toFixed(2)} dh</span>
        </div>
        <div className="flex justify-between text-lg">
          <span className="text-gray-600 font-semibold">Shipping</span>
          <span className="text-black font-bold">Free</span>
        </div>
        <div className="flex justify-between pt-2 border-t">
          <span className="text-black text-lg font-bold">Total</span>
          <span className="text-black text-2xl font-bold">
            {total.toFixed(2)} dh
          </span>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="pt-2">
        <h4 className="text-lg font-bold text-black mb-3">Shipping method</h4>
        <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-black"></div>
            <span className="font-medium text-lg text-black">
              Free shipping
            </span>
          </div>
          <span className="text-black text-lg font-bold">Free</span>
        </div>
      </div>

      {/* Shipping Address Form */}
      <div className="pt-4">
        <h4 className="font-medium text-black mb-4 text-center">
          Enter your shipping address
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-black font-medium mb-2">
              Full name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[rgb(236,193,116)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-black font-medium mb-2">
              Phone number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone"
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[rgb(236,193,116)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-black font-medium mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[rgb(236,193,116)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Complete Order Button */}
      <Button className="w-full bg-black text-white py-4 text-lg font-medium rounded-none hover:bg-gray-800">
        COMPLETE ORDER - {total.toFixed(2)} dh
      </Button>
    </div>
  );
};

export default OrderSummary;
