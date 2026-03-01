import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { useAuthStore } from './store';

const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const { user } = useAuthStore();
  
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  
  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-neon-cyan/30">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Fallback */}
          <Route path="*" element={
            <div className="pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center">
              <h1 className="text-9xl font-display font-bold text-gradient mb-4">404</h1>
              <h2 className="text-3xl font-bold mb-6">Lost in the future?</h2>
              <p className="text-white/40 mb-10 max-w-sm">The page you're looking for doesn't exist in this timeline.</p>
              <Navigate to="/" />
            </div>
          } />
        </Routes>

        <Toaster position="bottom-right" theme="dark" closeButton />
      </div>
    </Router>
  );
}
