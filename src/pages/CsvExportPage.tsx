import { useEffect, useState } from 'react';
import { 
  Product, 
  MessageType, 
  convertToCSV, 
  downloadCSV,
  StatusMessage,
  ProductTable,
  ExportControls
} from '../components/csv-export';

const CsvExportPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<MessageType>({ text: '', type: '' });

  // Load products from localStorage
  useEffect(() => {
    const loadProducts = () => {
      try {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setMessage({ text: 'Failed to load products', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Handle download CSV
  const handleExportCSV = () => {
    try {
      if (products.length === 0) {
        setMessage({ text: 'No products to export', type: 'error' });
        return;
      }

      const csvContent = convertToCSV(products);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      downloadCSV(csvContent, `products-export-${timestamp}.csv`);
      
      setMessage({ 
        text: `Successfully exported ${products.length} products`, 
        type: 'success' 
      });
    } catch (error) {
      console.error('Error exporting CSV:', error);
      setMessage({ 
        text: 'Failed to export products', 
        type: 'error' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Export Products to CSV
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Export your product list to a CSV file for easy sharing and backup.
            </p>
          </div>

          <StatusMessage message={message} />

          <ExportControls 
            isLoading={isLoading}
            productCount={products.length}
            onExport={handleExportCSV}
          />

          <ProductTable products={products} />
        </div>
      </div>
    </div>
  );
};

export default CsvExportPage;
