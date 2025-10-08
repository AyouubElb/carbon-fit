import { Product } from "@/lib/types";
import { ChevronDown, Filter } from "lucide-react";
import React from "react";

interface FilterControlsProps {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  showSortDropdown: boolean;
  setShowSortDropdown: (show: boolean) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filteredProducts: Product[];
}

const sortOptions = [
  "Alphabétique, A-Z",
  "Alphabétique, Z-A",
  "Prix, du plus bas au plus élevé",
  "Prix, du plus élevé au plus bas",
  "Date, de l’ancien au plus récent",
  "Date, du plus récent au plus ancien",
];

const FilterControls = ({
  sortBy,
  setSortBy,
  showSortDropdown,
  setShowSortDropdown,
  showFilters,
  setShowFilters,
  filteredProducts,
}: FilterControlsProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-[#ecc174] text-base md:text-lg font-medium hover:text-[#E8E8E8] transition-colors cursor-pointer"
      >
        <Filter size={16} />
        Filtrer
        <span className="md:hidden"> & Sort</span>
      </button>

      <div className="flex items-center gap-8 text-sm md:text-base text-[#E8E8E8BF] font-medium">
        <div className="hidden md:flex gap-4">
          <span>Trier par:</span>
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 hover:text-[#E8E8E8] transition-colors cursor-pointer"
            >
              {sortBy}
              <ChevronDown size={16} />
            </button>

            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-[#2a2a2c] border border-[#3a3a3c] rounded-none min-w-[200px] z-50">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setShowSortDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-[#E8E8E8BF] hover:text-[#E8E8E8] hover:bg-[#3a3a3c] transition-colors font-figtree text-base"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <span className="text-[#E8E8E8BF] ">
          {filteredProducts.length} produits
        </span>
      </div>
    </div>
  );
};

export default FilterControls;
