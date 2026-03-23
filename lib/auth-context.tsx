"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from './api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'tenantadmin' | 'player';
}

interface Tenant {
  _id: string;
  name: string;
  domain: string;
}

interface AuthContextType {
  user: User | null;
  tenant: Tenant | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, tenantId: string) => Promise<void>;
  register: (name: string, email: string, password: string, tenantId: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedTenant = localStorage.getItem('selectedTenant');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedTenant) {
      setTenant(JSON.parse(savedTenant));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, tenantId: string) => {
    try {
      const response = await api.post('/auth/login', { email, password, tenantId });
      const { token, ...userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('selectedTenant', JSON.stringify({
        _id: userData.tenantId,
        name: userData.tenantName
      }));
      localStorage.setItem('tenantId', userData.tenantId); // Store for API interceptor
      
      setUser(userData);
      setTenant({ _id: userData.tenantId, name: userData.tenantName, domain: '' });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (name: string, email: string, password: string, tenantId: string) => {
    try {
      const response = await api.post('/auth/register', { name, email, password, tenantId });
      const { token, ...userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('selectedTenant', JSON.stringify({
        _id: userData.tenantId,
        name: userData.tenantName
      }));
      localStorage.setItem('tenantId', userData.tenantId); // Store for API interceptor
      
      setUser(userData);
      setTenant({ _id: userData.tenantId, name: userData.tenantName, domain: '' });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('selectedTenant');
    localStorage.removeItem('tenantId');
    setUser(null);
    setTenant(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tenant,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}