// src/lib/api.ts
import medusaClient from './medusa-client'

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await medusaClient.post('/auth/user/emailpass', {
        email,
        password,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  logout: async () => {
    try {
      const response = await medusaClient.delete('/auth/user/emailpass')
      localStorage.removeItem('medusa_auth_token')
      return response.data
    } catch (error) {
      // Even if API call fails, clear local storage
      localStorage.removeItem('medusa_auth_token')
      throw error
    }
  },

  getProfile: async () => {
    try {
      const response = await medusaClient.get('/admin/users/me')
      return response.data
    } catch (error) {
      throw error
    }
  }
}

// Products API
export const productsAPI = {
  getProducts: async (params?: any) => {
    try {
      const response = await medusaClient.get('/admin/products', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  getProduct: async (id: string) => {
    try {
      const response = await medusaClient.get(`/admin/products/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  createProduct: async (productData: any) => {
    try {
      const response = await medusaClient.post('/admin/products', productData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  updateProduct: async (id: string, productData: any) => {
    try {
      const response = await medusaClient.post(`/admin/products/${id}`, productData)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

// Orders API
export const ordersAPI = {
  getOrders: async (params?: any) => {
    try {
      const response = await medusaClient.get('/admin/orders', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  getOrder: async (id: string) => {
    try {
      const response = await medusaClient.get(`/admin/orders/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

// Customers API
export const customersAPI = {
  getCustomers: async (params?: any) => {
    try {
      const response = await medusaClient.get('/admin/customers', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  getCustomer: async (id: string) => {
    try {
      const response = await medusaClient.get(`/admin/customers/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

// Analytics/Dashboard API
export const analyticsAPI = {
  getDashboardStats: async () => {
    try {
      // You can customize this to aggregate data from multiple endpoints
      const [products, orders, customers] = await Promise.all([
        medusaClient.get('/admin/products'),
        medusaClient.get('/admin/orders'),
        medusaClient.get('/admin/customers')
      ])

      return {
        totalProducts: products.data.count || 0,
        totalOrders: orders.data.count || 0,
        totalCustomers: customers.data.count || 0,
        revenue: orders.data.orders?.reduce((sum: number, order: any) => sum + (order.total || 0), 0) || 0
      }
    } catch (error) {
      throw error
    }
  }
}
