import React from 'react';
import { useCart } from './CartContext';
import { ShoppingCartIcon, TrashIcon } from './Icons';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const ShoppingCart: React.FC = () => {
  const { cart, totalItems, clearCart } = useCart();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center dark:text-white">
          <ShoppingCartIcon className="mr-2" />
          Shopping Cart
          {totalItems > 0 && (
            <span className="ml-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {totalItems}
            </span>
          )}
        </h2>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm flex items-center transition-colors"
          >
            <TrashIcon className="mr-1" />
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-2" />
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <CartSummary />
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
