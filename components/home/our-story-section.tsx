import promotionImage from "@/public/images/our-story-image.webp";
import Image from "next/image";
import React from "react";

const OurStorySection = () => {
  return (
    <section className="px-4 py-7 md:p-[50px]">
      <div className="grid md:grid-cols-2 items-center">
        {/* Image - left side */}
        <div className="relative w-full h-full">
          <Image
            src={promotionImage}
            alt="Two founders standing between Porsche and BMW with Carbon Fit neon sign"
            className="w-full h-full object-cover"
            fill
            placeholder="blur"
          />
        </div>
        {/* Text content - right side */}

        <div className="p-10 md:px-20 md:pb-20 md:pt-16">
          <h2 className="font-heading text-[42px] md:text-6xl text-[#E8E8E8] font-medium uppercase tracking-wide leading-12 md:leading-18 mb-5">
            NOTRE HISTOIRE
          </h2>
          <div className="text-left">
            <p className="text-[15px] md:text-lg font-medium text-[#E8E8E8BF] leading-7 md:leading-8 mb-2.5">
              <span className="font-bold">
                {" "}
                Née dans la rue. Propulsée par les moteurs. Portée par les
                audacieux.{" "}
              </span>
              Carbon Fit n’est pas seulement des vêtements — c’est une culture.
              Nous incarnons la rencontre entre l&apos;
              <span className="font-bold">
                {" "}
                adrénaline du sport automobile{" "}
              </span>{" "}
              et la
              <span className="font-bold"> rébellion du streetwear.</span>{" "}
              Conçue pour les
              <span className="font-bold"> intrépides, </span>
              les
              <span className="font-bold"> passionnés, </span>
              ceux qui vivent chaque jour comme une course. Du{" "}
              <span className="font-bold"> garage à la ville, </span>
              nos pièces parlent de vitesse, de force et d’ambition brute.
              Toujours oversize, monochrome, minimaliste — mais avec un esprit
              qui fait du bruit.
              <br />
              Ceci est plus qu’une mode.
              <br />
              <span className="font-bold">Ceci est Carbon Fit.</span>
            </p>
          </div>
          <div className="space-y-3">
            <p className="flex items-center gap-3 text-[15px] md:text-lg text-[#E8E8E8BF]">
              <span>🛠️</span>
              <span>Conçu au Maroc.</span>
            </p>
            <p className="flex items-center gap-3 text-[15px] md:text-lg text-[#E8E8E8BF]">
              <span>🏁</span>
              <span>Inspiré par les légendes.</span>
            </p>
            <p className="flex items-center gap-3 text-[15px] md:text-lg text-[#E8E8E8BF]">
              <span>🖤</span>
              <span>Porté par la nouvelle génération.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
