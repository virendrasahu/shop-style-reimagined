
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart, ChevronLeft, Star } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
        
        // Store recently viewed products in localStorage
        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        if (!recentlyViewed.includes(id)) {
          const updatedRecent = [id, ...recentlyViewed.slice(0, 4)]; // Keep last 5
          localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecent));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
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
      description: `${product.title} has been added to your cart.`
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <Skeleton className="aspect-square w-full rounded-lg" />
          </div>
          <div className="md:w-1/2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-12 w-full mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-500">Error</h2>
          <p className="text-muted-foreground mt-2">{error || 'Product not found'}</p>
          <Link to="/shop">
            <Button className="mt-4" variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/shop">
          <Button variant="ghost" className="pl-0">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Shop
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2 bg-white rounded-lg p-6 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-[400px] object-contain"
          />
        </div>
        
        {/* Product Details */}
        <div className="md:w-1/2 space-y-4">
          <div className="mb-2">
            <span className="product-badge capitalize">{product.category}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.round(product.rating.rate) ? 'fill-yellow-500' : 'fill-muted stroke-muted-foreground'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
          
          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
          
          <p className="text-muted-foreground">{product.description}</p>
          
          <Button 
            onClick={handleAddToCart} 
            className="w-full md:w-auto mt-6 bg-ecommerce-primary hover:bg-ecommerce-primary/90 text-white"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
