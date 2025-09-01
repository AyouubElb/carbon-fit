"use client";
import React, { useEffect, useState } from "react";
import FilterControls from "../filters/filter-controls";
import FilterPanel from "../filters/filter-panel";
import ProductList from "./product-list";
import Pagination from "./pagination";
import { getProducts } from "@/lib/services/products";
import { Product } from "@/lib/types";

const ProductsClient = () => {
  const [sortBy, setSortBy] = useState("Alphabetically, A-Z");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getProducts().then((data) => {
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

  const sortedAndFilteredProducts = filteredProducts.sort((a, b) => {
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
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "Date, new to old":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

      default:
        return 0;
    }
  });

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
        <ProductList products={sortedAndFilteredProducts} variant="products" />
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default ProductsClient;
