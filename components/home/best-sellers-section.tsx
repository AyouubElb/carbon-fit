import React, { Suspense } from "react";
import ProductList from "../product/product-list";
import { Product } from "@/lib/types";
import { getProducts } from "@/lib/services/products";
import ViewAllButton from "../ui/view-all-button";

const BestSellersSection = () => {
  const products = getProducts();

  return (
    <section className="px-4 py-7 md:p-[50px]">
      <h2 className="font-heading text-[42px] md:text-[56px] text-[#E8E8E8] font-medium mb-5 md:mb-8">
        BEST SELLERS
      </h2>
      <div className="mb-10">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList products={products} />
        </Suspense>
      </div>
      <ViewAllButton />
    </section>
  );
};

export default BestSellersSection;
