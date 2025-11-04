'use client'

import { useAuth } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'
import { useState } from 'react'
import { Tv, Zap, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const { user, isLoading } = useAuth()

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Stop Losing Views on{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                TV Screens
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              73% of YouTube views happen on Smart TVs. Optimize your thumbnails for the living room with AI-powered tools.
            </p>
            
            {user ? (
              <div className="flex flex-col items-center gap-4">
                <p className="text-green-400">Welcome back, {user.name}! 🎉</p>
                <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-lg font-semibold transition-colors">
                  Open TV Optimization Suite
                </button>
              </div>
            ) : (
              <p className="text-gray-400">Sign in to start optimizing your thumbnails</p>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Tv className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">TV Preview</h3>
              <p className="text-gray-400">
                See exactly how your thumbnails look on 5 major TV platforms
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Compression</h3>
              <p className="text-gray-400">
                AI-powered compression keeps quality while meeting platform limits
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Upscaling</h3>
              <p className="text-gray-400">
                Turn 1080p video frames into stunning 4K/8K thumbnails
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-8 border border-purple-500/20">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">73%</div>
                <div className="text-gray-300">YouTube views on TV</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">15-25%</div>
                <div className="text-gray-300">Higher CTR on TV</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">2-3hrs</div>
                <div className="text-gray-300">Saved per video</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
