"use client";
import React, { useState, useEffect } from "react";
import FilterControls from "../filters/filter-controls";
import FilterPanel from "../filters/filter-panel";
import ProductList from "./product-list";
import Pagination from "./pagination";
import { useProducts, useProductCount } from "@/lib/hooks/useProducts";
import { useSearchParams } from "next/navigation";

const PAGE_SIZE = 12;

const ProductsClient = () => {
  const searchParams = useSearchParams();

  // Parse URL brand parameter
  const urlBrand = searchParams.get("brand");
  const brandFromUrl =
    urlBrand && urlBrand.trim() !== "" && urlBrand.toLowerCase() !== "all"
      ? urlBrand
      : undefined;

  const [sortBy, setSortBy] = useState("Alphabétiquement, A-Z");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    brandFromUrl ? [brandFromUrl] : []
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");

  // Parse price range
  const [priceMin, priceMax] = selectedPriceRange
    ? (() => {
        const [min, max] = selectedPriceRange.split("-");
        return max === "+"
          ? [Number.parseInt(min), undefined]
          : [Number.parseInt(min), Number.parseInt(max)];
      })()
    : [undefined, undefined];

  // Fetch products with React Query
  const {
    data: products = [],
    isLoading,
    error,
    refetch,
  } = useProducts({
    brands: selectedBrands,
    sortBy,
    priceMin,
    priceMax,
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  // Get total count for pagination
  const { data: totalCount = 0 } = useProductCount({
    brands: selectedBrands,
    priceMin,
    priceMax,
  });

  const numberOfPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrands, selectedPriceRange, sortBy]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedPriceRange("");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="px-4 md:px-[50px] py-20 text-center">
        <p className="text-lg">Chargement des produits...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="px-4 md:px-[50px] py-20 text-center">
        <p className="text-red-500 text-lg mb-4">Impossible de charger les produits</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Réessayer
        </button>
      </div>
    );
  }

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
        filteredProducts={products}
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
        {products.length === 0 ? (
          <p className="text-center py-10 text-gray-500">Aucun produit trouvé</p>
        ) : (
          <ProductList products={products} variant="products" />
        )}
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
