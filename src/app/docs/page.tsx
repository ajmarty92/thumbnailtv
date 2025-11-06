'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'
import { Search, Code, BookOpen, Zap, Shield, Settings, ChevronRight, ExternalLink, Mail, Check, Tv } from 'lucide-react'

export default function DocsPage() {
  const { user, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState("All")

  const docCategories = ["All", "Getting Started", "API Reference", "SDKs", "Guides", "Troubleshooting"]

  const documentation = [
    {
      id: 1,
      title: "Quick Start Guide",
      category: "Getting Started",
      description: "Get up and running with ThumbnailTV in minutes. Learn the basics of TV optimization.",
      icon: Zap,
      difficulty: "Beginner",
      readTime: "5 min",
      content: "Installation, basic setup, first thumbnail optimization"
    },
    {
      id: 2,
      title: "API Authentication",
      category: "API Reference",
      description: "Learn how to authenticate with our API and manage your API keys securely.",
      icon: Shield,
      difficulty: "Intermediate",
      readTime: "10 min",
      content: "API keys, OAuth, security best practices"
    },
    {
      id: 3,
      title: "TV Platform Detection",
      category: "API Reference",
      description: "Understand how to detect and optimize for different TV platforms and their UI overlays.",
      icon: Code,
      difficulty: "Advanced",
      readTime: "15 min",
      content: "Platform detection, UI overlay analysis, safe zones"
    },
    {
      id: 4,
      title: "Frame Extraction API",
      category: "API Reference",
      description: "Extract and enhance frames from videos for thumbnail creation.",
      icon: Settings,
      difficulty: "Intermediate",
      readTime: "12 min",
      content: "Video processing, frame selection, AI enhancement"
    },
    {
      id: 5,
      title: "Webhooks Integration",
      category: "SDKs",
      description: "Set up webhooks to receive real-time notifications about your optimization jobs.",
      icon: Code,
      difficulty: "Advanced",
      readTime: "20 min",
      content: "Webhook setup, event handling, error management"
    },
    {
      id: 6,
      title: "Python SDK",
      category: "SDKs",
      description: "Complete guide to using our Python SDK for seamless integration.",
      icon: Code,
      difficulty: "Intermediate",
      readTime: "18 min",
      content: "Installation, usage examples, advanced features"
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

  const filteredDocs = documentation.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-600/20 text-green-400 border border-green-500/30"
      case "Intermediate": return "bg-yellow-600/20 text-yellow-400 border border-yellow-500/30"
      case "Advanced": return "bg-red-600/20 text-red-400 border border-red-500/30"
      default: return "bg-gray-600/20 text-gray-400 border border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="flex justify-center mb-6">
              <div className="px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full">
                <span className="text-blue-400 text-sm font-semibold">
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Developer Documentation
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Build with
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                {" "}ThumbnailTV API
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Comprehensive documentation to integrate TV optimization into your applications and workflows.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">Quick Start</h3>
              <p className="text-gray-400 text-sm mb-4">Get running in 5 minutes</p>
              <div className="flex items-center text-purple-400 text-sm">
                Start Now <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">API Reference</h3>
              <p className="text-gray-400 text-sm mb-4">Complete API documentation</p>
              <div className="flex items-center text-purple-400 text-sm">
                Explore API <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">SDKs & Tools</h3>
              <p className="text-gray-400 text-sm mb-4">Official libraries and tools</p>
              <div className="flex items-center text-purple-400 text-sm">
                Download SDKs <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-700 rounded-lg flex items-center justify-center mb-4">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">Examples</h3>
              <p className="text-gray-400 text-sm mb-4">Code samples and tutorials</p>
              <div className="flex items-center text-purple-400 text-sm">
                View Examples <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {docCategories.map((category) => (
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
          </div>

          {/* Documentation Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <doc.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(doc.difficulty)}`}>
                          {doc.difficulty}
                        </span>
                        <span className="text-gray-400 text-xs">{doc.readTime}</span>
                      </div>
                      <h3 className="text-white font-bold mb-1">{doc.title}</h3>
                      <p className="text-purple-400 text-sm mb-2">{doc.category}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {doc.description}
                  </p>
                  <p className="text-gray-400 text-xs mb-4">
                    {doc.content}
                  </p>
                  <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors">
                    Read Documentation
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* API Key Section */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 mb-20 border border-blue-500/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Start Building?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Get your API key and start integrating TV optimization into your applications today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all">
                  Get API Key
                </button>
                <Link href="/blog" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors border border-gray-700">
                  View on GitHub
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-8 mb-20 border border-purple-500/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Get Developer Updates
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join 5,000+ developers getting API updates, new features, and integration tips.
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
                      <Link href="/guide" className="hover:text-gray-300 transition-colors">
                        TV Optimization Guide
                      </Link>
                    </li>
                    <li>
                      <Link href="/success-stories" className="hover:text-gray-300 transition-colors">
                        Success Stories
                      </Link>
                    </li>
                    <li>
                      <Link href="/docs" className="text-purple-400 font-medium">
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