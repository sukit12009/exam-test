export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type NotificationType = 'success' | 'error' | '';

export interface NotificationProps {
  message: string;
  type: NotificationType;
}

export interface CartContextType {
  cart: CartItem[];
  products: Product[];
  isLoading: boolean;
  notification: NotificationProps;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  total: number;
}
