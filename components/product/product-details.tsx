"use client";

import { Product } from "@/lib/types";
import { CheckCircle, Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import OrderSummary from "./order-summary";
import { useCart } from "@/contexts/cart-context";

interface ProductDetailsProps {
  product: Product;
  rightSideRef: React.RefObject<HTMLDivElement | null>;
}

const ProductDetails = ({ product, rightSideRef }: ProductDetailsProps) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("XS");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const subtotal = product.price * quantity;
  const total = subtotal; // Free shipping

  const handleAddToCart = async () => {
    if (!selectedSize) return;

    setIsAdding(true);

    // Simulate adding to cart
    await new Promise((resolve) => setTimeout(resolve, 500));

    addItem({
      id: product.id,
      name: product.title,
      brand: product.brands.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity,
    });

    setIsAdding(false);
  };
  return (
    <div ref={rightSideRef} className="space-y-8">
      {/* Product Info */}
      <div>
        <p className="text-[#E8E8E8BF] text-sm font-medium uppercase mb-2">
          {product.brands.name}
        </p>
        <h1 className="font-heading text-[#E8E8E8] text-[42px] md:text-[56px] font-medium leading-tight mb-6">
          {product.title}
        </h1>

        {/* Price */}
        <div className="flex items-center gap-4 mb-6">
          {product.onSale && (
            <span className="text-[#E8E8E8BF] text-sm md:text-lg tracking-wider line-through">
              Dh {product.originalPrice} MAD
            </span>
          )}
          <span className="text-[#E8E8E8] text-base md:text-xl font-medium tracking-wider">
            Dh {product.price} MAD
          </span>
          {product.onSale && (
            <Badge className="bg-white text-xs md:text-sm text-[#1F1F21] font-medium rounded-full px-[13px] py-[3px] ">
              Sale
            </Badge>
          )}
        </div>

        {/* Size Selection */}
        <div className="mb-8">
          <h3 className="text-[#E8E8E8] text-base md:text-lg font-medium mb-2">
            Size
          </h3>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-5 md:px-7 py-2 rounded-full border text-sm md:text-base font-medium transition-colors cursor-pointer ${
                  selectedSize === size
                    ? "bg-[#E8E8E8] text-[#1F1F21] border-[#E8E8E8]"
                    : "bg-transparent text-[#E8E8E8] border-[#E8E8E8BF] hover:border-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-8">
          <h3 className="text-[#E8E8E8] text-base md:text-lg font-medium mb-2">
            Quantity ({quantity} in cart)
          </h3>
          <div className="flex items-center border border-[#E8E8E8BF] rounded-none w-fit">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-3 text-[#E8E8E8] hover:bg-[#2a2a2c] cursor-pointer"
            >
              <Minus size={16} />
            </button>
            <span className="px-6 py-3 text-[#E8E8E8] min-w-[60px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-3 text-[#E8E8E8] hover:bg-[#2a2a2c] cursor-pointer"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      {/*<OrderSummary /> */}

      {/* Add to Cart Button */}
      <Button
        variant="outline"
        className="w-full border-[#ecc174] text-[#ecc174] py-6 text-base md:text-lg font-medium rounded-none hover:bg-[#ecc174] hover:text-[#1F1F21] bg-transparent cursor-pointer"
        disabled={!selectedSize || isAdding}
        onClick={handleAddToCart}
      >
        {isAdding ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Adding...
          </>
        ) : (
          <>
            <CheckCircle className="h-5 w-5 mr-2" />
            Add to Cart - ${(product.price * quantity).toFixed(2)}
          </>
        )}
      </Button>

      {/* Product Features */}
      <div className="space-y-2 text-[#E8E8E8BF] text-base md:text-lg font-medium">
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
        {/*<p className="text-[#E8E8E8BF]">{product.description}</p>
        <div className="space-y-2">
          {product.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-[#E8E8E8BF]"
            >
              <span className="text-[#ecc174]">
                {index === 2 ? "🚚" : index === 3 ? "⚡" : "✓"}
              </span>
              <span>{feature}</span>
            </div>
          ))}
        </div>*/}
      </div>
    </div>
  );
};

export default ProductDetails;

function stripHtml(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.innerText;
}
