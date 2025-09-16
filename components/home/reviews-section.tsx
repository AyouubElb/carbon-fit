import Image from "next/image";
import React from "react";

const reviews = [
  {
    id: 1,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/review1-xd5uBVyBFOzxdIvpXC1ts8tM1n8Cif.webp",
    name: "Imane",
    text: "Bien Reçu j'ai adoré la qualité saraha",
  },
  {
    id: 2,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/review2-z2TWcr6HhwDyAfhs7mO6gUnwUSxEbi.webp",
    name: "Simo",
    text: "Hi jatni Hoodie qualité nadya tbarkiah 🖤",
  },
  {
    id: 3,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/review3-jBdzyDwsEGeAdutiXTime2le82oVZr.webp",
    name: "Yacout",
    text: "Bien recu , J'adoreee",
  },
  {
    id: 4,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/review3-jBdzyDwsEGeAdutiXTime2le82oVZr.webp",
    name: "Abdessalam",
    text: "Wesslalni la commande saraha qualité zina",
  },
  {
    id: 5,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/review3-jBdzyDwsEGeAdutiXTime2le82oVZr.webp",
    name: "Ibrahim",
    text: "merci commande jat zwina bzf",
  },
];

const ReviewsSection = () => {
  return (
    <section className="px-4 py-7 md:p-[50px]">
      <h2 className="font-heading text-[42px] md:text-[56px] text-[#E8E8E8] font-medium mb-5 md:mb-8">
        CLIENTS REVIEWS
      </h2>
      <div className="grid md:grid-cols-3 gap-10 mb-8">
        {reviews.map((review) => (
          <div key={review.id} className="bg-[#2E2E30] space-y-4 px-8 py-6">
            <div className="relative w-full aspect-[5/6] overflow-hidden">
              <Image
                src={review.image}
                alt={`Customer review - ${review.name}`}
                className="w-full h-full object-cover"
                fill
              />
            </div>
            <div>
              <h4 className="font-heading text-xl md:text-2xl tracking-wide text-[#E8E8E8] font-semibold mb-2">
                {review.name}
              </h4>
              <p className="text-base font-medium text-[#E8E8E8BF]">
                {review.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
