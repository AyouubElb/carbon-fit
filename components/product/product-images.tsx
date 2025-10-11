"use client";

import { SUPABASE_IMAGE_URL } from "@/lib/supabaseClient";
import Image from "next/image";
import React, { useState } from "react";

interface ProductImagesProps {
  images: string[];
  thumbnails: string[];
  title: string;
  leftSideRef: React.RefObject<HTMLDivElement | null>;
  isSticky: boolean;
}

const ProductImages = ({
  images,
  thumbnails,
  title,
  leftSideRef,
  isSticky,
}: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div
      ref={leftSideRef}
      className={`md:col-span-4 md:top-0 ${
        isSticky ? "md:sticky" : ""
      } md:h-fit`}
    >
      {/* Main Product Image */}
      <div className="relative w-full bg-gray-100 rounded-none mb-4 aspect-square">
        <Image
          src={SUPABASE_IMAGE_URL + images[selectedImage] || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover rounded-none"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-3 gap-4">
        {thumbnails.slice(0, 3).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative w-full bg-gray-100 rounded-none aspect-square border-2 ${
              selectedImage === index
                ? "border-[rgb(236,193,116)]"
                : "border-transparent"
            }`}
          >
            <Image
              src={SUPABASE_IMAGE_URL + image || "/placeholder.svg"}
              alt={`${title} view ${index + 1}`}
              fill
              className="object-cover rounded-none"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
