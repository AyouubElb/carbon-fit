"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const PromotionSection = () => {
  const promotionRef = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: promotionRef.current,
          start: "top 50%",
          once: true,
          markers: false,
        },
      });

      // Title + subtitle
      tl.fromTo(
        ".title-letter",
        {
          opacity: 0,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.06,
          stagger: 0.03,
          ease: "power1.inOut",
        }
      );

      tl.from(" .promotion-content", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power1.inOut",
        stagger: 0.1,
      });

      //cards
      tl.fromTo(
        ".testimonial-card",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.inOut",
          stagger: 0.4,
        }
      );
    },
    { scope: promotionRef }
  );
  return (
    <section ref={promotionRef} className="px-4 py-7 md:p-[50px]">
      <div className="promotion-content grid md:grid-cols-2 items-center">
        {/* Product box image */}
        <div className="w-full ">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/section2image-9aJg5FzVf5vagEtVJaHgKoCADMePOB.webp"
            alt="RACER WEAR box with two Porsche t-shirts"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Text content*/}
        <div className="h-full text-left px-10 pt-10 pb-12.5 md:px-20 md:pb-20 md:pt-16">
          <h2 className="font-heading text-[42px] md:text-6xl text-[#E8E8E8] font-medium tracking-wide leading-12 md:leading-18 mb-5">
            BUY 2 AND GET 30% OFF
          </h2>
          <p className="text-[15px] md:text-lg text-[#E8E8E8BF] font-medium leading-7 md:leading-8 mb-8 max-w-lg">
            Choose a pack from your dream car and get 30% Off with free shipping
          </p>
          <button className="bg-[#ecc174] text-white/80 px-6 py-3 text-base font-medium rounded-none uppercase cursor-pointer hover:text-white hover:opacity-90 transition-opacity uppercase">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;
