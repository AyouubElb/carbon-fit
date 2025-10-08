import ProductsClient from "@/components/product/products-client";
import Loading from "@/components/ui/loading";
import React, { Suspense } from "react";

const Collections = () => {
  return (
    <div className="min-h-screen bg-[#1f1f21]">
      {/* Products Header */}
      <div className="px-4 py-7 md:p-[50px] mb-4">
        <h1 className="font-heading text-[#E8E8E8] text-[42px] md:text-[56px] font-medium leading-tight mb-8">
          Produits
        </h1>
      </div>
      {/* Products Client*/}
      <Suspense fallback={<Loading />}>
        <ProductsClient />
      </Suspense>
    </div>
  );
};

export default Collections;
