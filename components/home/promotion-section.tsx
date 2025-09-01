import React from "react";

const PromotionSection = () => {
  return (
    <section className="px-4 py-7 md:p-[50px]">
      <div className="grid md:grid-cols-2 items-center">
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
