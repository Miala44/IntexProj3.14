// import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const safeTotalPages = Math.max(0, totalPages || 0);

  // Optional: Hide pagination if no pages
  // if (safeTotalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center flex-col mt-4 space-y-2">
      <div className="flex items-center space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>

        {[...Array(safeTotalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === safeTotalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <div>
        <label>
          Results per page:{' '}
          <select
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
              onPageChange(1); // reset to first page when page size changes
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Pagination;
