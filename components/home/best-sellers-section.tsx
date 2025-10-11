import { getProducts } from "@/lib/services/products";
import ProductListWrapper from "../product/product-list-wrapper";

const BestSellersSection = () => {
  const products = getProducts();

  return (
    <section className="px-4 py-7 md:p-[50px]">
      <h2 className="font-heading text-[42px] md:text-[56px] text-[#E8E8E8] font-medium uppercase mb-5 md:mb-8">
        MEILLEURES VENTES
      </h2>
      <ProductListWrapper products={products} />
    </section>
  );
};

export default BestSellersSection;
