"use client";
import { Brand } from "@/lib/types";
import React, { useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { ArrowRight } from "lucide-react";
import { SUPABASE_IMAGE_URL } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const BrandList = ({ brands }: { brands: Brand[] }) => {
  const router = useRouter();

  const brandListRef = useRef<HTMLDivElement | null>(null);

  gsap.registerPlugin(ScrollTrigger);
  useGSAP(
    () => {
      // scoped selector (queries only inside promotionRef)
      const q = gsap.utils.selector(brandListRef);

      gsap.from(q(".brand-list-card"), {
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
        ease: "power1.inOut",
        stagger: 0.1,
        scrollTrigger: {
          trigger: brandListRef.current,
          start: "top center",
          toggleActions: "play none none none",
          markers: false,
        },
      });
    },
    { scope: brandListRef }
  );

  return (
    <div
      ref={brandListRef}
      className="grid md:grid-cols-3 gap-5 md:gap-10 flex-wrap"
    >
      {brands.map((brand) => (
        <Card
          key={brand.id}
          className="brand-list-card relative group rounded-none gap-0 p-0 border-none bg-transparent"
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
    </div>
  );
};

export default BrandList;
