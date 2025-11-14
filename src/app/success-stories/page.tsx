'use client'

import React from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { Star, TrendingUp, Play, Users, DollarSign, Eye, Quote, ArrowRight } from 'lucide-react'

export default function SuccessStoriesPage() {
  const stories = [
    {
      id: 1,
      channel: "TechReview Pro",
      creator: "Sarah Chen",
      niche: "Technology Reviews",
      subscribers: "2.5M",
      beforeAfter: {
        ctr: "2.1% → 2.6%",
        views: "150K → 195K per video",
        revenue: "$1,200 → $1,560 per video"
      },
      quote: "My thumbnails looked amazing on phones but terrible on my Samsung TV. ThumbnailTV showed me exactly what was wrong and helped me redesign everything. Views increased by 23% in the first week.",
      metrics: {
        ctrIncrease: "+23%",
        viewIncrease: "+30%",
        revenueIncrease: "+30%",
        timeframe: "First week"
      },
      image: "/success-stories/tech-review.jpg",
      tagline: "From Phone-Perfect to TV-Stunning"
    },
    {
      id: 2,
      channel: "GameZone Network",
      creator: "Mike Rodriguez",
      niche: "Gaming Content",
      subscribers: "1.8M",
      beforeAfter: {
        ctr: "1.8% → 2.3%",
        views: "200K → 255K per video",
        revenue: "$1,600 → $2,040 per video"
      },
      quote: "I was losing so many views because my text was cut off on TV. The AI analysis helped me understand exactly where to place text for maximum visibility. Best $79 I've ever spent on my channel.",
      metrics: {
        ctrIncrease: "+28%",
        viewIncrease: "+28%",
        revenueIncrease: "+28%",
        timeframe: "First month"
      },
      image: "/success-stories/gaming.jpg",
      tagline: "Domination in the Living Room"
    },
    {
      id: 3,
      channel: "Cooking with Emma",
      creator: "Emma Kim",
      niche: "Food & Cooking",
      subscribers: "890K",
      beforeAfter: {
        ctr: "2.5% → 3.1%",
        views: "80K → 99K per video",
        revenue: "$640 → $792 per video"
      },
      quote: "The frame upscaling feature alone is worth it. I can now use perfect moments from my videos as thumbnails. The AI quality is incredible and my audience engagement has never been higher.",
      metrics: {
        ctrIncrease: "+24%",
        viewIncrease: "+24%",
        revenueIncrease: "+24%",
        timeframe: "First 2 weeks"
      },
      image: "/success-stories/cooking.jpg",
      tagline: "Perfect Moments, Perfect Thumbnails"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="flex justify-center mb-6">
              <div className="px-4 py-2 bg-green-600/10 border border-green-500/20 rounded-full">
                <span className="text-green-400 text-sm font-semibold">
                  Real Results from Real Creators
                </span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Success Stories
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              See how YouTube creators like you are transforming their channel performance with ThumbnailTV's AI-powered TV optimization.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-xl"
            >
              Start Optimizing Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Success Stories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {stories.map((story) => (
              <div key={story.id} className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-white mb-2">
                      {story.metrics.ctrIncrease}
                    </div>
                    <div className="text-gray-300">CTR Increase</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{story.channel}</h3>
                      <p className="text-gray-400 text-sm">{story.creator} • {story.niche}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm font-medium">{story.subscribers} subscribers</span>
                  </div>
                  
                  <blockquote className="text-gray-300 text-sm mb-6 italic">
                    "{story.quote}"
                  </blockquote>
                  
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-semibold mb-3">Before → After</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">CTR:</span>
                        <span className="text-green-400 font-medium">{story.beforeAfter.ctr}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Views:</span>
                        <span className="text-blue-400 font-medium">{story.beforeAfter.views}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue:</span>
                        <span className="text-yellow-400 font-medium">{story.beforeAfter.revenue}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Timeframe: {story.metrics.timeframe}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-300 text-sm">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">50,000+</div>
              <div className="text-gray-300">Creators Helped</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">+28%</div>
              <div className="text-gray-300">Average CTR Increase</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
              <div className="text-3xl font-bold text-green-400 mb-2">+32%</div>
              <div className="text-gray-300">Average View Growth</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
              <div className="text-3xl font-bold text-yellow-400 mb-2">+26%</div>
              <div className="text-gray-300">Average Revenue Boost</div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl p-12 border border-purple-500/20">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Be Our Next Success Story?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Join thousands of creators who are already winning the living room battle. 
                Start your free 7-day trial and see the difference in your first video.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/" 
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-xl"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/guide" className="text-gray-400 hover:text-white transition-colors">
                    Guide
                  </Link>
                </li>
                <li>
                  <Link href="/success-stories" className="text-gray-400 hover:text-white transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Social</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://twitter.com/thumbnailtv" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a 
                    href="https://youtube.com/thumbnailtv" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a 
                    href="https://instagram.com/thumbnailtv" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
                ThumbnailTV
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                The AI-powered TV optimization suite for YouTube creators.
              </p>
              <p className="text-gray-500 text-xs">
                © 2025 ThumbnailTV. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}