import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) => {
  // Generate a compact pages array with ellipsis when totalPages is large
  const buildPageItems = (current: number, total: number) => {
    if (total <= 7) {
      // simple range 1..total
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | "left-ellipsis" | "right-ellipsis")[] = [];
    pages.push(1);

    const left = Math.max(2, current - 1);
    const right = Math.min(total - 1, current + 1);

    if (left > 2) {
      pages.push("left-ellipsis");
    }

    for (let p = left; p <= right; p++) {
      pages.push(p);
    }

    if (right < total - 1) {
      pages.push("right-ellipsis");
    }

    pages.push(total);
    return pages;
  };

  const pageItems = buildPageItems(currentPage, Math.max(0, totalPages));

  const goTo = (page: number) => {
    const safe = Math.max(1, Math.min(totalPages, page));
    if (safe !== currentPage) setCurrentPage(safe);
  };

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages || totalPages === 0;

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={prevDisabled}
          aria-label="Previous page"
          className={`transition-colors ${
            prevDisabled
              ? "text-[#E8E8E8BF] opacity-40 cursor-not-allowed"
              : "text-[#E8E8E8BF] hover:text-[#E8E8E8]"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {pageItems.map((item, idx) =>
          typeof item === "number" ? (
            <button
              key={`page-${item}`}
              onClick={() => goTo(item)}
              aria-current={currentPage === item ? "page" : undefined}
              className={`w-8 h-8 flex items-center justify-center transition-colors text-base font-medium ${
                currentPage === item
                  ? "text-[#E8E8E8] border-b border-[#E8E8E8]"
                  : "text-[#E8E8E8BF] hover:text-[#E8E8E8]"
              }`}
            >
              {item}
            </button>
          ) : (
            <span
              key={`ellipsis-${idx}-${item}`}
              className="text-[#E8E8E8BF] text-base font-medium select-none"
              aria-hidden
            >
              …
            </span>
          )
        )}

        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={nextDisabled}
          aria-label="Next page"
          className={`transition-colors ${
            nextDisabled
              ? "text-[#E8E8E8BF] opacity-40 cursor-not-allowed"
              : "text-[#E8E8E8BF] hover:text-[#E8E8E8]"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
