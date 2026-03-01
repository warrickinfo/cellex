import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Plus, 
  MoreVertical,
  ArrowUpRight,
  Search
} from 'lucide-react';
import { formatPrice, cn } from '../lib/utils';
import { MOCK_PRODUCTS } from '../lib/supabase';

export const AdminDashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: '$128,430', icon: TrendingUp, color: 'text-neon-cyan', bg: 'bg-neon-cyan/10' },
    { label: 'Total Orders', value: '1,240', icon: ShoppingBag, color: 'text-neon-magenta', bg: 'bg-neon-magenta/10' },
    { label: 'Active Products', value: '48', icon: Package, color: 'text-neon-blue', bg: 'bg-neon-blue/10' },
    { label: 'Total Users', value: '8,420', icon: Users, color: 'text-white', bg: 'bg-white/10' },
  ];

  const recentOrders = [
    { id: '#ORD-7241', user: 'Alex Rivera', items: 2, total: 1598, status: 'Processing', date: '2 mins ago' },
    { id: '#ORD-7240', user: 'Sarah Chen', items: 1, total: 399, status: 'Shipped', date: '15 mins ago' },
    { id: '#ORD-7239', user: 'Marcus Wright', items: 3, total: 2450, status: 'Delivered', date: '1 hour ago' },
    { id: '#ORD-7238', user: 'Elena Rossi', items: 1, total: 1199, status: 'Pending', date: '3 hours ago' },
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">ADMIN <span className="text-gradient">DASHBOARD</span></h1>
            <p className="text-white/40">Overview of your premium gadget store performance.</p>
          </div>
          <div className="flex gap-4">
            <button className="glass-morphism px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-white/10 transition-all">
              <Plus size={20} />
              Add Product
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-morphism p-8 rounded-[2.5rem] relative overflow-hidden group"
            >
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", stat.bg)}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <div className="text-3xl font-display font-bold mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-white/40 uppercase tracking-widest">{stat.label}</div>
              
              {/* Decorative background icon */}
              <stat.icon size={80} className={cn("absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity", stat.color)} />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          {/* Recent Orders Table */}
          <div className="glass-morphism rounded-[3rem] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <button className="text-neon-cyan text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5">
                    <th className="px-8 py-4">Order ID</th>
                    <th className="px-8 py-4">Customer</th>
                    <th className="px-8 py-4">Total</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6 font-mono text-neon-cyan">{order.id}</td>
                      <td className="px-8 py-6">
                        <div className="font-bold">{order.user}</div>
                        <div className="text-[10px] text-white/30">{order.date}</div>
                      </td>
                      <td className="px-8 py-6 font-bold">{formatPrice(order.total)}</td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                          order.status === 'Delivered' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                          order.status === 'Processing' ? "bg-neon-blue/10 text-neon-blue border-neon-blue/20" :
                          order.status === 'Shipped' ? "bg-neon-magenta/10 text-neon-magenta border-neon-magenta/20" :
                          "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        )}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                          <MoreVertical size={18} className="text-white/40" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="space-y-6">
            <div className="glass-morphism p-8 rounded-[3rem]">
              <h2 className="text-xl font-bold mb-8">Top Products</h2>
              <div className="space-y-6">
                {MOCK_PRODUCTS.slice(0, 4).map((product) => (
                  <div key={product.id} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/5 flex-shrink-0">
                      <img src={product.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold truncate group-hover:text-neon-cyan transition-colors">{product.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-white/40">{product.category}</span>
                        <span className="text-sm font-bold text-neon-cyan">{formatPrice(product.price)}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-white/20 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-all">
                View Inventory
              </button>
            </div>

            {/* Quick Actions */}
            <div className="glass-morphism p-8 rounded-[3rem]">
              <h2 className="text-xl font-bold mb-6">Quick Search</h2>
              <div className="glass-morphism rounded-2xl flex items-center px-4 py-3 group focus-within:border-neon-cyan/50 transition-all">
                <Search size={18} className="text-white/30 group-focus-within:text-neon-cyan" />
                <input
                  type="text"
                  placeholder="Search orders, users..."
                  className="bg-transparent border-none outline-none px-3 py-1 text-sm w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
