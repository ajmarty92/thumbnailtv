'use client'

import { useState, useEffect } from 'react'
import { useAuth }, signIn, signOut } from '@/contexts/AuthContext'
import { 
  Tv, 
  Zap, 
  Sparkles, 
  TrendingUp, 
  CheckCircle, 
  Star,
  Play,
  ArrowRight,
  MessageSquare,
  Users,
  Award,
  Eye,
  Clock,
  DollarSign,
  Sun,
  Moon,
  FolderOpen,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import TVOptimizationSuite from '@/components/TVOptimizationSuite'
import ProjectsDashboard from '@/components/ProjectsDashboard'

// Background SVG for both themes
const backgroundSvg = `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%230066cc" fill-opacity="0.4"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>`;
const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(backgroundSvg)}`;

export default function Home() {
  const { data: session, status } = useAuth()
  const [currentPage, setCurrentPage] = useState('home')
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('thumbnailtv-theme') as 'light' | 'dark'
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme(systemTheme)
      document.documentElement.classList.toggle('dark', systemTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('thumbnailtv-theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const handleSignIn = () => {
    signIn('google')
  }

  const handleSignOut = () => {
    signOut()
    setCurrentPage('home')
  }

  // Conditional rendering based on current page
  if (currentPage === 'app') {
    return <TVOptimizationSuite />
  }

  if (currentPage === 'projects' && session) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-tv-black' : 'bg-gray-50'} text-white dark:text-gray-900`}>
          <Navigation 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            theme={theme}
            toggleTheme={toggleTheme}
            session={session}
            onSignOut={handleSignOut}
            onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            mobileMenuOpen={mobileMenuOpen}
          />
          <main className="container mx-auto px-4 py-8">
            <ProjectsDashboard />
          </main>
        </div>
      </div>
    )
  }

  const themeClasses = theme === 'dark' 
    ? 'bg-gradient-to-br from-tv-black via-tv-gray to-black text-white' 
    : 'bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900'

  const navBgClasses = theme === 'dark'
    ? 'border-b border-white/10 backdrop-blur-sm bg-gray-900/95'
    : 'border-b border-gray-200 backdrop-blur-sm bg-white/95'

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900'
  const secondaryTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600'

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className={`min-h-screen ${themeClasses} overflow-hidden`}>
        {/* Background Pattern */}
        <div 
          className="fixed inset-0 opacity-10"
          style={{ backgroundImage: `url("${dataUrl}")` }}
        />

        {/* Navigation */}
        <nav className={`relative ${navBgClasses} sticky top-0 z-40`}>
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
                  className={`${secondaryTextColor} hover:${textColor} transition-colors`}
                >
                  Features
                </a>
                <a 
                  href="#testimonials" 
                  className={`${secondaryTextColor} hover:${textColor} transition-colors`}
                >
                  Reviews
                </a>
                <a 
                  href="#pricing" 
                  className={`${secondaryTextColor} hover:${textColor} transition-colors`}
                >
                  Pricing
                </a>
                
                {session && (
                  <button
                    onClick={() => setCurrentPage('projects')}
                    className={`flex items-center gap-2 ${currentPage === 'projects' ? 'text-tv-blue' : secondaryTextColor} hover:${textColor} transition-colors`}
                  >
                    <FolderOpen className="w-4 h-4" />
                    Projects
                  </button>
                )}

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg border ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'} transition-colors`}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600" />
                  )}
                </button>

                {session ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCurrentPage('app')}
                      className="bg-tv-blue hover:bg-tv-blue/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Try Free
                    </button>
                    <div className="flex items-center gap-2">
                      <img 
                        src={session.user?.image || ''} 
                        alt={session.user?.name || ''} 
                        className="w-8 h-8 rounded-full"
                      />
                      <span className={`text-sm ${secondaryTextColor}`}>{session.user?.name}</span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="bg-tv-blue hover:bg-tv-blue/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Sign In with Google
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
                    className={`${secondaryTextColor} hover:${textColor} transition-colors`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a 
                    href="#testimonials" 
                    className={`${secondaryTextColor} hover:${textColor} transition-colors`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Reviews
                  </a>
                  <a 
                    href="#pricing" 
                    className={`${secondaryTextColor} hover:${textColor} transition-colors`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </a>
                  
                  {session && (
                    <button
                      onClick={() => {
                        setCurrentPage('projects')
                        setMobileMenuOpen(false)
                      }}
                      className={`text-left flex items-center gap-2 ${currentPage === 'projects' ? 'text-tv-blue' : secondaryTextColor} hover:${textColor} transition-colors`}
                    >
                      <FolderOpen className="w-4 h-4" />
                      Projects
                    </button>
                  )}

                  {/* Theme Toggle Mobile */}
                  <button
                    onClick={() => {
                      toggleTheme()
                      setMobileMenuOpen(false)
                    }}
                    className={`p-2 rounded-lg border ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'} transition-colors flex items-center gap-2`}
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="w-5 h-5 text-yellow-400" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5 text-gray-600" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>

                  {session ? (
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => {
                          setCurrentPage('app')
                          setMobileMenuOpen(false)
                        }}
                        className="bg-tv-blue hover:bg-tv-blue/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-left"
                      >
                        Try Free
                      </button>
                      <button
                        onClick={() => {
                          handleSignOut()
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
                        handleSignIn()
                        setMobileMenuOpen(false)
                      }}
                      className="bg-tv-blue hover:bg-tv-blue/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Sign In with Google
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 ${theme === 'dark' ? 'bg-tv-green/20 border border-tv-green/30' : 'bg-green-100 border border-green-300'} rounded-full px-4 py-2 mb-6`}>
              <TrendingUp className="w-4 h-4 text-tv-green" />
              <span className="text-sm text-tv-green font-medium">73% of YouTube views now happen on TV</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                Stop Losing Views
              </span>
              <br />
              <span className="bg-gradient-to-r from-tv-blue to-tv-green bg-clip-text text-transparent">
                on TV Screens
              </span>
            </h1>

            {/* Subheadline */}
            <p className={`text-xl ${secondaryTextColor} mb-8 max-w-3xl mx-auto leading-relaxed`}>
              Your thumbnails look 🔥 on phones but 💀 on 55" TVs. 
              Fix that in 2 minutes with AI-powered TV optimization trusted by 10,000+ creators.
            </p>

            {/* Stats Bar */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className={`text-sm ${secondaryTextColor}`}>4.9/5 rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-tv-green">15-25%</p>
                <p className={`text-sm ${secondaryTextColor}`}>higher CTR</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-tv-blue">2-3 hours</p>
                <p className={`text-sm ${secondaryTextColor}`}>saved per video</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <button
                onClick={() => setCurrentPage('app')}
                className="bg-gradient-to-r from-tv-blue to-tv-blue/80 hover:from-tv-blue/90 hover:to-tv-blue/70 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 flex items-center gap-2"
              >
                Start Optimizing Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className={`${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'} backdrop-blur-sm text-gray-900 dark:text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all flex items-center gap-2`}>
                <Play className="w-5 h-5" />
                Watch 2-Min Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className={`flex items-center justify-center gap-8 text-sm ${secondaryTextColor}`}>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>10,000+ creators</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>50M+ thumbnails optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>#1 TV optimization tool</span>
              </div>
            </div>
          </div>

          {/* ... rest of your existing content (before/after, testimonials, etc.) */}
          {/* Keep all the existing sections, just update the theme classes as needed */}
        </div>
      </div>
    </div>
  )
}

// Navigation Component (inline)
function Navigation({ 
  currentPage, 
  setCurrentPage, 
  theme, 
  toggleTheme, 
  session, 
  onSignOut,
  onMobileMenuToggle,
  mobileMenuOpen 
}: any) {
  return (
    <nav className={`relative border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-900/95' : 'border-gray-200 bg-white/95'} backdrop-blur-sm sticky top-0 z-40`}>
      {/* Navigation content - you already have this in the main component */}
    </nav>
  )
}
