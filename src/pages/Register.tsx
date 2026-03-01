import React from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, Phone, ArrowRight, Github, Chrome } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore, useAuthStore } from '../store';
import { toast } from 'sonner';

export const Register = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  
  const { registerUser, findUser } = useUserStore();
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (findUser(email)) {
      toast.error('Email already registered');
      return;
    }

    registerUser({ name, email, phone, password });
    
    const newUser = findUser(email);
    if (newUser) {
      setUser(newUser);
      toast.success('Account created successfully!');
      navigate('/');
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen flex items-center justify-center">
      <div className="bg-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-magenta/20" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-morphism p-10 rounded-[3rem] relative overflow-hidden">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-magenta to-neon-blue flex items-center justify-center mb-4">
              <span className="text-black font-bold text-3xl">C</span>
            </div>
            <h1 className="text-3xl font-display font-bold">Create Account</h1>
            <p className="text-white/40 text-sm mt-2">Join Cellex for premium gadgets</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 ml-1">Full Name</label>
              <div className="glass-morphism rounded-2xl flex items-center px-4 py-3 group focus-within:border-neon-cyan/50 transition-all">
                <User size={18} className="text-white/30 group-focus-within:text-neon-cyan" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="bg-transparent border-none outline-none px-3 py-1 text-sm w-full"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 ml-1">Email Address</label>
              <div className="glass-morphism rounded-2xl flex items-center px-4 py-3 group focus-within:border-neon-cyan/50 transition-all">
                <Mail size={18} className="text-white/30 group-focus-within:text-neon-cyan" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="bg-transparent border-none outline-none px-3 py-1 text-sm w-full"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 ml-1">Phone Number</label>
              <div className="glass-morphism rounded-2xl flex items-center px-4 py-3 group focus-within:border-neon-cyan/50 transition-all">
                <Phone size={18} className="text-white/30 group-focus-within:text-neon-cyan" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 234 567 890"
                  className="bg-transparent border-none outline-none px-3 py-1 text-sm w-full"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 ml-1">Password</label>
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

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 ml-1">Confirm Password</label>
              <div className="glass-morphism rounded-2xl flex items-center px-4 py-3 group focus-within:border-neon-magenta/50 transition-all">
                <Lock size={18} className="text-white/30 group-focus-within:text-neon-magenta" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent border-none outline-none px-3 py-1 text-sm w-full"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 mt-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-2 group"
            >
              Create Account
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          <p className="text-center mt-8 text-sm text-white/40">
            Already have an account?{' '}
            <Link to="/login" className="text-neon-cyan font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
