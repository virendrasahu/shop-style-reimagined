
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ChevronRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 text-center bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto max-w-5xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Discover Your Style</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Shop our curated collection of premium products designed for your lifestyle.
          </p>
          <div className="pt-6">
            <Link to="/shop">
              <Button size="lg" className="bg-ecommerce-primary hover:bg-ecommerce-primary/90 text-white">
                Shop Now <ShoppingBag className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 md:px-6 lg:px-8 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["men's clothing", "women's clothing", "electronics"].map((category) => (
            <Link 
              to={`/shop?category=${encodeURIComponent(category)}`} 
              key={category}
              className="group relative h-64 overflow-hidden rounded-lg bg-secondary/20 transition-all hover:shadow-lg"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-xl font-medium capitalize">{category}</h3>
              </div>
              <div className="absolute bottom-4 right-4">
                <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 md:px-6 lg:px-8 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Popular Products</h2>
        <div className="text-center mt-8">
          <Link to="/shop">
            <Button variant="outline" size="lg">
              View All Products <ChevronRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-muted py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-muted-foreground mb-6">Stay updated with the latest products and exclusive offers</p>
          <div className="flex gap-2">
            <input 
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
