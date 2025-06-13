import { useState, useEffect } from 'react';
import usePagination from '../hooks/usePagination';
import Pagination from '../components/pagination/Pagination';
import ProductList from '../components/pagination/ProductList';
import { fetchProducts } from '../components/pagination/api';
import { Item } from '../components/pagination/types';

const PaginationHookPage = () => {
  const itemsPerPage = 10;
  const [error, setError] = useState<string | null>(null);
  
  const {
    currentPage,
    items = [],
    isLoading,
    totalPages,
    totalItems,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination<Item>({
    itemsPerPage,
    apiCall: fetchProducts,
    initialPage: 1,
  });

  // Handle errors from the pagination hook
  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error]);

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-200">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Product Catalog
        </h1>
        
        <ProductList 
          items={items}
          isLoading={isLoading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onPageChange={goToPage}
            onNext={nextPage}
            onPrev={prevPage}
          />
        </ProductList>
      </div>
    </div>
  );
};

export default PaginationHookPage;
