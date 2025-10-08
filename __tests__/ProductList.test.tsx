/*import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// MOCK Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
  }),
}));

// MOCK Supabase client
jest.mock("@/lib/supabaseClient", () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: null }),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ error: null }),
    })),
  },
  SUPABASE_IMAGE_URL:
    "https://bnamvffvziulrvptnjax.supabase.co/storage/v1/object/public/",
}));

import ProductList from "../components/product/product-list";
import { Product } from "@/lib/types";

const mockProducts: Product[] = [
  {
    id: "1",
    title: "Produit Un",
    price: 199,
    originalPrice: 299,
    brands: { name: "mercedes" },
    onSale: true,
    images: ["/img1.jpg"],
    description: `<p className="text-[#E8E8E8BF]">Luxury meets speed in this Mercedes-inspired tee.</p>`,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: "2",
    title: "Produit Deux",
    price: 199,
    originalPrice: 299,
    brands: { name: "mercedes" },
    onSale: true,
    images: ["/img2.jpg"],
    description: `<p className="text-[#E8E8E8BF]">Luxury meets speed in this Mercedes-inspired tee.</p>`,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
];

describe("ProductList (unit)", () => {
  it("renders product cards with title and prices, and clicking a card navigates", async () => {
    render(<ProductList products={mockProducts} />);
    expect(screen.getByText("Produit Un")).toBeInTheDocument();
    expect(screen.getAllByText("299 MAD")).toHaveLength(2);
    expect(screen.getAllByText("199 MAD")).toHaveLength(2);

    await userEvent.click(screen.getByText("Produit Un"));
  });
});
*/
