'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Tv, Menu, X, LogIn, LogOut, User } from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const { user, signOut } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Guide', href: '/guide' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Docs', href: '/docs' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Tv className="h-8 w-8 text-purple-500" />
            <span className="text-xl font-bold text-white">ThumbnailTV</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{user.name}</span>
                </div>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <div className="px-3 py-2 border-t border-gray-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{user.name}</span>
                  </div>
                  <button
                    onClick={signOut}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}