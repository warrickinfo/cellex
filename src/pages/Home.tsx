import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Zap, Shield, Globe, Smartphone, Laptop, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../lib/supabase';
import { cn } from '../lib/utils';

export const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Glows */}
      <div className="bg-glow top-[-10%] left-[-10%] bg-neon-cyan/20" />
      <div className="bg-glow bottom-[-10%] right-[-10%] bg-neon-magenta/20" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Zap size={16} className="text-neon-cyan" />
              <span className="text-xs font-bold tracking-widest uppercase">Next Gen Tech Store</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-8">
              FUTURE OF <br />
              <span className="text-gradient">GADGETS</span> IS HERE.
            </h1>
            <p className="text-lg text-white/60 mb-10 max-w-lg leading-relaxed">
              Experience the next evolution of technology with Cellex. Premium devices, 
              liquid-smooth performance, and ultra-modern design.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl bg-white text-black font-bold flex items-center gap-2 group"
                >
                  Explore Shop
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/shop?category=Smartphones">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold backdrop-blur-xl"
                >
                  New Arrivals
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 animate-float">
              <img
                src="https://picsum.photos/seed/tech-hero/800/800"
                alt="Hero Gadget"
                className="w-full h-auto rounded-[3rem] shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
              {/* Floating Glass Elements */}
              <div className="absolute -top-10 -right-10 glass-morphism p-6 rounded-3xl animate-float delay-1000">
                <Smartphone className="text-neon-cyan mb-2" />
                <div className="text-xs font-bold">iPhone 16 Pro</div>
                <div className="text-[10px] text-white/50">Starting at $999</div>
              </div>
              <div className="absolute -bottom-10 -left-10 glass-morphism p-6 rounded-3xl animate-float delay-2000">
                <Headphones className="text-neon-magenta mb-2" />
                <div className="text-xs font-bold">Sony XM5</div>
                <div className="text-[10px] text-white/50">Noise Cancelling</div>
              </div>
            </div>
            {/* Background Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 blur-[100px] -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold mb-4">SHOP BY CATEGORY</h2>
              <div className="h-1 w-20 bg-neon-cyan rounded-full" />
            </div>
            <Link to="/shop" className="text-neon-cyan font-bold flex items-center gap-2 hover:underline">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Smartphones', icon: Smartphone, color: 'from-cyan-500/20' },
              { name: 'Laptops', icon: Laptop, color: 'from-blue-500/20' },
              { name: 'Audio', icon: Headphones, color: 'from-purple-500/20' },
              { name: 'Wearables', icon: Zap, color: 'from-pink-500/20' },
            ].map((cat) => (
              <Link key={cat.name} to={`/shop?category=${cat.name}`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={cn(
                    "glass-morphism p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 text-center group bg-gradient-to-br to-transparent",
                    cat.color
                  )}
                >
                  <cat.icon size={40} className="group-hover:text-neon-cyan transition-colors" />
                  <span className="font-bold tracking-tight">{cat.name}</span>
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
            {MOCK_PRODUCTS.slice(0, 3).map((product) => (
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center">
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
