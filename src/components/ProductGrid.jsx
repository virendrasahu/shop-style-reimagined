
import { Link } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/types/product';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ProductCard = ({ product }: { product: Product }) => {
  const handleAddToCart = () => {
    // Get current cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <Card className="product-card group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="product-img">
          <img 
            src={product.image} 
            alt={product.title} 
            className="h-full w-full object-contain transition-transform group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <span className="product-badge capitalize">{product.category}</span>
          </div>
          <h3 className="font-medium text-sm line-clamp-2 h-10">{product.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="font-heading font-bold text-lg">${product.price.toFixed(2)}</p>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-yellow-500">★</span>
              <span className="text-xs">{product.rating.rate} ({product.rating.count})</span>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation to product detail
            handleAddToCart();
          }} 
          className="w-full bg-ecommerce-primary hover:bg-ecommerce-primary/90 text-white"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProductSkeleton = () => (
  <div className="product-card">
    <Skeleton className="h-48 w-full" />
    <div className="p-4">
      <Skeleton className="h-4 w-20 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <Skeleton className="h-6 w-24 mb-2" />
      <Skeleton className="h-8 w-full" />
    </div>
  </div>
);

const ProductGrid = () => {
  const { filteredProducts, isLoading, error } = useProducts();
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h3 className="text-xl font-medium text-red-500 mb-2">Oops! Something went wrong</h3>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {isLoading ? (
        Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)
      ) : filteredProducts.length > 0 ? (
        filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center p-8">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground">Try changing your filters or search query.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
