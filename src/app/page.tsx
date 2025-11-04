'use client'

import { useAuth } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'
import TVOptimizationSuite from '@/components/TVOptimizationSuite'
import { useState } from 'react'
import { Tv, Zap, TrendingUp, Check, Star, ArrowRight, Play, Users, Shield, Sparkles } from 'lucide-react'

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const [showDemo, setShowDemo] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Show TV Demo when user clicks the demo button */}
          {user && showDemo ? (
            <TVOptimizationSuite />
          ) : (
            <>
              {/* Hero Section */}
              <div className="text-center mb-20">
                <div className="flex justify-center mb-6">
                  <div className="px-4 py-2 bg-purple-600/10 border border-purple-500/20 rounded-full">
                    <span className="text-purple-400 text-sm font-semibold">🎯 Used by 50,000+ YouTube Creators</span>
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Stop Losing Views on{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                    TV Screens
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                  73% of YouTube views happen on Smart TVs. If your thumbnails look perfect on phones but terrible on TV screens, 
                  you're losing thousands of views every single day.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  {user ? (
                    <>
                      <button 
                        onClick={() => setShowDemo(true)}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-xl"
                      >
                        <Play className="w-5 h-5 inline mr-2" />
                        Try TV Preview Demo
                      </button>
                      <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-lg font-semibold transition-colors border border-gray-700">
                        View Pricing
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-xl">
                        <ArrowRight className="w-5 h-5 inline mr-2" />
                        Start Free Trial
                      </button>
                      <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-lg font-semibold transition-colors border border-gray-700">
                        <Play className="w-5 h-5 inline mr-2" />
                        Watch 2-Min Demo
                      </button>
                    </>
                  )}
                </div>
                
                <p className="text-sm text-gray-400">
                  ⚡ 15-25% higher CTR on average • 🎯 Works with all YouTube niches • 📺 Optimized for 5 TV platforms
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="bg-gray-800/50 rounded-2xl p-8 mb-20 border border-gray-700">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">73%</div>
                    <div className="text-gray-400 text-sm">YouTube views on Smart TVs</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">15-25%</div>
                    <div className="text-gray-400 text-sm">Higher CTR on optimized thumbnails</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">2-3 hours</div>
                    <div className="text-gray-400 text-sm">Saved per video with AI tools</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
                    <div className="text-gray-400 text-sm">Creator satisfaction score</div>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    The Complete TV Optimization Toolkit
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Everything you need to dominate the living room and capture that 73% of YouTube viewers watching on Smart TVs.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-purple-900/20 to-purple-900/10 rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-6">
                      <Tv className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">TV Safe Zone Preview</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      See exactly how your thumbnails look on Google TV, Roku, Samsung TV, Apple TV, and Fire TV. 
                      Get instant AI analysis of UI overlap, text visibility, and visual impact.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-900/20 to-pink-900/10 rounded-2xl p-8 border border-pink-500/20 hover:border-pink-500/40 transition-all">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl flex items-center justify-center mb-6">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">AI Smart Compression</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Your 4K PNG thumbnails are 100MB+ but platforms limit you to 50MB. 
                      Our AI analyzes your image content and compresses to 49MB while maintaining perfect visual quality.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Frame-to-Thumbnail Upscaler</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      That perfect frame in your video is trapped at 1080p. Extract it, 
                      upscale to 4K/8K with AI, enhance faces and sharpen text for stunning thumbnails.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Simple, Creator-Friendly Pricing
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    No hidden fees. No per-video charges. Just one flat rate for unlimited TV optimization.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">Free Trial</h3>
                      <div className="text-4xl font-bold text-white mb-1">$0</div>
                      <p className="text-gray-400">7 days</p>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">5 TV previews per day</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Basic compression</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Watermarked upscaling</span>
                      </li>
                    </ul>
                    <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors">
                      Start Free Trial
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900/20 to-purple-900/10 rounded-2xl p-8 border-2 border-purple-500 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-purple-600 rounded-full">
                      <span className="text-white text-sm font-semibold">MOST POPULAR</span>
                    </div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">Creator Pro</h3>
                      <div className="text-4xl font-bold text-white mb-1">$29</div>
                      <p className="text-gray-400">per month</p>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Unlimited TV previews</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">AI smart compression</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">4K/8K upscaling</span>
                      </li>
                    </ul>
                    <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all font-semibold">
                      Get Creator Pro
                    </button>
                  </div>

                  <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                      <div className="text-4xl font-bold text-white mb-1">$99</div>
                      <p className="text-gray-400">per month</p>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Everything in Pro</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Team collaboration</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">API access</span>
                      </li>
                    </ul>
                    <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>

              {/* Final CTA */}
              <div className="text-center mb-20">
                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl p-12 border border-purple-500/20">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to Stop Losing TV Views?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                    Join 50,000+ creators who are already winning the living room battle. 
                    Start your free 7-day trial and see the difference in your first video.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-xl">
                      <Sparkles className="w-5 h-5 inline mr-2" />
                      Start Free 7-Day Trial
                    </button>
                    <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-lg font-semibold transition-colors border border-gray-700">
                      <Play className="w-5 h-5 inline mr-2" />
                      Watch Live Demo
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mt-6">
                    No credit card required • Cancel anytime • 15-25% higher CTR guaranteed*
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/50 border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
                ThumbnailTV
              </h3>
              <p className="text-gray-400 text-sm">
                The AI-powered TV optimization suite for YouTube creators.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>TV Preview</li>
                <li>AI Compression</li>
                <li>Frame Upscaling</li>
                <li>Platform Analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Creator Blog</li>
                <li>TV Optimization Guide</li>
                <li>Success Stories</li>
                <li>API Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            © 2024 ThumbnailTV. All rights reserved. Made with ❤️ for YouTube creators.
          </div>
        </div>
      </footer>
    </div>
  )
}
