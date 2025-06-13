import { Product } from '../../hooks/useProducts';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const ProductCard = ({ product, onEdit, onDelete, isDeleting }: ProductCardProps) => {
  const { id, name, price, description, category, image, createdAt } = product;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
      {image && (
        <div className="h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">{name}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
            {category}
          </span>
        </div>
        
        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">฿{price.toLocaleString()}</p>
        
        {description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Added: {new Date(createdAt).toLocaleDateString()}
          </span>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(product)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
              disabled={isDeleting}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(id)}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium transition-colors duration-200"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
