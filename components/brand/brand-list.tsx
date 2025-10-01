"use client";
import { Brand } from "@/lib/types";
import React, { use } from "react";
import { Card, CardContent } from "../ui/card";
import { ArrowRight } from "lucide-react";
import { SUPABASE_IMAGE_URL } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BrandList = ({ brands }: { brands: Promise<Brand[]> }) => {
  const router = useRouter();
  const brandList = use(brands);
  return (
    <>
      {brandList.map((brand) => (
        <Card
          key={brand.id}
          className="relative group rounded-none gap-0 p-0 border-none bg-transparent"
        >
          <div className="relative w-full max-w-xl mb-2 aspect-[5/6] overflow-hidden">
            <Image
              src={SUPABASE_IMAGE_URL + brand.image}
              alt={`${brand.name} with t-shirt`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              onClick={() => router.push(`/collections?brand=${brand.name}`)}
            />
          </div>
          <CardContent className="p-2 md:p-4">
            <div className="flex items-center gap-1 hover:gap-2 cursor-pointer w-fit">
              <h2
                className="font-heading text-lg md:text-2xl text-[#E8E8E8] font-semibold uppercase"
                onClick={() => router.push(`/collections?brand=${brand.name}`)}
              >
                {brand.name}
              </h2>
              <ArrowRight className="text-[#E8E8E8BF] w-6 h-6 md:w-7 md:h-7" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default BrandList;
