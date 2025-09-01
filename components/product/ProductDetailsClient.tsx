"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductImages from "./product-images";
import ProductDetails from "./product-details";
import { Product } from "@/lib/types";

interface ProductDetailsClientProps {
  product: Product;
}

const ProductDetailsClient = ({ product }: ProductDetailsClientProps) => {
  const [isSticky, setIsSticky] = useState(true);
  //const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !leftSideRef.current ||
        !rightSideRef.current ||
        !containerRef.current
      )
        return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const leftHeight = leftSideRef.current.offsetHeight;
      const rightHeight = rightSideRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate when left side should stop being sticky
      const shouldStick =
        containerRect.top <= 0 &&
        containerRect.bottom > leftHeight + 100 &&
        rightHeight > leftHeight;

      setIsSticky(shouldStick);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="px-4 py-7 md:p-[50px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Left Side - Product Images */}
        <ProductImages
          images={product.images}
          thumbnails={product.images}
          title={product.title}
          leftSideRef={leftSideRef}
          isSticky={isSticky}
        />

        {/* Right Side - Product Details */}
        <ProductDetails product={product} rightSideRef={rightSideRef} />
      </div>
    </div>
  );
};

export default ProductDetailsClient;
