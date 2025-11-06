'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { Star, TrendingUp, Play, Users, DollarSign, Eye, Quote, ArrowRight, Mail } from 'lucide-react'

export default function SuccessStoriesPage() {
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

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

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterStatus('loading')
    
    setTimeout(() => {
      setNewsletterStatus('success')
      setEmail('')
      setTimeout(() => setNewsletterStatus('idle'), 3000)
    }, 1000)
  }

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
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See how YouTube creators are transforming their channels with ThumbnailTV's TV optimization technology.
            </p>
          </div>

          {/* Stories Grid */}
          <div className="grid gap-12 mb-20">
            {stories.map((story) => (
              <div key={story.id} className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Story Content */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{story.channel}</h3>
                        <p className="text-gray-400">{story.creator} • {story.niche}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-400">{story.subscribers}</p>
                        <p className="text-sm text-gray-400">subscribers</p>
                      </div>
                    </div>

                    <blockquote className="text-lg text-gray-300 italic mb-6 border-l-4 border-purple-500 pl-4">
                      "{story.quote}"
                    </blockquote>

                    <div className="bg-gray-900 rounded-lg p-4 mb-6">
                      <h4 className="text-white font-semibold mb-3">Results:</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">CTR Increase</p>
                          <p className="text-green-400 font-bold">{story.metrics.ctrIncrease}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">View Increase</p>
                          <p className="text-green-400 font-bold">{story.metrics.viewIncrease}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Revenue Increase</p>
                          <p className="text-green-400 font-bold">{story.metrics.revenueIncrease}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Timeframe</p>
                          <p className="text-white font-semibold">{story.metrics.timeframe}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-600/10 border border-purple-500/20 rounded-lg p-4">
                      <p className="text-purple-300 font-medium">{story.tagline}</p>
                    </div>
                  </div>

                  {/* Before/After */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">Before → After</h4>
                    <div className="space-y-4">
                      <div className="bg-gray-900 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-2">Click-Through Rate</p>
                        <p className="text-white font-medium">{story.beforeAfter.ctr}</p>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-2">Views per Video</p>
                        <p className="text-white font-medium">{story.beforeAfter.views}</p>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-2">Revenue per Video</p>
                        <p className="text-white font-medium">{story.beforeAfter.revenue}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center mb-20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already optimizing their thumbnails for the TV audience.
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Optimizing Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Newsletter Section */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 mb-20">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Get More Success Stories
              </h3>
              <p className="text-gray-400 mb-6">
                Subscribe to our newsletter for weekly creator success stories and optimization tips.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {newsletterStatus === 'success' && (
                <p className="mt-4 text-green-400">Successfully subscribed!</p>
              )}
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
                  <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
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
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
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