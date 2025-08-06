// lib/medusa-client.ts
import axios from "axios"

// Create a simple HTTP client for Medusa API
const medusaClient = axios.create({
  baseURL: '/api/medusa', // Use proxy instead of direct backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Add request interceptor for authentication
medusaClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('medusa_auth_token') : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default medusaClient
