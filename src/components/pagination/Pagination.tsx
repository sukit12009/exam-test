interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  isLoading: boolean;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  isLoading,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  onNext,
  onPrev,
}) => {
  // Calculate the range of items being shown
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Showing <span className="font-medium text-gray-800 dark:text-gray-100">{startItem}</span> to{' '}
        <span className="font-medium text-gray-800 dark:text-gray-100">{endItem}</span> of{' '}
        <span className="font-medium text-gray-800 dark:text-gray-100">{totalItems}</span> results
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || isLoading}
          className={`px-3 py-1 rounded-md transition-colors duration-200 ${
            currentPage > 1
              ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
              : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
          }`}
          title="First Page"
        >
          ««
        </button>
        <button
          onClick={onPrev}
          disabled={!hasPrevPage || isLoading}
          className={`px-3 py-1 rounded-md transition-colors duration-200 ${
            hasPrevPage
              ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
              : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
          }`}
          title="Previous Page"
        >
          «
        </button>
        
        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Calculate page numbers to show (current page in the middle when possible)
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-10 h-10 rounded-md flex items-center justify-center ${
                  currentPage === pageNum
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
                disabled={isLoading}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        
        <button
          onClick={onNext}
          disabled={!hasNextPage || isLoading}
          className={`px-3 py-1 rounded-md transition-colors duration-200 ${
            hasNextPage
              ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
              : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
          }`}
          title="Next Page"
        >
          »
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || isLoading}
          className={`px-3 py-1 rounded-md transition-colors duration-200 ${
            currentPage < totalPages
              ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
              : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
          }`}
          title="Last Page"
        >
          »»
        </button>
      </div>
    </div>
  );
};

export default Pagination;
