
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '@/components/ProductGrid';
import FilterSidebar from '@/components/FilterSidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useProducts } from '@/context/ProductContext';
import { useToast } from '@/components/ui/use-toast';

const Shop = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const { activeCategory, setActiveCategory, isLoading } = useProducts();
  const [sortBy, setSortBy] = useState('featured');

  // Initialize state from URL parameters or localStorage
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const sortParam = searchParams.get('sort');

    // Set category from URL param or localStorage
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      const savedCategory = localStorage.getItem('shopCategory');
      if (savedCategory) {
        setActiveCategory(savedCategory);
        // Update URL to match localStorage
        updateUrlParams(savedCategory, sortBy);
      }
    }

    // Set sorting from URL param or localStorage
    if (sortParam) {
      setSortBy(sortParam);
    } else {
      const savedSort = localStorage.getItem('shopSort');
      if (savedSort) {
        setSortBy(savedSort);
        // Update URL to match localStorage if not already set from category
        if (!categoryParam) {
          updateUrlParams(activeCategory, savedSort);
        }
      }
    }
  }, []);

  // Save filter preferences to localStorage and update URL whenever they change
  useEffect(() => {
    // Save to localStorage
    if (activeCategory) {
      localStorage.setItem('shopCategory', activeCategory);
    } else {
      localStorage.removeItem('shopCategory');
    }
    localStorage.setItem('shopSort', sortBy);
    
    // Update URL params
    updateUrlParams(activeCategory, sortBy);
  }, [activeCategory, sortBy]);

  const updateUrlParams = (category: string | null, sort: string) => {
    const newParams = new URLSearchParams();
    if (category) newParams.set('category', category);
    if (sort !== 'featured') newParams.set('sort', sort);
    setSearchParams(newParams);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    toast({
      title: "Sorting updated",
      description: `Products are now sorted by ${value.replace('-', ' ')}.`
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-2">DISCOVER OUR PRODUCTS</h1>
        <p className="text-muted-foreground">Find the perfect item for your style</p>
      </div>

      {/* Active filters */}
      {activeCategory && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          <div className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs">
            {activeCategory}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-4 w-4 ml-1 hover:bg-transparent" 
              onClick={() => setActiveCategory(null)}
            >
              <span>×</span>
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        {/* Mobile filters */}
        <FilterSidebar showMobileFilters />

        {/* Sort options */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="text-sm border rounded-md px-2 py-1"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop sidebar */}
        <aside className="lg:w-1/4 xl:w-1/5">
          <FilterSidebar className="sticky top-24" />
        </aside>

        {/* Main content */}
        <main className="lg:w-3/4 xl:w-4/5">
          <ProductGrid />
        </main>
      </div>
    </div>
  );
};

export default Shop;
