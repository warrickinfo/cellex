import React from 'react';
import { motion } from 'motion/react';
import { Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useUserStore } from '../store';
import { toast } from 'sonner';

export const AdminLogin = () => {
  const [adminId, setAdminId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const { setUser } = useAuthStore();
  const { findUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = findUser(adminId);

    if (user && user.role === 'admin' && user.password === password) {
      setUser(user);
      toast.success(`Welcome to Admin Portal, ${user.name}!`);
      navigate('/admin');
    } else {
      toast.error('Invalid Admin ID or Password. Hint: arvin_hanif / arvin_hanif');
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen flex items-center justify-center">
      <div className="bg-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ff6b00]/20" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[3rem] relative overflow-hidden border border-[#ff6b00]/30 shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff6b00] to-[#cc5500] flex items-center justify-center mb-4">
              <span className="text-black font-bold text-3xl">A</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-black">Admin Portal</h1>
            <p className="text-black/40 text-sm mt-2">Secure access for administrators only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/60 ml-1">Admin ID</label>
              <div className="bg-black/5 rounded-2xl flex items-center px-4 py-3 group focus-within:border-[#ff6b00]/50 transition-all border border-transparent">
                <User size={18} className="text-black/30 group-focus-within:text-[#ff6b00]" />
                <input
                  type="text"
                  required
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="arvin_hanif"
                  className="bg-transparent border-none outline-none px-3 py-1 text-sm w-full text-black placeholder:text-black/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/60 ml-1">Password</label>
              <div className="bg-black/5 rounded-2xl flex items-center px-4 py-3 group focus-within:border-[#ff6b00]/50 transition-all border border-transparent relative">
                <Lock size={18} className="text-black/30 group-focus-within:text-[#ff6b00]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="arvin_hanif"
                  className="bg-transparent border-none outline-none px-3 py-1 text-sm w-full text-black placeholder:text-black/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-black/30 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#ff6b00] text-black font-bold flex items-center justify-center gap-2 group shadow-[0_10px_20px_rgba(255,107,0,0.2)]"
            >
              Login to Dashboard
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>
          
          <div className="mt-8 text-center space-y-4">
            <div className="p-4 bg-black/5 rounded-2xl border border-black/10">
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-1">Admin Credentials</p>
              <p className="text-sm font-mono text-black">ID: arvin_hanif</p>
              <p className="text-sm font-mono text-black">Pass: arvin_hanif</p>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="text-xs text-black/40 hover:text-black transition-colors font-medium"
            >
              Back to User Login
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
