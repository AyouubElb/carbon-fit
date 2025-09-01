import React, { Suspense } from "react";
import ProductList from "../product/product-list";
import { getProducts } from "@/lib/services/products";
import { Product } from "@/lib/types";
import ViewAllButton from "../ui/view-all-button";

const ArrivalsSection = () => {
  const products = getProducts();

  return (
    <section className="px-4 py-7 md:p-[50px]">
      <div className="mb-6">
        <h2 className="font-heading text-[42px] md:text-[56px] text-[#E8E8E8] font-medium mb-2 md:mb-2">
          NEW ARRIVALS
        </h2>
        <p className="text-base text-[#E8E8E8BF] max-w-lg">
          Limited Edition On All Items
        </p>
      </div>
      <div className="mb-10">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList products={products} />
        </Suspense>
      </div>
      <ViewAllButton />
    </section>
  );
};

export default ArrivalsSection;
