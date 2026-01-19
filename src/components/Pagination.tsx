"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  itemsPerPage: number
  onItemsPerPageChange: (items: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always show first page
    pages.push(1)

    if (currentPage > 3) {
      pages.push('...')
    }

    // Show pages around current
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
      {/* Items per page selector */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-white/60 font-mono text-xs uppercase tracking-wider">Show:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded text-xs font-mono hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-cosmic-blue cursor-pointer"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        <span className="text-white/40 text-xs font-mono">items/page</span>
      </div>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`min-w-[32px] h-8 px-2 rounded text-xs font-mono transition-colors ${
                  currentPage === page
                    ? 'bg-cosmic-blue text-white border border-cosmic-blue'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="px-2 text-white/40 text-xs">
                {page}
              </span>
            )
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
