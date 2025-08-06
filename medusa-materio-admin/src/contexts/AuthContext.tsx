// src/contexts/AuthContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authAPI } from '@/lib/api'

interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await authAPI.login(email, password)
      
      if (response.token) {
        // Store the token
        localStorage.setItem('medusa_auth_token', response.token)
        // For now, create a mock user object since we have the token
        // You can later fetch user details with the token
        setUser({
          id: 'user_admin',
          email: email,
          role: 'admin'
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
      setUser(null)
      localStorage.removeItem('medusa_auth_token')
    } catch (error) {
      console.error('Logout error:', error)
      // Even if the API call fails, we should clear local state
      setUser(null)
      localStorage.removeItem('medusa_auth_token')
    }
  }

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('medusa_auth_token')
      if (token) {
        const response = await authAPI.getProfile()
        if (response.user) {
          setUser(response.user)
        }
      }
    } catch (error) {
      console.error('Auth check error:', error)
      localStorage.removeItem('medusa_auth_token')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
