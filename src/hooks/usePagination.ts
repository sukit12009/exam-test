import { useState, useCallback, useEffect } from 'react';

interface UsePaginationProps<T> {
  initialPage?: number;
  itemsPerPage: number;
  totalItems?: number; // Made optional since it's not required when using apiCall
  onPageChange?: (page: number) => void;
  apiCall?: (page: number, limit: number) => Promise<{ data: T[]; total: number }>;
  initialData?: T[];
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  items: T[];
  isLoading: boolean;
  error: Error | null;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalItems: number;
}

export function usePagination<T>({
  initialPage = 1,
  itemsPerPage,
  totalItems: initialTotalItems = 0,
  onPageChange,
  apiCall,
  initialData = [],
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [items, setItems] = useState<T[]>(initialData);
  const [totalItems, setTotalItems] = useState(initialTotalItems);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const fetchData = useCallback(
    async (page: number) => {
      if (!apiCall) return;

      setIsLoading(true);
      setError(null);

      try {
        const { data, total } = await apiCall(page, itemsPerPage);
        setItems(data);
        setTotalItems(total);
        onPageChange?.(page);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    },
    [apiCall, itemsPerPage, onPageChange]
  );

  useEffect(() => {
    if (apiCall) {
      fetchData(currentPage);
    }
  }, [currentPage, apiCall, fetchData]);

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [hasNextPage]);

  const prevPage = useCallback(() => {
    if (hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [hasPrevPage]);

  return {
    currentPage,
    totalPages,
    items,
    isLoading,
    error,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    totalItems,
  };
}

export default usePagination;
