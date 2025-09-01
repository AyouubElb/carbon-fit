import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({ currentPage, setCurrentPage }: PaginationProps) => {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className="text-[#E8E8E8BF] hover:text-[#E8E8E8] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {[1, 2, 3, 4, 5, 6, 7].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 flex items-center justify-center transition-colors text-base font-medium ${
              currentPage === page
                ? "text-[#E8E8E8] border-b border-[#E8E8E8]"
                : "text-[#E8E8E8BF] hover:text-[#E8E8E8]"
            }`}
          >
            {page}
          </button>
        ))}

        <span className="text-[#E8E8E8BF] text-base font-medium">...</span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="text-[#E8E8E8BF] hover:text-[#E8E8E8] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
