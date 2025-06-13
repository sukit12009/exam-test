import React from 'react';
import { useCart } from './CartContext';
import { PlusIcon } from './Icons';

const ProductList: React.FC = () => {
  const { products, isLoading, cart, addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        const availableStock = product.stock - (cartItem?.quantity || 0);
        
        return (
          <div 
            key={product.id} 
            className="flex items-center p-4 border rounded-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-20 h-20 object-cover rounded"
            />
            <div className="ml-4 flex-1">
              <h3 className="font-medium dark:text-white">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">฿{product.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {availableStock > 0 
                  ? `In stock: ${availableStock}` 
                  : 'Out of stock'}
              </p>
            </div>
            <button
              onClick={() => addToCart(product)}
              disabled={availableStock <= 0}
              className={`px-3 py-1 rounded-md text-sm flex items-center transition-colors ${
                availableStock > 0 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <PlusIcon className={`mr-1 ${availableStock > 0 ? 'text-white' : ''}`} />
              {availableStock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
