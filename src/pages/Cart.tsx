import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore, useAuthStore, useOrderStore } from '../store';
import { formatPrice, cn } from '../lib/utils';
import { toast } from 'sonner';

export const Cart = () => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { addOrder } = useOrderStore();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Save order to store
    addOrder({
      userId: user?.id || 'guest',
      userName: user?.name || 'Guest User',
      items: [...items],
      total: total * 1.08, // Including estimated tax
    });

    toast.success('Order placed successfully!', {
      description: 'Your premium gadgets are on the way.',
      style: {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#fff',
      }
    });
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center mb-8"
        >
          <ShoppingBag size={64} className="text-white/20" />
        </motion.div>
        <h1 className="text-4xl font-display font-bold mb-4">Your cart is empty</h1>
        <p className="text-white/50 mb-10 max-w-sm">
          Looks like you haven't added any premium gadgets to your cart yet.
        </p>
        <Link to="/shop">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl bg-white text-black font-bold flex items-center gap-2"
          >
            Start Shopping
            <ArrowRight size={20} />
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-display font-bold mb-16 tracking-tight">Cart</h1>

        <div className="grid lg:grid-cols-[1fr_400px] gap-16">
          {/* Items List */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="ios-card p-6 flex flex-col sm:flex-row items-center gap-8 group"
                >
                  <div className="w-32 h-32 rounded-[1.8rem] overflow-hidden bg-white/5 flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 saturate-[1.1]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-xl font-bold mb-1 tracking-tight">{item.name}</h3>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-40">{item.category} • {item.brand}</p>
                      </div>
                      <span className="text-2xl font-display font-bold text-ios-orange">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6">
                      <div className="flex items-center gap-4 ios-glass p-1 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors active:scale-90"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors active:scale-90"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <aside className="space-y-8">
            <div className="ios-card p-10 sticky top-32">
              <h2 className="text-2xl font-bold mb-10 tracking-tight">Summary</h2>
              
              <div className="space-y-5 mb-10">
                <div className="flex justify-between text-sm font-medium opacity-60">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium opacity-60">
                  <span>Shipping</span>
                  <span className="text-ios-orange font-bold uppercase text-[10px] tracking-widest">Free</span>
                </div>
                <div className="flex justify-between text-sm font-medium opacity-60">
                  <span>Tax (Estimated)</span>
                  <span>{formatPrice(total * 0.08)}</span>
                </div>
                <div className="h-px bg-white/5 my-6" />
                <div className="flex justify-between text-2xl font-bold tracking-tight">
                  <span>Total</span>
                  <span className="text-ios-orange">{formatPrice(total * 1.08)}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full ios-button-primary py-5 text-lg mb-8"
              >
                Checkout Now
              </motion.button>

              <div className="space-y-5">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
                  <ShieldCheck size={16} className="text-ios-orange" />
                  Secure Cellex Pay
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
                  <Truck size={16} className="text-ios-orange" />
                  Free Express Shipping
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="ios-card p-6 mt-8">
              <h3 className="text-xs font-bold mb-4 uppercase tracking-widest opacity-40">Promo Code</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-sm outline-none focus:border-ios-orange/50 transition-all"
                />
                <button className="px-5 py-2 ios-glass rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                  Apply
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
