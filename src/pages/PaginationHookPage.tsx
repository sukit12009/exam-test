import usePagination from '../hooks/usePagination';
import Pagination from '../components/pagination/Pagination';
import PaginatedList from '../components/pagination/PaginatedList';

// Mock API function to simulate fetching data
const fetchMockData = async (page: number, limit: number) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate mock data
  const totalItems = 100;
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalItems);
  
  const data = Array.from({ length: endIndex - startIndex }, (_, i) => ({
    id: startIndex + i + 1,
    title: `Item ${startIndex + i + 1}`,
    description: `This is item number ${startIndex + i + 1} in the list`,
  }));
  
  return { data, total: totalItems };
};

const PaginationHookPage = () => {
  const itemsPerPage = 10;
  
  const {
    currentPage,
    items,
    isLoading,
    error,
    totalPages,
    totalItems,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination({
    itemsPerPage,
    apiCall: fetchMockData,
    initialPage: 1,
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Custom Pagination Hook</h1>
        
        <PaginatedList 
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
        </PaginatedList>
      </div>
    </div>
  );
};

export default PaginationHookPage;
