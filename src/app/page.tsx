'use client'

import { useState } from 'react'
import { Tv, Zap, Sparkles, TrendingUp, CheckCircle } from 'lucide-react'
import TVOptimizationSuite from '@/components/TVOptimizationSuite'

export default function Home() {
  const [showApp, setShowApp] = useState(false)

  if (showApp) {
    return <TVOptimizationSuite />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-tv-black via-tv-gray to-tv-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Tv className="w-12 h-12 text-tv-blue" />
            <h1 className="text-5xl font-bold">ThumbnailTV</h1>
          </div>
          <p className="text-2xl text-gray-300 mb-4">AI-Powered TV Optimization Suite</p>
          <p className="text-xl text-tv-red font-semibold mb-8">
            Stop Losing Views on TV Screens
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            73% of YouTube views now happen on Smart TVs. Your thumbnails look perfect on phones but terrible on TV screens. Fix that today.
          </p>
        </div>

        {/* Problem Statement */}
        <div className="bg-tv-gray/50 border border-tv-red/30 rounded-lg p-8 mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-tv-red mb-4">The Problem</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-tv-red mt-1">❌</span>
              <span>Your thumbnail text is unreadable on 55" TVs from 10 feet away</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-tv-red mt-1">❌</span>
              <span>Platform UI overlays hide critical parts of your thumbnail</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-tv-red mt-1">❌</span>
              <span>Your 100MB 4K PNG gets rejected by YouTube's 50MB limit</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-tv-red mt-1">❌</span>
              <span>Perfect video frames are stuck at 1080p, unusable for 4K thumbnails</span>
            </li>
          </ul>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-tv-gray/50 border border-tv-blue/30 rounded-lg p-6">
            <Tv className="w-12 h-12 text-tv-blue mb-4" />
            <h3 className="text-xl font-bold mb-3">TV Safe-Zone Preview</h3>
            <p className="text-gray-400 mb-4">
              Test your thumbnails on 5 major TV platforms: Google TV, Roku, Samsung TV, Apple TV, Fire TV
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-tv-green" />
                Accurate UI overlays
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-tv-green" />
                AI issue detection
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-tv-green" />
                Specific recommendations
              </li>
            </ul>
          </div>

          <div className="bg-tv-gray/50 border border-tv-blue/30 rounded-lg p-6">
            <Zap className="w-12 h-12 text-tv-blue mb-4" />
            <h3 className="text-xl font-bold mb-3">AI Smart Compression</h3>
            <p className="text-gray-400 mb-4">
              Compress 4K thumbnails from 100MB+ to under 50MB while maintaining perfect quality
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-tv-green" />
                Platform compliance
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-tv-green" />
                Quality preservation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-tv-green" />
                Instant processing
              </li>
            </ul>
          </div>

          <div className="bg-tv-gray/50 border border-tv-blue/30 rounded-lg p-6">
            <Sparkles className="w-12 h-12 text-tv-blue mb-4" />
            <h3 className="text-xl font-bold mb-3">Frame Upscaler</h3>
            <p className="text-gray-400 mb-4">
              Extract perfect video moments and upscale to 4K/8K with AI enhancement
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-tv-green" />
                Face enhancement
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-tv-green" />
                Text sharpening
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-tv-green" />
                4K/8K output
              </li>
            </ul>
          </div>
        </div>

        {/* ROI Section */}
        <div className="bg-gradient-to-r from-tv-blue/20 to-tv-green/20 border border-tv-blue/30 rounded-lg p-8 mb-12 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-tv-green" />
            <h2 className="text-2xl font-bold">The ROI</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-3xl font-bold text-tv-green mb-2">15-25%</p>
              <p className="text-gray-300">Higher CTR on TV screens</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-tv-green mb-2">2-3 hours</p>
              <p className="text-gray-300">Saved per video</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-tv-green mb-2">$100-150</p>
              <p className="text-gray-300">Value per video</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-tv-green mb-2">10x ROI</p>
              <p className="text-gray-300">For $29/month</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => setShowApp(true)}
            className="bg-tv-blue hover:bg-tv-blue/80 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
          >
            Launch ThumbnailTV Suite
          </button>
          <p className="text-gray-400 mt-4">
            Free trial • No credit card required • 50 free AI credits
          </p>
        </div>
      </div>
    </div>
  )
}
