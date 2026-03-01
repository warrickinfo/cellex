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
  Search,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatPrice, cn } from '../lib/utils';
import { MOCK_PRODUCTS } from '../lib/supabase';
import { useUserStore, useOrderStore, useAuthStore, useProductStore, useOrderRequestStore } from '../store';

export const AdminDashboard = () => {
  const { users } = useUserStore();
  const { orders, updateOrderStatus } = useOrderStore();
  const { products, addProduct } = useProductStore();
  const { requests, updateRequestStatus } = useOrderRequestStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const [isAddingProduct, setIsAddingProduct] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState({
    name: '',
    price: 0,
    category: 'Smartphones',
    brand: '',
    images: ['https://picsum.photos/seed/new/800/800'],
    specs: {},
    stock: 10,
    description: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(newProduct);
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      price: 0,
      category: 'Smartphones',
      brand: '',
      images: ['https://picsum.photos/seed/new/800/800'],
      specs: {},
      stock: 10,
      description: ''
    });
  };
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const stats = [
    { label: 'Total Revenue', value: formatPrice(totalRevenue), icon: TrendingUp, color: 'text-ios-orange', bg: 'bg-ios-orange/10' },
    { label: 'Total Orders', value: orders.length.toString(), icon: ShoppingBag, color: 'text-ios-orange', bg: 'bg-ios-orange/10' },
    { label: 'Active Products', value: products.length.toString(), icon: Package, color: 'text-ios-orange', bg: 'bg-ios-orange/10' },
    { label: 'Total Users', value: users.length.toString(), icon: Users, color: 'text-ios-orange', bg: 'bg-ios-orange/10' },
  ];

  // Display real orders, fallback to mock if empty for demo feel, 
  // but the user wants to see their orders, so let's prioritize real ones.
  const displayOrders = orders.length > 0 ? orders.slice(0, 5) : [
    { id: '#ORD-7241', userName: 'Alex Rivera', items: [{ quantity: 2 }], total: 1598, status: 'Processing', createdAt: new Date(Date.now() - 120000).toISOString() },
    { id: '#ORD-7240', userName: 'Sarah Chen', items: [{ quantity: 1 }], total: 399, status: 'Shipped', createdAt: new Date(Date.now() - 900000).toISOString() },
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-display font-bold mb-2 tracking-tight">Dashboard</h1>
            <p className="text-[var(--text-secondary)] font-medium">Overview of your premium store performance.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleLogout}
              className="ios-button-secondary flex items-center gap-2 text-red-500 border-red-500/20 hover:bg-red-500/10"
            >
              <LogOut size={20} />
              Logout
            </button>
            <button 
              onClick={() => setIsAddingProduct(true)}
              className="ios-button-primary flex items-center gap-2"
            >
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
              transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="ios-card p-8 relative overflow-hidden group"
            >
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-white/5", stat.color)}>
                <stat.icon size={24} />
              </div>
              <div className="text-3xl font-display font-bold mb-1 tracking-tight">{stat.value}</div>
              <div className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 mb-12">
          {/* Recent Orders Table */}
          <div className="ios-card overflow-hidden">
            <div className="p-8 border-b border-[var(--glass-border)] flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Recent Orders</h2>
              <button className="text-ios-orange text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-[0.2em] opacity-40 border-b border-[var(--glass-border)]">
                    <th className="px-8 py-4">Order ID</th>
                    <th className="px-8 py-4">Customer</th>
                    <th className="px-8 py-4">Items</th>
                    <th className="px-8 py-4">Total</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {displayOrders.map((order) => (
                    <tr key={order.id} className="border-b border-[var(--glass-border)] hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6 font-mono text-ios-orange">{order.id}</td>
                      <td className="px-8 py-6">
                        <div className="font-bold">{order.userName}</div>
                        <div className="text-[10px] opacity-40">{new Date(order.createdAt).toLocaleString()}</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="font-bold">{order.items.reduce((sum: number, item: any) => sum + item.quantity, 0)}</span>
                      </td>
                      <td className="px-8 py-6 font-bold">{formatPrice(order.total)}</td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border",
                          order.status === 'Delivered' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                          order.status === 'Processing' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                          order.status === 'Shipped' ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                          "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        )}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                          <MoreVertical size={18} className="opacity-40" />
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
            <div className="ios-card p-8">
              <h2 className="text-2xl font-bold mb-8 tracking-tight">Top Products</h2>
              <div className="space-y-6">
                {products.slice(0, 4).map((product) => (
                  <div key={product.id} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/5 flex-shrink-0">
                      <img src={product.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold truncate group-hover:text-ios-orange transition-colors">{product.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] opacity-40 uppercase tracking-widest">{product.category}</span>
                        <span className="text-sm font-bold text-ios-orange">{formatPrice(product.price)}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 rounded-2xl bg-white/5 border border-[var(--glass-border)] text-sm font-bold hover:bg-white/10 transition-all">
                View Inventory
              </button>
            </div>
          </div>
        </div>

        {/* Order Requests Section */}
        <div className="ios-card overflow-hidden mb-12">
          <div className="p-8 border-b border-[var(--glass-border)] flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Order Requests</h2>
            <div className="text-sm opacity-40 font-medium">Total: {requests.length}</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] opacity-40 border-b border-[var(--glass-border)]">
                  <th className="px-8 py-4">Request ID</th>
                  <th className="px-8 py-4">User</th>
                  <th className="px-8 py-4">Product Name</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {requests.length > 0 ? requests.map((req) => (
                  <tr key={req.id} className="border-b border-[var(--glass-border)] hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6 font-mono text-ios-orange">{req.id}</td>
                    <td className="px-8 py-6 font-bold">{req.userName}</td>
                    <td className="px-8 py-6">{req.productName}</td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border",
                        req.status === 'Approved' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                        req.status === 'Rejected' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                        "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      )}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right space-x-2">
                      <button 
                        onClick={() => updateRequestStatus(req.id, 'Approved')}
                        className="text-[10px] font-bold uppercase tracking-widest text-green-500 hover:underline"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => updateRequestStatus(req.id, 'Rejected')}
                        className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:underline"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-10 text-center opacity-40">No order requests yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users List Section */}
        <div className="ios-card overflow-hidden">
          <div className="p-8 border-b border-[var(--glass-border)] flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Users</h2>
            <div className="text-sm opacity-40 font-medium">Total: {users.length}</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] opacity-40 border-b border-[var(--glass-border)]">
                  <th className="px-8 py-4">Name</th>
                  <th className="px-8 py-4">Email</th>
                  <th className="px-8 py-4">Phone</th>
                  <th className="px-8 py-4">Role</th>
                  <th className="px-8 py-4">Joined</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-[var(--glass-border)] hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6 font-bold">{u.name}</td>
                    <td className="px-8 py-6 opacity-60">{u.email}</td>
                    <td className="px-8 py-6 opacity-60">{u.phone}</td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border",
                        u.role === 'admin' ? "bg-ios-orange/10 text-ios-orange border-ios-orange/20" : "bg-white/5 text-white/40 border-white/10"
                      )}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-8 py-6 opacity-40 text-xs">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsAddingProduct(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="ios-card w-full max-w-lg p-10 relative z-10"
          >
            <h2 className="text-3xl font-bold mb-8 tracking-tight">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Product Name</label>
                  <input 
                    type="text" 
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full bg-white/5 border border-[var(--glass-border)] rounded-2xl px-4 py-3 text-sm outline-none focus:border-ios-orange/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Price (TK)</label>
                  <input 
                    type="number" 
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                    className="w-full bg-white/5 border border-[var(--glass-border)] rounded-2xl px-4 py-3 text-sm outline-none focus:border-ios-orange/50 transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Category</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full bg-white/5 border border-[var(--glass-border)] rounded-2xl px-4 py-3 text-sm outline-none focus:border-ios-orange/50 transition-all appearance-none"
                  >
                    <option value="Smartphones">Smartphones</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Audio">Audio</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Tablets">Tablets</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Brand</label>
                  <input 
                    type="text" 
                    required
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                    className="w-full bg-white/5 border border-[var(--glass-border)] rounded-2xl px-4 py-3 text-sm outline-none focus:border-ios-orange/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Description</label>
                <textarea 
                  required
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full bg-white/5 border border-[var(--glass-border)] rounded-2xl px-4 py-3 text-sm outline-none focus:border-ios-orange/50 transition-all h-24 resize-none"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="flex-1 ios-button-secondary py-4"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 ios-button-primary py-4"
                >
                  Add Product
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
