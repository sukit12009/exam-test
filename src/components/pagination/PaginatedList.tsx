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
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        Error: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2">Loading items...</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">
        Items (Page {currentPage} of {totalPages})
      </h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="p-3 border rounded hover:bg-gray-50 transition-colors">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default PaginatedList;
