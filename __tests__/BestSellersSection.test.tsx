/*import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as productService from "@/lib/services/products";
import BestSellersSection from "@/components/home/best-sellers-section";

jest.mock("@/lib/supabaseClient", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: null }),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
    })),
  },
  SUPABASE_IMAGE_URL:
    "https://bnamvffvziulrvptnjax.supabase.co/storage/v1/object/public/",
}));

// create a push mock for next/navigation
const mockPush = jest.fn();

// mock next/navigation to return our push mock
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// mock getProducts function from the service module
jest.spyOn(productService, "getProducts").mockImplementation(() =>
  Promise.resolve([
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
  ])
);

describe("BestSellersSection (integration)", () => {
  it("renders heading, product list and view all button, and navigates on product click", async () => {
    render(<BestSellersSection />);

    // heading present
    expect(
      screen.getByRole("heading", { name: /MEILLEURES VENTES/i })
    ).toBeInTheDocument();

    // products rendered
    expect(screen.getByText("Produit Un")).toBeInTheDocument();
    expect(screen.getByText("Produit Deux")).toBeInTheDocument();

    // ViewAllButton existence (depending on its content — adjust if it has custom text)
    // If ViewAllButton is a simple button with text 'View All' or 'Voir tout' adapt selector:
    // expect(screen.getByRole('button', { name: /voir tout|view all/i })).toBeInTheDocument();

    // simulate clicking the first product title — should bubble and hit Card onClick
    await userEvent.click(screen.getByText("Produit Un"));

    // assert navigation called with expected path
    expect(mockPush).toHaveBeenCalledWith("/products/1");
  });
});
*/
