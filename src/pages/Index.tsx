
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import ProductPage from './ProductPage';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ProductPage />
    </div>
  );
};

export default Index;
