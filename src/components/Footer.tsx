
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the subscription logic here
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Newsletter */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-heading text-lg font-medium mb-4">Subscribe to our newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest updates, sales and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1"
              />
              <Button type="submit" className="bg-ecommerce-primary hover:bg-ecommerce-primary/90 text-white">
                Subscribe
              </Button>
            </form>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-sm text-muted-foreground hover:text-foreground">
                  Featured
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-sm text-muted-foreground hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-sm text-muted-foreground hover:text-foreground">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-heading text-lg font-medium mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} ShopStyle. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <span className="text-sm text-muted-foreground">Payment Methods:</span>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-gray-400 rounded"></div>
              <div className="w-8 h-5 bg-gray-400 rounded"></div>
              <div className="w-8 h-5 bg-gray-400 rounded"></div>
              <div className="w-8 h-5 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
