import { useState, useEffect, useCallback } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  createdAt: string;
}

const STORAGE_KEY = 'products';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const saveProducts = useCallback((updatedProducts: Product[]): boolean => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save products';
      setError(errorMessage);
      console.error('Error saving products:', err);
      return false;
    }
  }, []);

  const loadProducts = useCallback((): void => {
    try {
      setLoading(true);
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
      setError(errorMessage);
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = useCallback(async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
    try {
      setLoading(true);
      setError(null);
      
      const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      
      const updatedProducts = [...products, newProduct];
      saveProducts(updatedProducts);
      return newProduct;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add product';
      setError(errorMessage);
      console.error('Error adding product:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [products, saveProducts]);

  const updateProduct = useCallback(async (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<Product | undefined> => {
    try {
      setLoading(true);
      setError(null);
      
      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex === -1) {
        throw new Error('Product not found');
      }
      
      const updatedProduct = { ...products[productIndex], ...updates };
      const updatedProducts = [...products];
      updatedProducts[productIndex] = updatedProduct;
      
      saveProducts(updatedProducts);
      return updatedProduct;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update product';
      setError(errorMessage);
      console.error('Error updating product:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [products, saveProducts]);

  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const productExists = products.some(p => p.id === id);
      if (!productExists) {
        throw new Error('Product not found');
      }
      
      const updatedProducts = products.filter(product => product.id !== id);
      saveProducts(updatedProducts);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete product';
      setError(errorMessage);
      console.error('Error deleting product:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [products, saveProducts]);

  const getProductById = useCallback((id: string): Product | undefined => {
    return products.find(product => product.id === id);
  }, [products]);

  // Load products on initial render
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    refreshProducts: loadProducts,
  };
};

export default useProducts;
