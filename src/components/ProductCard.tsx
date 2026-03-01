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
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`}>
        <div className="glass-morphism rounded-[2.5rem] overflow-hidden p-4 h-full flex flex-col transition-all duration-500 group-hover:border-neon-cyan/50 group-hover:shadow-[0_0_30px_rgba(0,242,255,0.15)]">
          {/* Image Container */}
          <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white/5 mb-6">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="w-12 h-12 rounded-full bg-neon-cyan text-black flex items-center justify-center shadow-lg"
              >
                <ShoppingCart size={20} />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-lg"
              >
                <Eye size={20} />
              </motion.div>
            </div>

            {/* Category Tag */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider">
              {product.category}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-white/50">{product.brand}</span>
              <div className="flex items-center gap-1">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold">4.9</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold mb-2 group-hover:text-neon-cyan transition-colors line-clamp-1">
              {product.name}
            </h3>
            
            <div className="mt-auto flex items-center justify-between">
              <span className="text-xl font-display font-bold text-gradient">
                {formatPrice(product.price)}
              </span>
              <button 
                onClick={handleAddToCart}
                className="text-xs font-bold text-neon-cyan hover:underline"
              >
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
