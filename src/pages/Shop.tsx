import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, SlidersHorizontal, Grid, List, ChevronDown, Zap } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../lib/supabase';
import { cn } from '../lib/utils';
import { useSearchParams } from 'react-router-dom';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = React.useState(2000);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Smartphones', 'Laptops', 'Audio', 'Wearables', 'Tablets'];

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h1 className="text-5xl font-display font-bold mb-4">EXPLORE <span className="text-gradient">TECH</span></h1>
            <p className="text-white/50">Browse our collection of premium devices and accessories.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="glass-morphism rounded-2xl flex items-center px-4 py-2 w-full md:w-80 group focus-within:border-neon-cyan/50 transition-all">
              <Search size={18} className="text-white/30 group-focus-within:text-neon-cyan" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none px-3 py-1 text-sm w-full"
              />
            </div>
            <button className="glass-morphism p-3 rounded-2xl hover:bg-white/10 transition-colors md:hidden">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block space-y-10">
            {/* Categories */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Grid size={18} className="text-neon-cyan" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group",
                      selectedCategory === cat 
                        ? "bg-neon-cyan text-black font-bold" 
                        : "hover:bg-white/5 text-white/60"
                    )}
                  >
                    {cat}
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full",
                      selectedCategory === cat ? "bg-black/20" : "bg-white/10"
                    )}>
                      {cat === 'All' ? MOCK_PRODUCTS.length : MOCK_PRODUCTS.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-neon-magenta" />
                Price Range
              </h3>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                />
                <div className="flex justify-between mt-4 text-xs font-bold text-white/40">
                  <span>$0</span>
                  <span className="text-neon-cyan text-sm">${priceRange}</span>
                  <span>$3000+</span>
                </div>
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Zap size={18} className="text-neon-blue" />
                Brands
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Apple', 'Samsung', 'Sony', 'Google', 'Dell'].map(brand => (
                  <button key={brand} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium hover:border-neon-cyan transition-colors">
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 glass-morphism p-4 rounded-3xl">
              <div className="text-sm font-medium text-white/50">
                Showing <span className="text-white">{filteredProducts.length}</span> results
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-white text-black" : "text-white/40 hover:text-white")}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-white text-black" : "text-white/40 hover:text-white")}
                  >
                    <List size={18} />
                  </button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-sm font-bold border border-white/10 hover:bg-white/10 transition-all">
                  Sort by: Newest
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className={cn(
              "grid gap-8",
              viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
            )}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                    <Search size={40} className="text-white/20" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">No products found</h3>
                  <p className="text-white/40">Try adjusting your filters or search query.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
