'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { medusaAPI } from '../services/medusa'

interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  role?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('medusa_admin_token')
        if (token) {
          // Validate token by making a request to store endpoint
          const response = await medusaAPI.getStore()
          if (response.data) {
            // Set a default user (you can get actual user data from your backend)
            setUser({
              id: 'admin',
              email: 'admin@example.com',
              first_name: 'Admin',
              last_name: 'User',
              role: 'admin'
            })
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('medusa_admin_token')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await medusaAPI.login(email, password)
      
      // Check if login was successful and we got a token
      if (response.status === 200 && response.data.token) {
        // Store the JWT token
        localStorage.setItem('medusa_admin_token', response.data.token)
        setUser({
          id: 'admin',
          email: email,
          first_name: 'Admin',
          last_name: 'User',
          role: 'admin'
        })
        return true
      }
      return false
    } catch (error: any) {
      console.error('Login failed:', error)
      if (error.response?.status === 401) {
        console.error('Invalid credentials')
      }
      return false
    }
  }

  const logout = async () => {
    try {
      await medusaAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('medusa_admin_token')
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
