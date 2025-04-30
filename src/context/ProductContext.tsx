import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '@/types/product';

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  activeCategory: string | null;
  isLoading: boolean;
  error: string | null;
  setActiveCategory: (category: string | null) => void;
  searchProducts: (query: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('featured');

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Get category from URL
    const categoryParam = params.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
    
    // Get search query from URL
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
      // Also update localStorage
      localStorage.setItem('shopSearch', searchParam);
    }
    
    // Get sort order from URL
    const sortParam = params.get('sort');
    if (sortParam) {
      setSortOrder(sortParam);
    }
  }, [location.search]);

  // Filter and sort products when filters, search query, or sort order changes
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (activeCategory) {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortOrder) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default: // 'featured' - no specific sorting
        // Keep original order from API
        break;
    }
    
    setFilteredProducts(result);
  }, [products, activeCategory, searchQuery, sortOrder]);

  const searchProducts = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <ProductContext.Provider 
      value={{
        products,
        filteredProducts,
        categories,
        activeCategory,
        isLoading,
        error,
        setActiveCategory,
        searchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
