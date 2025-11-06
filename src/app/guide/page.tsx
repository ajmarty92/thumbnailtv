'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'
import { Check, Star, ArrowRight, Play, BookOpen, Zap, Shield, Tv, Target, Mail } from 'lucide-react'

export default function GuidePage() {
  const { user, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [expandedSection, setExpandedSection] = useState<number | null>(null)

  const guideSections = [
    {
      id: 1,
      title: "Understanding TV Optimization",
      icon: Tv,
      content: "Learn why 73% of YouTube views happen on Smart TVs and how to optimize your thumbnails for the living room experience.",
      topics: [
        "TV Safe Zones and UI Overlays",
        "Viewing Distance Considerations (8-16 feet)",
        "Color Contrast for Large Screens",
        "Text Readability on 4K Displays"
      ]
    },
    {
      id: 2,
      title: "Thumbnail Design Fundamentals",
      icon: Zap,
      content: "Master the core principles of creating thumbnails that capture attention and drive clicks across all devices.",
      topics: [
        "Psychology of Click-Through Rates",
        "Color Theory for Video Thumbnails",
        "Typography Best Practices",
        "Image Composition Techniques"
      ]
    },
    {
      id: 3,
      title: "Advanced Optimization Techniques",
      icon: Shield,
      content: "Take your thumbnail game to the next level with professional strategies used by top creators.",
      topics: [
        "A/B Testing Methodology",
        "Brand Consistency Across Thumbnails",
        "Emotional Triggers in Visual Design",
        "Competitive Analysis Strategies"
      ]
    }
  ]

  const quickTips = [
    {
      title: "Always Test on Multiple TV Platforms",
      description: "Your thumbnail might look great on Google TV but get obscured on Samsung's UI. Test across all major platforms.",
      impact: "High"
    },
    {
      title: "Keep Text Above the Bottom 20%",
      description: "Most TV UIs overlap the bottom portion of the screen. Keep your most important text and elements visible.",
      impact: "Critical"
    },
    {
      title: "Use High Contrast Colors",
      description: "TV screens are viewed from farther away. Ensure your elements stand out with strong color contrast.",
      impact: "High"
    },
    {
      title: "Consider Ambient Lighting",
      description: "Living rooms have varying lighting conditions. Test your thumbnails in both bright and dim environments.",
      impact: "Medium"
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
              <div className="px-4 py-2 bg-purple-600/10 border border-purple-500/20 rounded-full">
                <span className="text-purple-400 text-sm font-semibold">
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Complete Guide
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Master YouTube
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                {" "}Thumbnail Optimization
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Everything you need to know to create thumbnails that perform exceptionally well across all devices, especially Smart TVs.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
              <div className="text-2xl font-bold text-purple-400 mb-2">73%</div>
              <div className="text-gray-400 text-sm">YouTube views on Smart TVs</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
              <div className="text-2xl font-bold text-green-400 mb-2">15-25%</div>
              <div className="text-gray-400 text-sm">Higher CTR with optimization</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
              <div className="text-2xl font-bold text-blue-400 mb-2">5</div>
              <div className="text-gray-400 text-sm">Major TV platforms to test</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
              <div className="text-2xl font-bold text-pink-400 mb-2">8-16ft</div>
              <div className="text-gray-400 text-sm">Typical viewing distance</div>
            </div>
          </div>

          {/* Guide Sections */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Comprehensive Learning Path
            </h2>
            <div className="space-y-6">
              {guideSections.map((section) => (
                <div key={section.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-white">{section.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{section.content}</p>
                      </div>
                    </div>
                    <div className={`transform transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`}>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                  {expandedSection === section.id && (
                    <div className="px-8 pb-6 border-t border-gray-700">
                      <div className="pt-4">
                        <h4 className="text-white font-semibold mb-4">What you'll learn:</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {section.topics.map((topic, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{topic}</span>
                            </div>
                          ))}
                        </div>
                        <button className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                          Start Learning
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Quick Wins: Tips You Can Apply Today
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {quickTips.map((tip, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start gap-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tip.impact === 'Critical' ? 'bg-red-600/20 text-red-400 border border-red-500/30' :
                      tip.impact === 'High' ? 'bg-orange-600/20 text-orange-400 border border-orange-500/30' :
                      'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {tip.impact} Impact
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 mt-4">{tip.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-8 mb-20 border border-purple-500/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Optimize Your Thumbnails?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Put these techniques into practice with ThumbnailTV's AI-powered optimization tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all">
                  <Play className="w-5 h-5 inline mr-2" />
                  Try Free Demo
                </button>
                <Link href="/blog" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors border border-gray-700">
                  Read More Tips
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-8 mb-20 border border-purple-500/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Get TV Optimization Tips Weekly
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join 10,000+ creators getting exclusive tips, case studies, and early access to new features.
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
                      <Link href="/guide" className="text-purple-400 font-medium">
                        TV Optimization Guide
                      </Link>
                    </li>
                    <li>
                      <Link href="/success-stories" className="hover:text-gray-300 transition-colors">
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