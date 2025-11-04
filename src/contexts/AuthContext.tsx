'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  plan: 'free' | 'pro'
  credits: number
}

interface Project {
  id: string
  name: string
  thumbnail: string
  tvPreviews: Record<string, any>
  compression: any
  upscaling: any
  createdAt: string
  updatedAt: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  projects: Project[]
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  saveProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  loadProject: (projectId: string) => Promise<Project | null>
  deleteProject: (projectId: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('thumbnailtv-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      loadProjects()
    }
    setLoading(false)
  }, [])

  const loadProjects = async () => {
    // In production, this would be an API call
    const savedProjects = localStorage.getItem('thumbnailtv-projects')
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Demo authentication - replace with real API
      const mockUser: User = {
        id: 'demo-user',
        email,
        name: email.split('@')[0],
        plan: 'free',
        credits: 50
      }
      
      setUser(mockUser)
      localStorage.setItem('thumbnailtv-user', JSON.stringify(mockUser))
      await loadProjects()
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      // Demo signup - replace with real API
      const mockUser: User = {
        id: 'demo-user',
        email,
        name,
        plan: 'free',
        credits: 50
      }
      
      setUser(mockUser)
      localStorage.setItem('thumbnailtv-user', JSON.stringify(mockUser))
      await loadProjects()
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setProjects([])
    localStorage.removeItem('thumbnailtv-user')
    localStorage.removeItem('thumbnailtv-projects')
  }

  const saveProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)
    localStorage.setItem('thumbnailtv-projects', JSON.stringify(updatedProjects))
  }

  const loadProject = async (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    return project || null
  }

  const deleteProject = async (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId)
    setProjects(updatedProjects)
    localStorage.setItem('thumbnailtv-projects', JSON.stringify(updatedProjects))
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      projects,
      login,
      signup,
      logout,
      saveProject,
      loadProject,
      deleteProject
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
