export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Item {
  id: number;
  title: string;
  description: string;
  price?: number;
  thumbnail?: string;
}

export interface PaginationData<T> {
  data: T[];
  total: number;
}
