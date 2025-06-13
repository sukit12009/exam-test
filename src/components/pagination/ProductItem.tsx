import { Item } from './types';

interface ProductItemProps {
  item: Item;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => (
  <div className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
    <div className="flex items-start space-x-4">
      {item.thumbnail && (
        <img 
          src={item.thumbnail} 
          alt={item.title}
          className="w-20 h-20 object-cover rounded-md"
        />
      )}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {item.title}
        </h3>
        {item.price && (
          <p className="text-blue-600 dark:text-blue-400 font-medium">
            ${item.price.toFixed(2)}
          </p>
        )}
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          {item.description}
        </p>
      </div>
    </div>
  </div>
);

export default ProductItem;
