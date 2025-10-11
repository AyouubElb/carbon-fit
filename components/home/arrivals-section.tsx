import { getProducts } from "@/lib/services/products";
import ProductListWrapper from "../product/product-list-wrapper";

const ArrivalsSection = () => {
  const products = getProducts();

  return (
    <section className="px-4 py-7 md:p-[50px]">
      <div className="mb-6">
        <h2 className="font-heading text-[42px] md:text-[56px] text-[#E8E8E8] font-medium uppercase mb-2 md:mb-2">
          NOUVEAUTÉS
        </h2>
        <p className="text-base text-[#E8E8E8BF] max-w-lg">
          Édition limitée sur tous les articles
        </p>
      </div>
      <ProductListWrapper products={products} />
    </section>
  );
};

export default ArrivalsSection;
