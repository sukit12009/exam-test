import React from 'react';
import { useCart } from './CartContext';

const Notification: React.FC = () => {
  const { notification } = useCart();
  const { message, type } = notification;
  
  if (!message) return null;

  return (
    <div 
      className={`mb-6 p-4 rounded-md transition-colors duration-300 ${
        type === 'success' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
