
import { createContext, useState, useEffect, useContext } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

// Create Context
export const ProductContext = createContext();

// Create Provider Component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Get filtered products based on category
  const filteredProducts = activeCategory
    ? products.filter(product => product.category === activeCategory)
    : products;

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        
        setProducts(data);
        
        // Get unique categories
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
        
        // Check URL for category
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
          setActiveCategory(categoryParam);
        }
        
      } catch (err) {
        setError(err.message || 'An error occurred while fetching products');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Track category changes and update URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam !== activeCategory) {
      // URL changed externally, update state
      if (categoryParam) {
        setActiveCategory(categoryParam);
      }
    }
  }, [searchParams]);

  // Context value
  const value = {
    products,
    categories,
    activeCategory,
    setActiveCategory,
    filteredProducts,
    isLoading,
    error
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for using product context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
