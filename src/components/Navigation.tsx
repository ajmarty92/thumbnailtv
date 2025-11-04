'use client'

import { useState } from 'react'
import { Tv, User, LogOut, FolderOpen, Menu, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'

interface NavigationProps {
  onNavigate: (page: string) => void
  currentPage: string
}

export default function Navigation({ onNavigate, currentPage }: NavigationProps) {
  const { user, logout } = useAuth()
  const { theme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    onNavigate('home')
  }

  const bgColor = theme === 'dark' 
    ? 'border-gray-700 bg-gray-900/95 backdrop-blur-sm' 
    : 'border-gray-200 bg-white/95 backdrop-blur-sm'

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900'

  return (
    <nav className={`relative border-b ${bgColor} sticky top-0 z-40`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-tv-blue to-tv-green rounded-lg flex items-center justify-center">
              <Tv className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-tv-blue to-tv-green bg-clip-text text-transparent">
              ThumbnailTV
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="#features" 
              className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:${textColor} transition-colors`}
              onClick={() => onNavigate('home')}
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:${textColor} transition-colors`}
              onClick={() => onNavigate('home')}
            >
              Reviews
            </a>
            <a 
              href="#pricing" 
              className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:${textColor} transition-colors`}
              onClick={() => onNavigate('home')}
            >
              Pricing
            </a>
            
            {user && (
              <button
                onClick={() => onNavigate('projects')}
                className={`${currentPage === 'projects' ? 'text-tv-blue' : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:${textColor} transition-colors flex items-center gap-2`}
              >
                <FolderOpen className="w-4 h-4" />
                Projects
              </button>
            )}

            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('app')}
                  className="bg-tv-blue hover:bg-tv-blue/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Try Free
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="bg-tv-blue hover:bg-tv-blue/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-4">
              <a 
                href="#features" 
                className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:${textColor} transition-colors`}
                onClick={() => {
                  onNavigate('home')
                  setMobileMenuOpen(false)
                }}
              >
                Features
              </a>
              <a 
                href="#testimonials" 
                className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:${textColor} transition-colors`}
                onClick={() => {
                  onNavigate('home')
                  setMobileMenuOpen(false)
                }}
              >
                Reviews
              </a>
              <a 
                href="#pricing" 
                className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:${textColor} transition-colors`}
                onClick={() => {
                  onNavigate('home')
                  setMobileMenuOpen(false)
                }}
              >
                Pricing
              </a>
              
              {user && (
                <button
                  onClick={() => {
                    onNavigate('projects')
                    setMobileMenuOpen(false)
                  }}
                  className={`text-left ${currentPage === 'projects' ? 'text-tv-blue' : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:${textColor} transition-colors flex items-center gap-2`}
                >
                  <FolderOpen className="w-4 h-4" />
                  Projects
                </button>
              )}

              <ThemeToggle />

              {user ? (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      onNavigate('app')
                      setMobileMenuOpen(false)
                    }}
                    className="bg-tv-blue hover:bg-tv-blue/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-left"
                  >
                    Try Free
                  </button>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="text-left text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onNavigate('auth')
                    setMobileMenuOpen(false)
                  }}
                  className="bg-tv-blue hover:bg-tv-blue/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
