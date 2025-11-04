'use client'

import { useAuth } from '@/contexts/AuthContext'
import { User, Mail } from 'lucide-react'

export default function UserProfile() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-400">Please sign in to view your profile</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-6">
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <p className="text-sm text-gray-400">Content Creator</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-300">
          <Mail className="w-5 h-5 text-purple-400" />
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  )
}
