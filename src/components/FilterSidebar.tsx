
import { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter, X } from 'lucide-react';

interface FilterSidebarProps {
  className?: string;
  showMobileFilters?: boolean;
}

const FilterSidebar = ({ className, showMobileFilters }: FilterSidebarProps) => {
  const { categories, activeCategory, setActiveCategory } = useProducts();
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category === activeCategory ? null : category);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setActiveCategory(null);
    setIsOpen(false);
  };

  const FilterContent = () => (
    <div className="flex flex-col space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-medium">Categories</h3>
          {activeCategory && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-muted-foreground">
              Clear All
            </Button>
          )}
        </div>
        <Separator className="my-3" />
        <div className="space-y-2 mt-2">
          {categories.map((category) => (
            <div 
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`filter-item ${category === activeCategory ? 'filter-active' : ''}`}
            >
              <span className="text-sm capitalize">{category}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading text-lg font-medium">Price Range</h3>
        <Separator className="my-3" />
        <div className="space-y-2">
          <div className="filter-item">
            <span className="text-sm">Under $25</span>
          </div>
          <div className="filter-item">
            <span className="text-sm">$25 to $50</span>
          </div>
          <div className="filter-item">
            <span className="text-sm">$50 to $100</span>
          </div>
          <div className="filter-item">
            <span className="text-sm">$100 to $200</span>
          </div>
          <div className="filter-item">
            <span className="text-sm">$200 & Above</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile filter drawer
  if (showMobileFilters) {
    return (
      <div className="block lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] sm:w-[350px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-heading font-medium">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  // Desktop sidebar
  return (
    <div className={`hidden lg:block ${className}`}>
      <FilterContent />
    </div>
  );
};

export default FilterSidebar;
