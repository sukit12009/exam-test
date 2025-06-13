export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image?: string;
}

export type MessageType = {
  text: string;
  type: 'success' | 'error' | '';
};
