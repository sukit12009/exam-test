import VirtualizedList from '../components/VirtualizedList';

const VirtualizedListPage = () => {
  // Generate mock data for 100,000 items
  const data = Array.from({ length: 100000 }, (_, i) => `Item ${i + 1}`);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">All Items</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Showing a total of <span className="font-medium text-blue-600 dark:text-blue-400">{data.length.toLocaleString()}</span> items
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-2 transition-colors duration-200">
          <VirtualizedList data={data} height={600} />
        </div>
      </div>
    </div>
   
  );
};

export default VirtualizedListPage;
