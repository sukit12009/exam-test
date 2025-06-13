import { PaginationData, Item } from './types';

export const fetchProducts = async (
  page: number, 
  limit: number
): Promise<PaginationData<Item>> => {
  try {
    const skip = (page - 1) * limit;
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const result = await response.json();
    
    // Transform the response to match our Item type
    const data: Item[] = result.products.map((product: any) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail
    }));
    
    return { 
      data, 
      total: result.total 
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: [], total: 0 };
  }
};
