'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'
import { Star, TrendingUp, Play, ArrowRight, Quote, Tv, Mail, Check } from 'lucide-react'

export default function SuccessStoriesPage() {
  const { user, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [selectedCategory, setSelectedCategory] = useState("All")
  
  const categories = ["All", "Tech Review", "Gaming", "Education", "Vlog", "Business"]
  
  const successStories = [
    {
      id: 1,
      channelName: "TechGear Reviews",
      category: "Tech Review",
      subscribers: "2.5M",
      thumbnail: "🎮",
      quote: "My thumbnails looked amazing on my phone but terrible on my Samsung TV. ThumbnailTV showed me exactly what was wrong and fixed it.",
      results: {
        ctrIncrease: "+23%",
        viewsGained: "+450K monthly",
        roi: "15x"
      },
      beforeAfter: {
        before: "Text covered by TV UI, low contrast colors",
        after: "TV-safe text placement, high contrast design"
      },
      story: "Sarah Chen was struggling with declining click-through rates despite putting hours into thumbnail design. She discovered that 73% of her views came from Smart TVs, but her thumbnails were optimized for mobile screens."
    },
    {
      id: 2,
      channelName: "GameMaster Pro",
      category: "Gaming",
      subscribers: "1.8M",
      thumbnail: "🎯",
      quote: "I was losing so many views because my thumbnails had text covered by TV UI. The AI analysis helped me redesign everything.",
      results: {
        ctrIncrease: "+18%",
        viewsGained: "+320K monthly",
        roi: "12x"
      },
      beforeAfter: {
        before: "Bottom text obscured by streaming overlay",
        after: "Elevated text positioning, optimized contrast"
      },
      story: "Mike Rodriguez noticed his gaming videos weren't performing as well as similar channels. After using ThumbnailTV's TV preview, he realized his call-to-action text was completely invisible on most Smart TV interfaces."
    },
    {
      id: 3,
      channelName: "Science Simplified",
      category: "Education",
      subscribers: "950K",
      thumbnail: "🔬",
      quote: "The frame upscaling feature alone is worth it. I can now use perfect moments from my videos as thumbnails.",
      results: {
        ctrIncrease: "+31%",
        viewsGained: "+180K monthly",
        roi: "20x"
      },
      beforeAfter: {
        before: "Low-quality screenshots, poor text readability",
        after: "AI-enhanced frames, crystal-clear text"
      },
      story: "Dr. Emily Watson spent hours trying to capture the perfect frames from her science experiments. With ThumbnailTV's frame extraction and upscaling, she now creates professional thumbnails in minutes."
    },
    {
      id: 4,
      channelName: "Lifestyle Daily",
      category: "Vlog",
      subscribers: "750K",
      thumbnail: "🌟",
      quote: "Our channel grew 40% faster after implementing TV optimization. The living room audience is massive!",
      results: {
        ctrIncrease: "+27%",
        viewsGained: "+150K monthly",
        roi: "18x"
      },
      beforeAfter: {
        before: "Inconsistent branding, poor TV visibility",
        after: "Consistent TV-optimized branding"
      },
      story: "Jessica and Tom's lifestyle channel was plateauing until they discovered the importance of TV optimization. Now their thumbnails consistently perform across all devices."
    },
    {
      id: 5,
      channelName: "Business Builders",
      category: "Business",
      subscribers: "1.2M",
      thumbnail: "💼",
      quote: "ThumbnailTV transformed our YouTube strategy. We're now reaching decision-makers who watch on their office TVs.",
      results: {
        ctrIncrease: "+22%",
        viewsGained: "+280K monthly",
        roi: "16x"
      },
      beforeAfter: {
        before: "Mobile-first design, corporate audience missed",
        after: "Multi-platform optimized, professional appeal"
      },
      story: "Alex Thompson's business content wasn't reaching his target audience. After optimizing for TV viewing, he saw a significant increase in engagement from professionals watching on office displays."
    },
    {
      id: 6,
      channelName: "Cooking Masterclass",
      category: "Education",
      subscribers: "600K",
      thumbnail: "👨‍🍳",
      quote: "The ROI calculator convinced us to try it. Best decision we've made for our channel growth.",
      results: {
        ctrIncrease: "+25%",
        viewsGained: "+120K monthly",
        roi: "14x"
      },
      beforeAfter: {
        before: "Food details lost on large screens",
        after: "Optimized for TV viewing, appetizing details"
      },
      story: "Chef Carlos Martinez learned that cooking shows are often watched on kitchen TVs. ThumbnailTV helped him optimize his food photography for larger screens."
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

  const filteredStories = selectedCategory === "All" 
    ? successStories 
    : successStories.filter(story => story.category === selectedCategory)

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
                  <TrendingUp className="w-4 h-4 inline mr-2" />
                  Real Success Stories
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              How Creators Are Winning with
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                {" "}TV Optimization
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              See real results from YouTube creators who transformed their channels with ThumbnailTV's optimization tools.
            </p>
          </div>

          {/* Overall Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            <div className="bg-gradient-to-br from-green-900/20 to-green-900/10 rounded-xl p-6 text-center border border-green-500/20">
              <div className="text-3xl font-bold text-green-400 mb-2">50,000+</div>
              <div className="text-gray-300">Creators using ThumbnailTV</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 rounded-xl p-6 text-center border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-400 mb-2">+23%</div>
              <div className="text-gray-300">Average CTR increase</div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/20 to-purple-900/10 rounded-xl p-6 text-center border border-purple-500/20">
              <div className="text-3xl font-bold text-purple-400 mb-2">15x</div>
              <div className="text-gray-300">Average ROI</div>
            </div>
            <div className="bg-gradient-to-br from-pink-900/20 to-pink-900/10 rounded-xl p-6 text-center border border-pink-500/20">
              <div className="text-3xl font-bold text-pink-400 mb-2">4.9/5</div>
              <div className="text-gray-300">Creator satisfaction</div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-20">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Success Stories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredStories.map((story) => (
              <div key={story.id} className="bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all">
                <div className="p-8">
                  {/* Channel Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-2xl">
                      {story.thumbnail}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{story.channelName}</h3>
                      <p className="text-gray-400 text-sm">{story.subscribers} subscribers • {story.category}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="mb-6">
                    <Quote className="w-6 h-6 text-purple-400 mb-2" />
                    <p className="text-gray-300 italic leading-relaxed">"{story.quote}"</p>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3 bg-green-600/10 rounded-lg border border-green-500/20">
                      <div className="text-lg font-bold text-green-400">{story.results.ctrIncrease}</div>
                      <div className="text-xs text-gray-400">CTR</div>
                    </div>
                    <div className="text-center p-3 bg-blue-600/10 rounded-lg border border-blue-500/20">
                      <div className="text-lg font-bold text-blue-400">{story.results.viewsGained}</div>
                      <div className="text-xs text-gray-400">Views</div>
                    </div>
                    <div className="text-center p-3 bg-purple-600/10 rounded-lg border border-purple-500/20">
                      <div className="text-lg font-bold text-purple-400">{story.results.roi}</div>
                      <div className="text-xs text-gray-400">ROI</div>
                    </div>
                  </div>

                  {/* Before/After */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Transformation:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-gray-400 text-sm">Before: {story.beforeAfter.before}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-400 text-sm">After: {story.beforeAfter.after}</span>
                      </div>
                    </div>
                  </div>

                  {/* Story Preview */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {story.story}
                  </p>

                  {/* CTA */}
                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all">
                    Read Full Story
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-8 mb-20 border border-purple-500/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Get Success Stories Weekly
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join 10,000+ creators getting exclusive case studies, optimization tips, and early access to new features.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {newsletterStatus === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Subscribing...
                    </>
                  ) : newsletterStatus === 'success' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Subscribe
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-900/20 to-green-900/10 rounded-2xl p-8 mb-20 border border-green-500/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Write Your Success Story?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join thousands of creators who are already seeing massive results with TV optimization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all">
                  <Play className="w-5 h-5 inline mr-2" />
                  Start Your Success Story
                </button>
                <Link href="/blog" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors border border-gray-700">
                  More Success Tips
                </Link>
              </div>
            </div>
          </div>

          {/* Enhanced Footer */}
          <footer className="bg-gray-800/50 border-t border-gray-700 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
                    ThumbnailTV
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    The AI-powered TV optimization suite for YouTube creators.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Features</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>
                      <Link href="/#features" className="hover:text-gray-300 transition-colors">
                        TV Preview
                      </Link>
                    </li>
                    <li>
                      <Link href="/#pricing" className="hover:text-gray-300 transition-colors">
                        AI Compression
                      </Link>
                    </li>
                    <li>
                      <Link href="/#features" className="hover:text-gray-300 transition-colors">
                        Frame Upscaling
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Resources</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>
                      <Link href="/blog" className="hover:text-gray-300 transition-colors">
                        Creator Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/guide" className="hover:text-gray-300 transition-colors">
                        TV Optimization Guide
                      </Link>
                    </li>
                    <li>
                      <Link href="/success-stories" className="text-purple-400 font-medium">
                        Success Stories
                      </Link>
                    </li>
                    <li>
                      <Link href="/docs" className="hover:text-gray-300 transition-colors">
                        API Documentation
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>
                      <Link href="/about" className="hover:text-gray-300 transition-colors">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-gray-300 transition-colors">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="hover:text-gray-300 transition-colors">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="hover:text-gray-300 transition-colors">
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
      </main>
    </div>
  )
}