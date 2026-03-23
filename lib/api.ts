import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Get tenant ID from localStorage
export const getTenantId = (): string | null => {
  if (typeof window !== 'undefined') {
    // First try to get from selectedTenant
    const selectedTenant = localStorage.getItem('selectedTenant');
    if (selectedTenant) {
      try {
        const tenant = JSON.parse(selectedTenant);
        if (tenant._id) {
          console.log('Tenant ID from selectedTenant:', tenant._id);
          return tenant._id;
        }
      } catch (e) {
        console.error('Error parsing selectedTenant:', e);
      }
    }
    
    // Then try from tenantId
    const savedTenantId = localStorage.getItem('tenantId');
    if (savedTenantId) {
      console.log('Tenant ID from tenantId:', savedTenantId);
      return savedTenantId;
    }
  }
  console.log('No tenant ID found');
  return null;
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token and tenant ID to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const tenantId = getTenantId();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (tenantId) {
      config.headers['x-tenant-id'] = tenantId;
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url} - Tenant: ${tenantId}`);
    } else {
      console.warn(`⚠️ No tenant ID for ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error(`❌ Error from ${error.config?.url}:`, error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('selectedTenant');
      localStorage.removeItem('tenantId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;