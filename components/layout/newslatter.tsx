import { MoveRight } from "lucide-react";
import React from "react";

const Newsletter = () => {
  return (
    <section className="p-10 pt-7.5 md:p-[50px] text-center bg-[#1f1f21]">
      <div className="mx-auto">
        <div className="mb-5">
          <h2 className="font-heading text-[42px] md:text-6xl text-[#E8E8E8] font-medium leading-12 md:leading-18 md:tracking-wide uppercase mb-5">
            Subscribe To Our Emails
          </h2>
          <p className="text-[15px] md:text-lg text-[#E8E8E8BF] font-medium">
            Be the first to know about new collections and exclusive offers.
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
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trusted_badge-5vvnKTAkLb8JY8sFih5WpnlkVfb01n.webp"
            alt="Trust badges - Premium Quality, Money Back Guarantee, Cash on Delivery, Free Shipping"
            className="mx-auto max-w-full h-auto"
          />
        </div>

        {/* Footer text */}
        <div className="text-[14px] text-[#E8E8E8BF] space-x-4">
          <span>© 2025, Racerwears Powered by Shopify</span>
          <span>•</span>
          <span>Privacy policy</span>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
