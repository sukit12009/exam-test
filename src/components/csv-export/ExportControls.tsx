const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

interface ExportControlsProps {
  isLoading: boolean;
  productCount: number;
  onExport: () => void;
}

export const ExportControls = ({ 
  isLoading, 
  productCount, 
  onExport 
}: ExportControlsProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Product Export
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isLoading 
              ? 'Loading products...' 
              : productCount > 0 
                ? `Found ${productCount} products to export`
                : 'No products found in local storage'}
          </p>
        </div>
        <button
          onClick={onExport}
          disabled={isLoading || productCount === 0}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isLoading || productCount === 0
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
          } transition-colors duration-200`}
        >
          <DownloadIcon className="mr-2 h-4 w-4" />
          {isLoading ? 'Processing...' : 'Export to CSV'}
        </button>
      </div>
    </div>
  );
};
