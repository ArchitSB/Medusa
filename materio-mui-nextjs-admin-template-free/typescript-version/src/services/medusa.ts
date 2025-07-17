'use client'

import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_MEDUSA_URL || 'http://localhost:9000'

const medusaClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth interceptor for JWT token
medusaClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('medusa_admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
medusaClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('medusa_admin_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const medusaAPI = {
  // Auth endpoints
  login: (email: string, password: string) =>
    medusaClient.post('/auth/user/emailpass', { email, password }),
  
  logout: () => medusaClient.post('/auth/user/emailpass/logout'),
  
  // Products endpoints
  getProducts: (query?: any) => medusaClient.get('/admin/products', { params: query }),
  getProduct: (id: string) => medusaClient.get(`/admin/products/${id}`),
  createProduct: (data: any) => medusaClient.post('/admin/products', data),
  updateProduct: (id: string, data: any) => medusaClient.post(`/admin/products/${id}`, data),
  deleteProduct: (id: string) => medusaClient.delete(`/admin/products/${id}`),
  
  // Orders endpoints
  getOrders: (query?: any) => medusaClient.get('/admin/orders', { params: query }),
  getOrder: (id: string) => medusaClient.get(`/admin/orders/${id}`),
  updateOrder: (id: string, data: any) => medusaClient.post(`/admin/orders/${id}`, data),
  
  // Customers endpoints
  getCustomers: (query?: any) => medusaClient.get('/admin/customers', { params: query }),
  getCustomer: (id: string) => medusaClient.get(`/admin/customers/${id}`),
  createCustomer: (data: any) => medusaClient.post('/admin/customers', data),
  updateCustomer: (id: string, data: any) => medusaClient.post(`/admin/customers/${id}`, data),
  
  // Store info
  getStore: () => medusaClient.get('/admin/store'),
  
  // Analytics
  getAnalytics: () => medusaClient.get('/admin/analytics'),
  
  // Regions
  getRegions: () => medusaClient.get('/admin/regions'),
  
  // Categories
  getCategories: () => medusaClient.get('/admin/product-categories'),
  
  // Collections
  getCollections: () => medusaClient.get('/admin/collections'),
  
  // Inventory
  getInventory: () => medusaClient.get('/admin/inventory-items'),
}

export default medusaClient
