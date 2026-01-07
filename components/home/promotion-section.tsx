"use client";
import promotionImage from "@/public/images/promotion-image.webp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PromotionSection = () => {
  const router = useRouter();

  const promotionRef = useRef<HTMLElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      // scoped selector (queries only inside promotionRef)
      const q = gsap.utils.selector(promotionRef);

      // image animation (has its own ScrollTrigger)
      gsap.from(q(".promotion-image"), {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: promotionRef.current,
          start: "top center",
          toggleActions: "play none none none",
          markers: false,
        },
      });

      // text content animation (own ScrollTrigger)
      gsap.from(q(".promotion-text-content"), {
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: "power1.inOut",
        stagger: 0.1,
        scrollTrigger: {
          trigger: promotionRef.current,
          start: "top center",
          toggleActions: "play none none none",
          markers: false,
        },
      });

      // testimonial cards (fromTo) with own ScrollTrigger
      gsap.fromTo(
        q(".testimonial-card"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power1.inOut",
          stagger: 0.4,
          scrollTrigger: {
            trigger: promotionRef.current,
            start: "top center",
            toggleActions: "play none none none",
            markers: false,
          },
        }
      );
    },
    { scope: promotionRef }
  );

  return (
    <section ref={promotionRef} className="px-4 py-7 md:p-[50px]">
      <div className="promotion-content grid md:grid-cols-2 items-center">
        {/* Product box image */}
        <div className="promotion-image relative w-full h-full aspect-square">
          <Image
            src={promotionImage}
            alt="RACER WEAR box with two Porsche t-shirts"
            className="w-full h-full object-cover"
            fill
            placeholder="blur"
          />
        </div>
        {/* Text content*/}
        <div className="promotion-text-content h-full text-left px-10 pt-10 pb-12.5 md:px-20 md:pb-20 md:pt-16">
          <h2 className="font-heading text-[42px] md:text-6xl text-[#E8E8E8] font-medium tracking-wide leading-12 md:leading-18 mb-5 uppercase">
            ACHETEZ 2, OBTENEZ 30% de réduction
          </h2>
          <p className="text-[15px] md:text-lg text-[#E8E8E8BF] font-medium leading-7 md:leading-8 mb-8 max-w-lg">
            Choisissez un pack de votre voiture de rêve et profitez de 30% de
            réduction avec livraison gratuite.
          </p>
          <button
            onClick={() => router.push("/collections")}
            className="bg-[#ecc174] text-white/80 px-6 py-3 text-base font-medium rounded-none uppercase cursor-pointer hover:text-white hover:opacity-90 transition-opacity uppercase"
          >
            Acheter maintenant
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;
