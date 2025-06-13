import React from 'react';
import { useCart } from './CartContext';

const CartSummary: React.FC = () => {
  const { subtotal, shippingFee, total } = useCart();

  return (
    <div className="border-t pt-4 space-y-2">
      <div className="flex justify-between">
        <span className="dark:text-gray-300">Subtotal</span>
        <span className="dark:text-white">฿{subtotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span className="dark:text-gray-300">Shipping</span>
        <span className="dark:text-white">
          {shippingFee > 0 ? `฿${shippingFee.toLocaleString()}` : 'Free'}
        </span>
      </div>
      <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
        <span className="dark:text-white">Total</span>
        <span className="dark:text-white">฿{total.toLocaleString()}</span>
      </div>
      <button
        className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-medium transition-colors dark:bg-green-600 dark:hover:bg-green-700"
        onClick={() => alert('Proceed to checkout')}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
