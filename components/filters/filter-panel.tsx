import { ChevronDown, X } from "lucide-react";
import React from "react";

const brands = ["audi", "bmw", "mercedes", "porsche", "ferrari", "volkswagen"];
const priceRanges = [
  { label: "Under Dh 250", value: "0-250" },
  { label: "Dh 250 - Dh 350", value: "250-350" },
  { label: "Dh 350 - Dh 450", value: "350-450" },
  { label: "Over Dh 450", value: "450+" },
];

const sortOptions = [
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
  "Price, low to high",
  "Price, high to low",
  "Date, old to new",
  "Date, new to old",
];

interface FilterPanelProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  selectedBrands: string[];
  handleBrandChange: (brand: string) => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (range: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  clearFilters: () => void;
}

const FilterPanel = ({
  showFilters,
  setShowFilters,
  selectedBrands,
  handleBrandChange,
  selectedPriceRange,
  setSelectedPriceRange,
  sortBy,
  setSortBy,
  clearFilters,
}: FilterPanelProps) => {
  return (
    <>
      {showFilters && (
        <div className="bg-[#2a2a2c] border border-[#3a3a3c] p-6 mb-8 rounded-none">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#E8E8E8] font-figtree text-lg font-medium">
              Filters
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-[#E8E8E8BF] hover:text-[#E8E8E8] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Brand Filter */}
            <div>
              <h4 className="text-[#E8E8E8] font-figtree text-sm font-medium mb-4">
                Car Brand
              </h4>
              <div className="space-y-3">
                {brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="w-4 h-4 rounded-none border border-[#3a3a3c] bg-transparent checked:bg-[rgb(236,193,116)] checked:border-[rgb(236,193,116)] focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-[#E8E8E8BF] font-figtree text-sm capitalize">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="text-[#E8E8E8] font-figtree text-sm font-medium mb-4">
                Price Range
              </h4>
              <div className="space-y-3">
                {priceRanges.map((range) => (
                  <label
                    key={range.value}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.value}
                      checked={selectedPriceRange === range.value}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="w-4 h-4 rounded-full border border-[#3a3a3c] bg-transparent checked:bg-[rgb(236,193,116)] checked:border-[rgb(236,193,116)] focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-[#E8E8E8BF] font-figtree text-sm">
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort By section for mobile */}
            <div className="md:hidden">
              <h4 className="text-[#E8E8E8] font-figtree text-sm font-medium mb-4">
                Sort By
              </h4>
              <div className="space-y-3">
                {sortOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="sortBy"
                      value={option}
                      checked={sortBy === option}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-4 h-4 rounded-full border border-[#3a3a3c] bg-transparent checked:bg-[rgb(236,193,116)] checked:border-[rgb(236,193,116)] focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-[#E8E8E8BF] font-figtree text-sm">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-end mt-6">
            <button
              onClick={clearFilters}
              className="text-[rgb(236,193,116)] font-figtree text-sm hover:text-[#E8E8E8] transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
