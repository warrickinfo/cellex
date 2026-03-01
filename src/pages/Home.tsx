import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Zap, Shield, Globe, Smartphone, Laptop, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useProductStore } from '../store';
import { cn } from '../lib/utils';

export const Home = () => {
  const { products } = useProductStore();
  return (
    <div className="relative min-h-screen">
      {/* Background Glows */}
      <div className="bg-glow top-[-10%] left-[-10%] bg-[#ff6b00]/10" />
      <div className="bg-glow bottom-[-10%] right-[-10%] bg-[#cc5500]/10" />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Hero content removed */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-24 relative max-w-5xl mx-auto"
          >
            <div className="relative z-10 ios-card overflow-hidden aspect-[16/9]">
              <img
                src="https://picsum.photos/seed/ios26/1600/900"
                alt="Hero Gadget"
                className="w-full h-full object-cover saturate-[1.2] hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              
              {/* Floating Widgets */}
              <div className="absolute top-8 right-8 ios-glass p-6 rounded-[2rem] animate-ios-float">
                <Smartphone className="text-ios-orange mb-2" size={24} />
                <div className="text-sm font-bold">iPhone 26 Pro</div>
                <div className="text-[10px] opacity-40 uppercase tracking-widest">Neural Link Ready</div>
              </div>
            </div>
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-ios-orange/10 blur-[150px] -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-5xl font-display font-bold mb-4 tracking-tight">Categories</h2>
              <p className="text-[var(--text-secondary)] font-medium">Browse our curated collections</p>
            </div>
            <Link to="/shop" className="ios-button-secondary text-sm">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Smartphones', icon: Smartphone, color: 'bg-ios-orange/10' },
              { name: 'Laptops', icon: Laptop, color: 'bg-blue-500/10' },
              { name: 'Audio', icon: Headphones, color: 'bg-purple-500/10' },
              { name: 'Wearables', icon: Zap, color: 'bg-emerald-500/10' },
            ].map((cat) => (
              <Link key={cat.name} to={`/shop?category=${cat.name}`}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={cn(
                    "ios-card p-10 flex flex-col items-center justify-center gap-6 text-center group",
                    cat.color
                  )}
                >
                  <div className="w-20 h-20 rounded-[1.5rem] bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <cat.icon size={40} className="text-ios-orange" />
                  </div>
                  <span className="text-xl font-bold tracking-tight">{cat.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold mb-6">FEATURED PRODUCTS</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Our handpicked selection of the most innovative gadgets on the market.
              Engineered for excellence, designed for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: 'Secure Payments', desc: 'Encrypted transactions with iOS level security.' },
            { icon: Globe, title: 'Global Shipping', desc: 'Fast delivery to over 150 countries worldwide.' },
            { icon: Zap, title: 'Instant Support', desc: '24/7 technical assistance for all your devices.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-morphism p-10 rounded-[2.5rem] text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                <feature.icon size={32} className="text-neon-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b00] to-[#cc5500] flex items-center justify-center">
                <span className="text-black font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-display font-bold tracking-tighter">CELLEX</span>
            </Link>
            <p className="text-white/40 max-w-sm mb-8">
              The ultimate destination for premium gadgets. Experience the future of 
              technology with our curated collection of high-end devices.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-neon-cyan hover:text-black transition-all cursor-pointer">
                  <Globe size={18} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-white/40">
              <li><Link to="/shop" className="hover:text-neon-cyan transition-colors">Shop All</Link></li>
              <li><Link to="/shop?category=Smartphones" className="hover:text-neon-cyan transition-colors">Smartphones</Link></li>
              <li><Link to="/shop?category=Laptops" className="hover:text-neon-cyan transition-colors">Laptops</Link></li>
              <li><Link to="/cart" className="hover:text-neon-cyan transition-colors">My Cart</Link></li>
              <li><Link to="/admin/login" className="hover:text-neon-cyan transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-white/40">
              <li><Link to="#" className="hover:text-neon-cyan transition-colors">Help Center</Link></li>
              <li><Link to="#" className="hover:text-neon-cyan transition-colors">Order Status</Link></li>
              <li><Link to="#" className="hover:text-neon-cyan transition-colors">Returns</Link></li>
              <li><Link to="#" className="hover:text-neon-cyan transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-sm">
          <p>© 2026 Cellex Premium Store. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
