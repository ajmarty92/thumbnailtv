'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: 'demo' | 'free' | 'starter' | 'pro' | 'manager'
  hasFullDemoAccess?: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  showAuthModal: () => void
  hideAuthModal: () => void
  isAuthModalOpen: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// NAMED EXPORT: AuthProvider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('thumbnailtv_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email === 'demo@thumbnailtv.io' && password === 'demo123') {
      const mockUser: User = {
        id: 'demo-user',
        name: 'Demo Creator',
        email: email,
        plan: 'demo',
        hasFullDemoAccess: true,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      }
      setUser(mockUser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('thumbnailtv_user', JSON.stringify(mockUser))
      }
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('thumbnailtv_user')
    }
  }

  const showAuthModal = () => {
    console.log('AuthContext: showAuthModal called - opening modal')
    setIsAuthModalOpen(true)
  }

  const hideAuthModal = () => {
    console.log('AuthContext: hideAuthModal called - closing modal')
    setIsAuthModalOpen(false)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, showAuthModal, hideAuthModal, isAuthModalOpen }}>
      {children}
    </AuthContext.Provider>
  )
}

// NAMED EXPORT: useAuth
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Optional: Default export for convenience
export default AuthContext
