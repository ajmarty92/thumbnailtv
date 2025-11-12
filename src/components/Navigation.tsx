'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useState, useEffect } from 'react'
import { Moon, Sun, User, LogOut } from 'lucide-react'

export default function Navigation() {
  const { user, login, logout, isLoading } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [loginError, setLoginError] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'pricing', 'faq']
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle auth modal hash in URL
  useEffect(() => {
    const checkHashAndOpenModal = () => {
      console.log('Checking hash:', window.location.hash, 'User logged in:', !!user)
      if (window.location.hash === '#auth-modal') {
        if (!user) {
          console.log('Opening auth modal')
          setShowLogin(true)
          // Clean up the hash after opening modal
          setTimeout(() => {
            window.history.replaceState(null, '', window.location.pathname)
            console.log('Hash cleaned up')
          }, 50)
        } else {
          console.log('User already logged in, cleaning up hash')
          window.history.replaceState(null, '', window.location.pathname)
        }
      }
    }
    
    // Check immediately
    checkHashAndOpenModal()
    
    // Listen for hash changes
    const handleHashChange = () => {
      console.log('Hash change event detected')
      checkHashAndOpenModal()
    }
    
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [user])

  // Theme toggle functions
  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (newTheme === 'light') {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    }
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark'
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    applyTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const success = await login(email, password)
    if (success) {
      setShowLogin(false)
      setEmail('')
      setPassword('')
    } else {
      setLoginError('Invalid credentials. Try demo@thumbnailtv.io / demo123')
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false) // Close mobile menu after clicking
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              ThumbnailTV
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('features')}
              className={`text-gray-300 hover:text-white transition-colors duration-200 font-medium ${
                activeSection === 'features' ? 'text-purple-400' : ''
              }`}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className={`text-gray-300 hover:text-white transition-colors duration-200 font-medium ${
                activeSection === 'pricing' ? 'text-purple-400' : ''
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className={`text-gray-300 hover:text-white transition-colors duration-200 font-medium ${
                activeSection === 'faq' ? 'text-purple-400' : ''
              }`}
            >
              FAQ
            </button>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600" />
              )}
            </button>

            {/* Auth Section - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {isLoading ? (
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              ) : user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {user.avatar && (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className="text-sm text-gray-300">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <User className="w-4 h-4" />
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700 py-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection('features')}
                className={`text-gray-300 hover:text-white transition-colors duration-200 font-medium text-left px-2 py-2 ${
                  activeSection === 'features' ? 'text-purple-400' : ''
                }`}
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className={`text-gray-300 hover:text-white transition-colors duration-200 font-medium text-left px-2 py-2 ${
                  activeSection === 'pricing' ? 'text-purple-400' : ''
                }`}
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className={`text-gray-300 hover:text-white transition-colors duration-200 font-medium text-left px-2 py-2 ${
                  activeSection === 'faq' ? 'text-purple-400' : ''
                }`}
              >
                FAQ
              </button>
              
              {/* Mobile Auth Section */}
              <div className="border-t border-gray-700 pt-3 mt-3">
                {isLoading ? (
                  <div className="flex items-center justify-center py-2">
                    <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-2">
                      {user.avatar && (
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <span className="text-sm text-gray-300">{user.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowLogin(true)
                      setMobileMenuOpen(false)
                    }}
                    className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Login Modal */}
      {showLogin && !user && (
        <>
          {/* Prevent body scroll */}
          <div className="modal-open"></div>
          
          <div className="login-modal-overlay">
            <div className="login-modal-content">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Sign In</h2>
                <button
                  onClick={() => {
                    setShowLogin(false)
                    setLoginError('')
                  }}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="demo@thumbnailtv.io"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="demo123"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                {loginError && (
                  <p className="text-red-400 text-sm">{loginError}</p>
                )}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowLogin(false)
                      setLoginError('')
                    }}
                    className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  Demo: demo@thumbnailtv.io / demo123
                </p>
              </form>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
