"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';

export default function RegisterTenantPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    ownerName: '',
    ownerEmail: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/tenants/register', {
        name: formData.name,
        domain: formData.domain,
        ownerName: formData.ownerName,
        ownerEmail: formData.ownerEmail,
        password: formData.password,
      });
      
      console.log('Registration response:', response.data); // Debug log
      
      // Save auth data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('selectedTenant', JSON.stringify(response.data.tenant));
      localStorage.setItem('tenantId', response.data.tenant._id); // ✅ Store tenant ID separately
      
      console.log('Tenant ID saved:', response.data.tenant._id); // Debug log
      
      // Redirect to dashboard
      router.push('/dashboard');
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-amber-900/20" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Launch Your Casino</h1>
            <p className="text-white/40">Start your white-label casino platform</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Casino Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                placeholder="Golden Palace Casino"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Domain</label>
              <input
                type="text"
                value={formData.domain}
                onChange={(e) => setFormData({...formData, domain: e.target.value.toLowerCase()})}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                placeholder="goldenpalace"
                required
              />
              <p className="text-xs text-white/40 mt-1">Your casino will be available at: {formData.domain}.yourdomain.com</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Owner Name</label>
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Owner Email</label>
              <input
                type="email"
                value={formData.ownerEmail}
                onChange={(e) => setFormData({...formData, ownerEmail: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Launch Casino'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/40">
              Already have a casino?{' '}
              <a href="/login" className="text-amber-400 hover:text-amber-300">
                Login here
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}