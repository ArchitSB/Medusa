'use client'

import { AuthProvider } from './AuthContext'
import { ReactNode } from 'react'

interface ClientAuthProviderProps {
  children: ReactNode
}

export const ClientAuthProvider = ({ children }: ClientAuthProviderProps) => {
  return <AuthProvider>{children}</AuthProvider>
}
