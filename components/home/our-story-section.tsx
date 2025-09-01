import { Span } from "next/dist/trace";
import React from "react";

const OurStorySection = () => {
  return (
    <section className="px-4 py-7 md:p-[50px]">
      <div className="grid md:grid-cols-2 items-center">
        {/* Image - left side */}
        <div className="w-full h-full">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Our-story-image-wuKOGoVsRBcAEDzjBdI900YJOPyYNA.webp"
            alt="Two founders standing between Porsche and BMW with Racer Wear neon sign"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Text content - right side */}

        <div className="p-10 md:px-20 md:pb-20 md:pt-16">
          <h2 className="font-heading text-[42px] md:text-6xl text-[#E8E8E8] font-medium tracking-wide leading-12 md:leading-18 mb-5">
            OUR STORY
          </h2>
          <div className="text-left">
            <p className="text-[15px] md:text-lg font-medium text-[#E8E8E8BF] leading-7 md:leading-8 mb-2.5">
              <span className="font-bold">
                {" "}
                Born from the streets. Powered by engines. Worn by the bold.{" "}
              </span>
              Racer Wear isn&apos;t just clothing — it&apos;s a culture. We
              represent the intersection of
              <span className="font-bold"> motorsport adrenaline </span> and
              <span className="font-bold"> streetwear rebellion. </span> Built
              for the
              <span className="font-bold"> fearless, </span>
              the
              <span className="font-bold"> driven, </span>
              and the ones who treat every day like a race. From the
              <span className="font-bold"> garage to the city, </span>
              our pieces speak speed, grit, and raw ambition. We keep it
              oversized, monochrome, minimal — but loud in spirit.
              <br />
              This is more than fashion.
              <br />
              <span className="font-bold">This is Racer Wear.</span>
            </p>
          </div>
          <div className="space-y-3">
            <p className="flex items-center gap-3 text-[15px] md:text-lg text-[#E8E8E8BF]">
              <span>🛠️</span>
              <span>Designed in Morocco.</span>
            </p>
            <p className="flex items-center gap-3 text-[15px] md:text-lg text-[#E8E8E8BF]">
              <span>🏁</span>
              <span>Inspired by legends.</span>
            </p>
            <p className="flex items-center gap-3 text-[15px] md:text-lg text-[#E8E8E8BF]">
              <span>🖤</span>
              <span>Worn by the next generation.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
