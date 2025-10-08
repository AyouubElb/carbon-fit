import { MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const Newsletter = () => {
  return (
    <section className="p-10 pt-7.5 md:p-[50px] text-center bg-[#1f1f21]">
      <div className="mx-auto">
        <div className="mb-5">
          <h2 className="font-heading text-[42px] md:text-6xl text-[#E8E8E8] font-medium leading-12 md:leading-18 md:tracking-wide uppercase mb-5">
            Abonnez-vous à nos email
          </h2>
          <p className="text-[15px] md:text-lg text-[#E8E8E8BF] font-medium">
            Soyez le premier informé des nouvelles collections et des offres
            exclusives.{" "}
          </p>
        </div>

        {/* Email subscription form */}
        <div className="flex max-w-sm mx-auto mb-16">
          <input
            type="email"
            placeholder="Email"
            className="flex-1 bg-transparent border border-[#E8E8E8BF] text-[#E8E8E8BF] py-3 px-6 text-lg font-medium focus:outline-none focus:border-[#E8E8E8] rounded-none"
          />
          <button className="bg-transparent border border-[#E8E8E8BF] text-[#E8E8E8BF] px-4 py-3 hover:bg-[#E8E8E8BF] hover:text-black transition-all duration-300 rounded-none cursor-pointer">
            <MoveRight className="w-5 h-5" />
          </button>
        </div>

        {/* Trust badges */}
        <div className="max-w-sm mx-auto mb-12">
          <div className="relative w-full h-29">
            <Image
              src="/images/trusted-badge.webp"
              alt="Trust badges - Premium Quality, Money Back Guarantee, Cash on Delivery, Free Shipping"
              className="mx-auto"
              fill
            />
          </div>
        </div>

        {/* Footer text */}
        <div className="text-[14px] text-[#E8E8E8BF] space-x-4">
          <span>© 2025, CarbonFit. Développé avec passion.</span>
          <span>•</span>
          <span>Politique de confidentialité</span>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
