import { Item } from './types';
import ProductItem from './ProductItem';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

interface ProductListProps {
  items: Item[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  children: React.ReactNode;
}

const ProductList: React.FC<ProductListProps> = ({
  items,
  isLoading,
  error,
  currentPage,
  totalPages,
  children,
}) => {
  if (isLoading && items.length === 0) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No products found</p>
      </div>
    );
  }


  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {items.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
      
      {children}
      
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default ProductList;
