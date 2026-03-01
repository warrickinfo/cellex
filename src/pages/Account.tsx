import React from 'react';
import { motion } from 'motion/react';
import { User, Package, Settings, LogOut, ChevronRight, Mail, Shield } from 'lucide-react';
import { useAuthStore, useOrderRequestStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const Account = () => {
  const { user, logout } = useAuthStore();
  const { addRequest } = useOrderRequestStore();
  const navigate = useNavigate();

  const [requestProduct, setRequestProduct] = React.useState('');
  const [requestDesc, setRequestDesc] = React.useState('');

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    addRequest({
      userId: user.id,
      userName: user.name || user.email.split('@')[0],
      productName: requestProduct,
      description: requestDesc,
    });
    toast.success('Order request submitted successfully!');
    setRequestProduct('');
    setRequestDesc('');
  };

  if (!user) {
    return null; // Protected route handles this
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-display font-bold mb-12">MY <span className="text-gradient">ACCOUNT</span></h1>

        <div className="grid md:grid-cols-[300px_1fr] gap-12">
          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="glass-morphism p-8 rounded-[2.5rem] text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center mx-auto mb-6">
                <span className="text-black font-bold text-4xl">{user.email[0].toUpperCase()}</span>
              </div>
              <h2 className="text-xl font-bold mb-1">{user.email.split('@')[0]}</h2>
              <p className="text-sm text-muted mb-6">{user.email}</p>
              <span className="px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan text-[10px] font-bold uppercase tracking-widest border border-neon-cyan/20">
                {user.role}
              </span>
            </div>

            <nav className="glass-morphism p-4 rounded-[2rem] space-y-2">
              {[
                { label: 'Profile', icon: User },
                { label: 'Orders', icon: Package },
                { label: 'Security', icon: Shield },
                { label: 'Settings', icon: Settings },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-sm font-medium group"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-neon-cyan" />
                    {item.label}
                  </div>
                  <ChevronRight size={16} className="text-muted group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-all text-sm font-medium"
              >
                <LogOut size={18} />
                Logout
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="space-y-8">
            <div className="glass-morphism p-8 rounded-[2.5rem]">
              <h3 className="text-xl font-bold mb-6">Personal Information</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Full Name</label>
                  <div className="glass-morphism px-4 py-3 rounded-xl text-sm font-medium">
                    {user.email.split('@')[0]}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Email Address</label>
                  <div className="glass-morphism px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                    <Mail size={14} className="text-neon-cyan" />
                    {user.email}
                  </div>
                </div>
              </div>
              <button className="mt-8 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:scale-105 transition-transform">
                Update Profile
              </button>
            </div>

            <div className="glass-morphism p-8 rounded-[2.5rem]">
              <h3 className="text-xl font-bold mb-6">Recent Orders</h3>
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Package size={32} className="text-muted" />
                </div>
                <p className="text-muted">You haven't placed any orders yet.</p>
                <button 
                  onClick={() => navigate('/shop')}
                  className="mt-4 text-neon-cyan font-bold hover:underline"
                >
                  Start Shopping
                </button>
              </div>
            </div>
            <div className="ios-card p-8">
              <h3 className="text-xl font-bold mb-6 tracking-tight">Request a Product</h3>
              <p className="text-xs font-medium opacity-40 mb-8">Can't find what you're looking for? Let us know!</p>
              <form onSubmit={handleSubmitRequest} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Product Name</label>
                  <input 
                    type="text" 
                    required
                    value={requestProduct}
                    onChange={(e) => setRequestProduct(e.target.value)}
                    className="w-full bg-white/5 border border-[var(--glass-border)] rounded-2xl px-4 py-3 text-sm outline-none focus:border-ios-orange/50 transition-all"
                    placeholder="e.g. RTX 5090 FE"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Details</label>
                  <textarea 
                    required
                    value={requestDesc}
                    onChange={(e) => setRequestDesc(e.target.value)}
                    className="w-full bg-white/5 border border-[var(--glass-border)] rounded-2xl px-4 py-3 text-sm outline-none focus:border-ios-orange/50 transition-all h-24 resize-none"
                    placeholder="Tell us more about the product..."
                  />
                </div>
                <button type="submit" className="ios-button-primary w-full py-4">
                  Submit Request
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
