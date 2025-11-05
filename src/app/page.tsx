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
                      <button 
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-lg font-semibold transition-colors border border-gray-700"
                      >
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

              {/* Enhanced Trust Indicators */}
              <div className="feature-stats-bar bg-gray-800/50 rounded-2xl p-8 mb-20 border border-gray-700">
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
              <div id="features" className="mb-20">
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
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">5 major TV platform previews</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Real-time UI overlay detection</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Distance-based optimization (8-16 feet)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Specific platform recommendations</span>
                      </li>
                    </ul>
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
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">100MB+ → 49MB in 30 seconds</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Quality-focused compression algorithms</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">All platform compliance checks</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Batch processing for 50+ thumbnails</span>
                      </li>
                    </ul>
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
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">1080p → 4K/8K with AI</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Face enhancement & text sharpening</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Video frame precision extraction</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">YouTube-safe color grading</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div id="pricing" className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Simple, Creator-Friendly Pricing
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    No hidden fees. No per-video charges. Just one flat rate for unlimited TV optimization.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {/* Free Trial */}
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
                        <span className="text-gray-300">Basic compression (to 100MB)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Watermarked upscaling</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Email support</span>
                      </li>
                    </ul>
                    <button className="pricing-gray-btn w-full py-3 rounded-lg font-medium transition-colors">
                      Start Free Trial
                    </button>
                  </div>

                  {/* Creator Pro */}
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
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Batch processing</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Priority support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Export settings save</span>
                      </li>
                    </ul>
                    <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all font-semibold">
                      Get Creator Pro
                    </button>
                  </div>

                  {/* Enterprise */}
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
                        <span className="text-gray-300">Custom AI training</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">API access</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Dedicated support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Custom integrations</span>
                      </li>
                    </ul>
                    <button className="pricing-gray-btn w-full py-3 rounded-lg font-medium transition-colors">
                      Contact Sales
                    </button>
                  </div>
                </div>

                {/* ROI Calculator */}
                <div className="mt-16 bg-gradient-to-r from-green-900/20 to-green-900/10 rounded-2xl p-8 border border-green-500/20">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-white mb-4">What's Your ROI?</h3>
                    <p className="text-gray-300">See how much extra views you could gain with TV optimization</p>
                  </div>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">$29</div>
                      <div className="text-sm text-gray-400">Monthly cost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">+20%</div>
                      <div className="text-sm text-gray-400">Avg CTR increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">$100-150</div>
                      <div className="text-sm text-gray-400">Value per video</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">10x+</div>
                      <div className="text-sm text-gray-400">ROI (on average)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Loved by 50,000+ YouTube Creators
                  </h2>
                  <p className="text-xl text-gray-300">See what top creators are saying about ThumbnailTV</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic">
                      "My thumbnails looked amazing on my phone but terrible on my Samsung TV. ThumbnailTV showed me exactly what was wrong and fixed it. Views increased by 23% in the first week."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">SC</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">Sarah Chen</div>
                        <div className="text-gray-400 text-sm">Tech Reviews • 2.5M subs</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic">
                      "I was losing so many views because my thumbnails had text covered by TV UI. The AI analysis helped me redesign everything. Best $29 I've ever spent on my channel."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">MR</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">Mike Rodriguez</div>
                        <div className="text-gray-400 text-sm">Gaming • 1.8M subs</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic">
                      "The frame upscaling feature alone is worth it. I can now use perfect moments from my videos as thumbnails. The AI quality is incredible."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">EK</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">Emma Kim</div>
                        <div className="text-gray-400 text-sm">Cooking • 890K subs</div>
                      </div>
                    </div>
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
                    <button 
                      onClick={() => setShowDemo(true)}
                      className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-lg font-semibold transition-colors border border-gray-700"
                    >
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

      {/* Enhanced Footer */}
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
                <li className="hover:text-gray-300 transition-colors cursor-pointer">TV Preview</li>
                <li className="hover:text-gray-300 transition-colors cursor-pointer">AI Compression</li>
                <li className="hover:text-gray-300 transition-colors cursor-pointer">Frame Upscaling</li>
                <li className="hover:text-gray-300 transition-colors cursor-pointer">Platform Analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-gray-300 transition-colors cursor-pointer">Creator Blog</li>
                <li className="hover:text-gray-300 transition-colors cursor-pointer">TV Optimization Guide</li>
                <li className="hover:text-gray-300 transition-colors cursor-pointer">Success Stories</li>
                <li className="hover:text-gray-300 transition-colors cursor-pointer">API Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-gray-300 transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-gray-300 transition-colors cursor-pointer">Contact</li>
                <li className="hover:text-gray-300 transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-gray-300 transition-colors cursor-pointer">Terms of Service</li>
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
