import React from 'react';
import { useCart } from './CartContext';
import { MinusIcon, PlusIcon, TrashIcon } from './Icons';
import { CartItem as CartItemType } from './types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center p-3 border-b dark:border-gray-700">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-16 h-16 object-cover rounded"
      />
      <div className="ml-3 flex-1">
        <h3 className="font-medium dark:text-white">{item.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">฿{item.price.toLocaleString()}</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-l-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Decrease quantity"
        >
          <MinusIcon className="h-3.5 w-3.5" />
        </button>
        <div className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
          <span className="text-gray-800 dark:text-gray-200">{item.quantity}</span>
        </div>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          disabled={item.quantity >= item.stock}
          className={`w-8 h-8 flex items-center justify-center border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md transition-colors
            ${item.quantity >= item.stock 
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
              : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          aria-label="Increase quantity"
        >
          <PlusIcon className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => removeFromCart(item.id)}
          className="ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 transition-colors"
          aria-label="Remove item"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
