'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import { Plus, Trash2, FolderOpen, Tv, Image, TrendingUp } from 'lucide-react'

// Mock project data for demo
const mockProjects = [
  {
    id: '1',
    name: 'Tech Review - iPhone 15',
    thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=225&fit=crop',
    lastModified: '2024-01-15',
    status: 'optimized'
  },
  {
    id: '2', 
    name: 'Gaming - PS5 Review',
    thumbnail: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=225&fit=crop',
    lastModified: '2024-01-14',
    status: 'needs-optimization'
  },
  {
    id: '3',
    name: 'Cooking - Pasta Recipe',
    thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=225&fit=crop',
    lastModified: '2024-01-13',
    status: 'optimized'
  }
]

export default function ProjectsDashboard() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState(mockProjects)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const handleLoadProject = async (projectId: string) => {
    setLoading(true)
    setSelectedProject(projectId)
    
    // Simulate loading project
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setLoading(false)
    console.log(`Loading project: ${projectId}`)
  }

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    setLoading(true)
    
    // Simulate deleting project
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setProjects(prev => prev.filter(p => p.id !== projectId))
    setLoading(false)
    
    if (selectedProject === projectId) {
      setSelectedProject(null)
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Please sign in to view your projects</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
          <p className="text-gray-400">
            Manage your thumbnail optimization projects
          </p>
        </div>
        <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Tv className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{projects.length}</div>
              <div className="text-sm text-gray-400">Total Projects</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {projects.filter(p => p.status === 'optimized').length}
              </div>
              <div className="text-sm text-gray-400">Optimized</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <Image className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {projects.filter(p => p.status === 'needs-optimization').length}
              </div>
              <div className="text-sm text-gray-400">Need Optimization</div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`bg-gray-800 rounded-xl overflow-hidden border transition-all ${
                selectedProject === project.id
                  ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'optimized'
                        ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                        : 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'
                    }`}
                  >
                    {project.status === 'optimized' ? 'Optimized' : 'Needs Work'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Modified: {project.lastModified}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLoadProject(project.id)}
                    disabled={loading}
                    className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {loading && selectedProject === project.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                    ) : (
                      'Open'
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    disabled={loading}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <FolderOpen className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
          <p className="text-gray-400 mb-6">
            Create your first thumbnail optimization project
          </p>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
            Create First Project
          </button>
        </div>
      )}
    </div>
  )
}
