import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, NotificationProps, CartContextType } from './types';

const CartContext = createContext<CartContextType | undefined>(undefined);

const mockProducts: Product[] = [
  { id: 1, name: 'T-Shirt', price: 399, image: 'https://via.placeholder.com/80', stock: 10 },
  { id: 2, name: 'Jeans', price: 799, image: 'https://via.placeholder.com/80', stock: 10 },
  { id: 3, name: 'Sneakers', price: 1299, image: 'https://via.placeholder.com/80', stock: 10 },
  { id: 4, name: 'Cap', price: 299, image: 'https://via.placeholder.com/80', stock: 10 },
];

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<NotificationProps>({ message: '', type: '' });

  useEffect(() => {
    // Load products from localStorage or fallback to mock data
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts).map((product: Product) => ({
        ...product,
        stock: 10
      }));
      setProducts(parsedProducts);
      localStorage.setItem('products', JSON.stringify(parsedProducts));
    } else {
      localStorage.setItem('products', JSON.stringify(mockProducts));
      setProducts(mockProducts);
    }

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    setIsLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          setNotification({
            message: 'Not enough stock available',
            type: 'error'
          });
          return prevCart;
        }
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    
    setNotification({
      message: 'Item added to cart',
      type: 'success'
    });
    
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const product = cart.find(item => item.id === productId);
    if (!product) return;
    
    if (newQuantity > product.stock) {
      setNotification({
        message: 'Not enough stock available',
        type: 'error'
      });
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    setNotification({
      message: 'Item removed from cart',
      type: 'success'
    });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    setNotification({
      message: 'Cart cleared successfully',
      type: 'success'
    });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = subtotal > 0 ? 50 : 0;
  const total = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        isLoading,
        notification,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        shippingFee,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
