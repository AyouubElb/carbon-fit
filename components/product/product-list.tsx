"use client";
import React, { use, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { Product } from "../../lib/types";
import { useRouter } from "next/navigation";
import { SUPABASE_IMAGE_URL } from "@/lib/supabaseClient";
import Image from "next/image";

interface ProductListProps {
  products: Product[] | Promise<Product[]>;
  variant?: string;
}

const ProductList = ({ products, variant }: ProductListProps) => {
  const router = useRouter();
  const productList = products instanceof Promise ? use(products) : products;

  return (
    <div
      className={`grid md:grid-cols-4 md:gap-10 gap-5 
      ${variant === "products" ? "grid-cols-1" : "grid-cols-2"}
    `}
    >
      {productList.map((product) => (
        <Card
          key={product.id}
          className="product-list-card group cursor-pointer"
          onClick={() => router.push(`/products/${product.id}`)}
        >
          <div
            className={`relative w-full overflow-hidden
            ${variant === "products" ? "aspect-[8/9]" : "aspect-square"}
          `}
          >
            <Image
              src={SUPABASE_IMAGE_URL + product.images[0]}
              alt={product.title}
              fill
              className="cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <CardContent className="p-3.5 md:py-6.5 md:px-6">
            <h3 className="font-heading text-lg text-[#E8E8E8] font-medium mb-2 uppercase tracking-wide hover:underline">
              {product.title}
            </h3>
            <p className="text-sm text-[#E8E8E8BF] line-through">
              {product.originalPrice} MAD
            </p>
            <p className="text-lg text-[#E8E8E8] text-semibold">
              {product.price} MAD
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
