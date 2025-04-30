
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { authState, logout } = useAuth();
  const { searchProducts } = useProducts();

  // Load saved search query from localStorage
  useEffect(() => {
    const savedSearch = localStorage.getItem('shopSearch');
    if (savedSearch) {
      setSearchQuery(savedSearch);
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchProducts(searchQuery);
    setSearchOpen(false);
    
    // Save search query to localStorage
    localStorage.setItem('shopSearch', searchQuery);
    
    // Redirect to shop page with search parameter if not already there
    if (location.pathname !== '/shop') {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Mobile menu */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-medium">Home</Link>
                <Link to="/shop" className="text-lg font-medium">Shop</Link>
                <Link to="/shop?sort=price-asc" className="text-lg font-medium">Deals</Link>
                <Link to="/shop?sort=price-desc" className="text-lg font-medium">Sale</Link>
                <Link to="/contact" className="text-lg font-medium">Contact Us</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold font-heading text-ecommerce-primary">
            ShopStyle
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`text-sm font-medium hover:text-ecommerce-primary ${location.pathname === '/' ? 'text-ecommerce-primary' : ''}`}>
            Home
          </Link>
          <Link to="/shop" className={`text-sm font-medium hover:text-ecommerce-primary ${location.pathname === '/shop' ? 'text-ecommerce-primary' : ''}`}>
            Shop
          </Link>
          <Link to="/shop?sort=price-asc" className="text-sm font-medium hover:text-ecommerce-primary">Deals</Link>
          <Link to="/shop?sort=price-desc" className="text-sm font-medium hover:text-ecommerce-primary">Sale</Link>
          <Link to="/contact" className="text-sm font-medium hover:text-ecommerce-primary">Contact Us</Link>
        </nav>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="absolute right-0 top-0 flex items-center">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-[200px] sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Button type="submit" size="icon" variant="ghost" className="ml-2">
                  <Search className="h-5 w-5" />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* User Account */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {authState.isAuthenticated ? (
                <>
                  <DropdownMenuItem className="cursor-default opacity-70">
                    {authState.user?.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()}>
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <DropdownMenuItem>Sign In</DropdownMenuItem>
                  </Link>
                  <Link to="/register">
                    <DropdownMenuItem>Register</DropdownMenuItem>
                  </Link>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
