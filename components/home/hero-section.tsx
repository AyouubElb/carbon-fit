"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".hero-content", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power1.inOut",
        stagger: 0.2,
      });
    },
    { scope: heroRef }
  );
  return (
    <section
      ref={heroRef}
      className="px-[50px] py-[100px] relative md:min-h-screen flex items-center justify-center bg-[url('/images/hero-banner.webp')] bg-cover bg-center animate-moveBg"
    >
      {/* Dark overlay  */}
      <div className="absolute inset-0 bg-black/25"></div>

      {/* Centered content */}
      <div className="hero-content text-center z-10">
        <h1 className="font-heading text-[28px] md:text-[34px] text-[#E8E8E8] font-medium mb-2.5 md:mb-4 leading-tight">
          CARS T-SHIRT COLLECTION
        </h1>
        <p className="text-base font-medium text-[#E8E8E8BF] mb-8 max-w-md mx-auto">
          Get your dream car T-shirt now. Wear your passion
        </p>
        <button
          onClick={() => router.push("/collections")}
          className="border-1 border-[#ecc174] text-[#ecc174] bg-transparent px-6 py-3 text-base font-medium rounded-none uppercase cursor-pointer hover:bg-[#ecc174] hover:text-[#1f1f21] transition"
        >
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
