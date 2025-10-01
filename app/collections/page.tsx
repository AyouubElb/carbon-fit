import ProductsClient from "@/components/product/products-client";
import React, { Suspense } from "react";

const Collections = () => {
  return (
    <div className="min-h-screen bg-[#1f1f21]">
      {/* Products Header */}
      <div className="px-4 py-7 md:p-[50px] mb-4">
        <h1 className="font-heading text-[#E8E8E8] text-[42px] md:text-[56px] font-medium leading-tight mb-8">
          Products
        </h1>
      </div>
      {/* Products Client*/}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-gray-500">Loading ...</p>
          </div>
        }
      >
        <ProductsClient />
      </Suspense>
    </div>
  );
};

export default Collections;
