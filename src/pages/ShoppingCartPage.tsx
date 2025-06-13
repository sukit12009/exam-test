import React from 'react';
import { CartProvider, Notification, ProductList, ShoppingCart } from '../components/cart';

const ShoppingCartPage = () => {

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Shopping Cart</h1>
          
          <Notification />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product List */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
                <h2 className="text-xl font-semibold mb-6 dark:text-white">All Products</h2>
                <ProductList />
              </div>
            </div>

            {/* Shopping Cart */}
            <div>
              <ShoppingCart />
            </div>
          </div>
        </div>
      </div>
    </CartProvider>
  );
};

export default ShoppingCartPage;
