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

  if (location.pathname === '/') return null;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 py-4',
        isScrolled ? 'py-3' : 'py-6'
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className={cn(
          'neu-flat px-8 py-3 flex items-center justify-between transition-all duration-700',
          isScrolled ? 'scale-95' : 'scale-100'
        )}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 neu-button flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
              <span className="text-ios-orange font-bold text-xl">C</span>
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
                  'text-sm font-semibold transition-all duration-300 hover:opacity-100 relative group',
                  location.pathname === link.path ? 'opacity-100' : 'opacity-40'
                )}
              >
                {link.name}
                <span className={cn(
                  'absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-ios-orange transition-all duration-300',
                  location.pathname === link.path ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                )} />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 neu-button flex items-center justify-center transition-all duration-300 active:scale-90"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="w-10 h-10 neu-button flex items-center justify-center transition-all duration-300 active:scale-90">
              <Search size={18} className="opacity-60" />
            </button>
            <Link to="/cart" className="w-10 h-10 neu-button flex items-center justify-center relative group active:scale-90">
              <ShoppingCart size={18} className="opacity-60 group-hover:opacity-100" />
              {items.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-ios-orange text-[9px] font-bold flex items-center justify-center rounded-full text-white shadow-lg">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
            <Link to={user ? (user.role === 'admin' ? '/admin' : '/account') : '/login'} className="w-10 h-10 neu-button flex items-center justify-center active:scale-90">
              <User size={18} className="opacity-60 hover:opacity-100" />
            </Link>
            <button 
              className="md:hidden w-10 h-10 neu-button flex items-center justify-center active:scale-90"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
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
        <div className="neu-flat p-6 flex flex-col gap-4">
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
