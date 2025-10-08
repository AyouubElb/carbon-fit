"use client";
import React, { useEffect, useState } from "react";
import FilterControls from "../filters/filter-controls";
import FilterPanel from "../filters/filter-panel";
import ProductList from "./product-list";
import Pagination from "./pagination";
import { getProducts } from "@/lib/services/products";
import { Product } from "@/lib/types";
import { useSearchParams } from "next/navigation";

const PAGE_SIZE = 12;

const ProductsClient = () => {
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState("Alphabetically, A-Z");
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const raw = searchParams.get("brand");
    const brand =
      raw && raw.trim() !== "" && raw.toLowerCase() !== "all" ? raw : undefined;

    getProducts(brand).then((data) => {
      if (mounted) {
        setProducts(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = products.filter((product) => {
    const brandMatch =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product.brands.name);

    let priceMatch = true;
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split("-");
      if (max === "+") {
        priceMatch = product.price >= Number.parseInt(min);
      } else {
        priceMatch =
          product.price >= Number.parseInt(min) &&
          product.price <= Number.parseInt(max);
      }
    }

    return brandMatch && priceMatch;
  });

  // Helper to safely convert product.created_at to a timestamp (number)
  const toTimestamp = (d?: string | Date | null): number => {
    if (!d) return 0;
    const t = new Date(d).getTime();
    return Number.isNaN(t) ? 0 : t;
  };

  const sortedAndFilteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Alphabetically, A-Z":
        return a.title.localeCompare(b.title);
      case "Alphabetically, Z-A":
        return b.title.localeCompare(a.title);
      case "Price, low to high":
        return a.price - b.price;
      case "Price, high to low":
        return b.price - a.price;
      case "Date, old to new":
        return toTimestamp(a.created_at) - toTimestamp(b.created_at);
      case "Date, new to old":
        return toTimestamp(b.created_at) - toTimestamp(a.created_at);

      default:
        return 0;
    }
  });

  // Update number of pages whenever the filtered+sorted list changes
  useEffect(() => {
    const pages = Math.max(
      1,
      Math.ceil(sortedAndFilteredProducts.length / PAGE_SIZE)
    );
    setNumberOfPages(pages);

    // If current page is out of range after filtering, reset to 1
    if (currentPage > pages) {
      setCurrentPage(1);
    }
  }, [sortedAndFilteredProducts.length, currentPage]);

  // Reset to first page when user changes filters or sorting (good UX)
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrands, selectedPriceRange, sortBy]);

  // Slice the sorted & filtered products for the current page
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageEnd = pageStart + PAGE_SIZE;
  const pageProducts = sortedAndFilteredProducts.slice(pageStart, pageEnd);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedPriceRange("");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="px-4 md:px-[50px]">
      {/* Filter and Sort Controls */}
      <FilterControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        showSortDropdown={showSortDropdown}
        setShowSortDropdown={setShowSortDropdown}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filteredProducts={filteredProducts}
      />

      {/* Filter Panel */}
      <FilterPanel
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        selectedBrands={selectedBrands}
        handleBrandChange={handleBrandChange}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        clearFilters={clearFilters}
      />

      {/* Product Grid */}
      <div className="mb-16">
        <ProductList products={pageProducts} variant="products" />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={numberOfPages}
      />
    </div>
  );
};

export default ProductsClient;
