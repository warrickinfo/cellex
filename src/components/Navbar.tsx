import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, User, Search, Menu, X, ChevronRight, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore, useAuthStore, useThemeStore } from '../store';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { items } = useCartStore();
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/shop?filter=categories' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4',
        isScrolled ? 'py-3' : 'py-6'
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className={cn(
          'glass-morphism rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500',
          isScrolled ? 'bg-white/10 scale-95' : 'bg-white/5'
        )}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b00] to-[#cc5500] flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
              <span className="text-black font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-display font-bold tracking-tighter">CELLEX</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-neon-cyan relative group',
                  location.pathname === link.path ? 'text-neon-cyan' : 'text-muted'
                )}
              >
                {link.name}
                <span className={cn(
                  'absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-full',
                  location.pathname === link.path ? 'w-full' : 'w-0'
                )} />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted hover:text-neon-cyan"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Search size={20} className="text-muted" />
            </button>
            <Link to="/cart" className="p-2 hover:bg-white/10 rounded-full transition-colors relative group">
              <ShoppingCart size={20} className="text-muted group-hover:text-neon-cyan" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-neon-magenta text-[10px] font-bold flex items-center justify-center rounded-full animate-pulse text-white">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
            <Link to={user ? (user.role === 'admin' ? '/admin' : '/account') : '/login'} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <User size={20} className="text-muted hover:text-neon-cyan" />
            </Link>
            <button 
              className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden mt-4"
      >
        <div className="glass-morphism rounded-3xl p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium flex items-center justify-between group"
            >
              {link.name}
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};
