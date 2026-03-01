import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, useCartStore } from '../store';
import { formatPrice, cn } from '../lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart!`, {
      style: {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#fff',
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="ios-card overflow-hidden p-5 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-square rounded-[1.8rem] overflow-hidden bg-white/5 mb-6">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 saturate-[1.1]"
              referrerPolicy="no-referrer"
            />
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="w-12 h-12 rounded-full bg-ios-orange text-white flex items-center justify-center shadow-xl backdrop-blur-md"
              >
                <ShoppingCart size={20} />
              </motion.button>
            </div>

            {/* Category Tag */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full ios-glass text-[9px] font-bold uppercase tracking-widest opacity-80">
              {product.category}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{product.brand}</span>
              <div className="flex items-center gap-1 ios-glass px-2 py-0.5 rounded-full">
                <Star size={10} className="text-ios-gold fill-ios-gold" />
                <span className="text-[10px] font-bold">4.9</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold mb-3 group-hover:text-ios-orange transition-colors line-clamp-1 tracking-tight">
              {product.name}
            </h3>
            
            <div className="mt-auto flex items-center justify-between">
              <span className="text-xl font-display font-bold text-ios-orange">
                {formatPrice(product.price)}
              </span>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-ios-orange hover:text-white transition-all duration-300"
              >
                <ShoppingCart size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
