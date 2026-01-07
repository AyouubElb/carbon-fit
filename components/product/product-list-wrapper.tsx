"use client";
import React, { Suspense, use, useRef } from "react";
import ProductList from "./product-list";
import ViewAllButton from "../ui/view-all-button";
import { Product } from "@/lib/types";
import Loading from "../ui/loading";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ProductListWrapperProps {
  products: Product[] | Promise<Product[]>;
  variant?: string;
}

const ProductListWrapper = ({ products, variant }: ProductListWrapperProps) => {
  const productList = products instanceof Promise ? use(products) : products;

  const productListWrapRef = useRef<HTMLDivElement | null>(null);

  gsap.registerPlugin(ScrollTrigger);
  useGSAP(
    () => {
      // scoped selector (queries only inside promotionRef)
      const q = gsap.utils.selector(productListWrapRef);

      gsap.from(q(".product-list-card"), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        //delay: 0.1,
        ease: "power1.inOut",
        stagger: { each: 0.1, from: "start" },
        immediateRender: false,
        scrollTrigger: {
          trigger: productListWrapRef.current,
          start: "top center",
          toggleActions: "play none none none",
          markers: false,
        },
      });

      gsap.from(q(".product-list-button"), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power1.inOut",
        immediateRender: false,
        scrollTrigger: {
          trigger: productListWrapRef.current,
          start: "top center",
          toggleActions: "play none none none",
          markers: false,
        },
      });
    },
    { scope: productListWrapRef }
  );
  return (
    <div ref={productListWrapRef}>
      <div className="mb-6">
        <Suspense fallback={<Loading />}>
          <ProductList products={productList} variant={variant} />
        </Suspense>
      </div>
      <ViewAllButton />
    </div>
  );
};

export default ProductListWrapper;
