import React from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, RotateCcw, ChevronRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../lib/supabase';
import { useCartStore } from '../store';
import { formatPrice, cn } from '../lib/utils';
import { toast } from 'sonner';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);

  const product = MOCK_PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Product not found</h1>
        <button onClick={() => navigate('/shop')} className="text-neon-cyan hover:underline">Return to Shop</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${product.name} added to cart!`, {
      description: `${quantity} item(s) added successfully.`,
      style: {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#fff',
      }
    });
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/50 hover:text-white mb-12 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to results
        </button>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-[3rem] overflow-hidden glass-morphism p-4"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover rounded-[2.5rem]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "aspect-square rounded-2xl overflow-hidden glass-morphism p-1 transition-all",
                    selectedImage === i ? "border-neon-cyan border-2" : "opacity-50 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover rounded-xl" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan text-[10px] font-bold uppercase tracking-wider border border-neon-cyan/20">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold">4.9 (128 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-5xl font-display font-bold mb-2">{product.name}</h1>
              <p className="text-xl text-white/40 font-medium mb-6">{product.brand}</p>
              
              <div className="text-4xl font-display font-bold text-gradient mb-8">
                {formatPrice(product.price)}
              </div>
              
              <p className="text-white/60 leading-relaxed mb-10 text-lg">
                {product.description}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="glass-morphism p-4 rounded-2xl">
                  <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">{key}</div>
                  <div className="text-sm font-bold">{value}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 bg-white/5 p-1 rounded-2xl border border-white/10">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 py-5 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </motion.button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Truck size={20} className="text-neon-cyan" />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <ShieldCheck size={20} className="text-neon-magenta" />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">2yr Warranty</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <RotateCcw size={20} className="text-neon-blue" />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
