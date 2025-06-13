interface Item {
  id: number;
  title: string;
  description: string;
}

interface PaginatedListProps {
  items: Item[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  children?: React.ReactNode;
}

const PaginatedList: React.FC<PaginatedListProps> = ({
  items,
  isLoading,
  error,
  currentPage,
  totalPages,
  children,
}) => {
  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4 transition-colors duration-200">
        Error: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-400 mx-auto"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Loading items...</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
        Items (Page {currentPage} of {totalPages})
      </h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li 
            key={item.id} 
            className="p-4 border rounded-lg hover:bg-gray-50 dark:bg-gray-700/50 dark:border-gray-600 dark:hover:bg-gray-700/70 transition-colors duration-200 shadow-sm dark:shadow-none"
          >
            <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default PaginatedList;
