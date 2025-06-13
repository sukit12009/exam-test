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
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-20 h-20 object-cover rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const placeholder = target.nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = 'block';
                }}
              />
            ) : null}
            <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center" style={{ display: product.image ? 'none' : 'flex' }}>
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
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
