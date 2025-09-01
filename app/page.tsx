import ArrivalsSection from "@/components/home/arrivals-section";
import BestSellersSection from "@/components/home/best-sellers-section";
import CollectionsSection from "@/components/home/collections-section";
import HeroSection from "@/components/home/hero-section";
import OurStorySection from "@/components/home/our-story-section";
import PromotionSection from "@/components/home/promotion-section";
import ReviewsSection from "@/components/home/reviews-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1f1f21]">
      <div className="">
        <HeroSection />
      </div>
      <PromotionSection />
      <CollectionsSection />
      <ArrivalsSection />
      <BestSellersSection />
      <ReviewsSection />
      <OurStorySection />
    </div>
  );
}
