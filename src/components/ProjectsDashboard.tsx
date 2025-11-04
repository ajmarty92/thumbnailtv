'use client'

import { useState } from 'react'
import { Trash2, Download, Eye, Calendar, FolderPlus } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function ProjectsDashboard() {
  const { user, projects, deleteProject, loadProject } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleLoadProject = async (projectId: string) => {
    setLoading(true)
    try {
      const project = await loadProject(projectId)
      if (project) {
        // Load project into main app
        window.location.href = `/?project=${projectId}`
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(projectId)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Projects</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {projects.length} project{projects.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        <button className="bg-tv-blue hover:bg-tv-blue/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
          <FolderPlus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <FolderPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first TV-optimized thumbnail project
          </p>
          <button className="bg-tv-blue hover:bg-tv-blue/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-9 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(project.updatedAt)}
                    </span>
                    <span>TV Optimized</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLoadProject(project.id)}
                    disabled={loading}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-tv-blue dark:hover:text-tv-blue hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    title="Load project"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-tv-blue dark:hover:text-tv-blue hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
