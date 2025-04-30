
import { useState } from 'react';
import ProductGrid from '@/components/ProductGrid';
import FilterSidebar from '@/components/FilterSidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useProducts } from '@/context/ProductContext';

const ProductPage = () => {
  const { activeCategory, setActiveCategory } = useProducts();
  const [sortBy, setSortBy] = useState('featured');

  const handleSortChange = (value: string) => {
    setSortBy(value);
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

export default ProductPage;
