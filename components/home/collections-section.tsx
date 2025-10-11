import { getBrands } from "@/lib/services/products";
import BrandList from "../brand/brand-list";

const CollectionsSection = () => {
  const brands = getBrands();
  return (
    <section className="px-4 py-7 md:p-[50px]">
      <h2 className="font-heading text-[42px] md:text-[56px] text-[#E8E8E8] font-medium mb-5 md:mb-8">
        Collections
      </h2>
      <BrandList brands={brands} />
    </section>
  );
};

export default CollectionsSection;
