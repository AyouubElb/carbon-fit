import { Product } from "@/lib/types";
import ProductDetailsClient from "@/components/product/ProductDetailsClient";
import { productsApi } from "@/lib/api/products.api";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product: Product | null = await productsApi.getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#1f1f21] flex items-center justify-center">
        <div className="text-[#E8E8E8] text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1f1f21]">
      <ProductDetailsClient product={product} />
    </div>
  );
};

export default ProductPage;
