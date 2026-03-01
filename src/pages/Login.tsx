import React from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, useUserStore } from '../store';
import { toast } from 'sonner';

export const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setUser } = useAuthStore();
  const { findUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = findUser(email);

    if (user && user.password === password) {
      setUser(user);
      toast.success(`Welcome back, ${user.name}!`);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen flex items-center justify-center">
      <div className="bg-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-cyan/20" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-morphism p-10 rounded-[3rem] relative overflow-hidden">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-magenta flex items-center justify-center mb-4">
              <span className="text-black font-bold text-3xl">C</span>
            </div>
            <h1 className="text-3xl font-display font-bold">Welcome Back</h1>
            <p className="text-white/40 text-sm mt-2">Enter your credentials to access Cellex</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/60 ml-1">Email or Admin ID</label>
              <div className="glass-morphism rounded-2xl flex items-center px-4 py-3 group focus-within:border-neon-cyan/50 transition-all">
                <Mail size={18} className="text-white/30 group-focus-within:text-neon-cyan" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com or Admin ID"
                  className="bg-transparent border-none outline-none px-3 py-1 text-sm w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-white/60">Password</label>
                <Link to="#" className="text-[10px] font-bold text-neon-cyan hover:underline uppercase tracking-widest">Forgot?</Link>
              </div>
              <div className="glass-morphism rounded-2xl flex items-center px-4 py-3 group focus-within:border-neon-magenta/50 transition-all">
                <Lock size={18} className="text-white/30 group-focus-within:text-neon-magenta" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent border-none outline-none px-3 py-1 text-sm w-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-2 group"
              >
                Sign In
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate('/admin/login')}
                className="w-full py-4 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan font-bold flex items-center justify-center gap-2 group hover:bg-neon-cyan/20 transition-all"
              >
                Admin Portal
              </motion.button>
            </div>
          </form>

          <p className="text-center mt-10 text-sm text-white/40">
            Don't have an account?{' '}
            <Link to="/register" className="text-neon-cyan font-bold hover:underline">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
