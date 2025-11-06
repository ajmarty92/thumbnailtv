'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'
import { Tv, Zap, Check, Star, ArrowRight, Search, Mail, Play } from 'lucide-react'

export default function BlogPage() {
  const { user, isLoading } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  
  const blogPosts = [
    {
      id: 1,
      title: "How TV Optimization Increased Our Channel's CTR by 23%",
      excerpt: "A deep dive into the data behind TV screen optimization and how it transformed a tech review channel's performance.",
      date: "Nov 15, 2024",
      readTime: "8 min read",
      category: "Success Stories"
    },
    {
      id: 2,
      title: "The Ultimate Guide to YouTube Thumbnail Best Practices for 2024",
      excerpt: "Everything you need to know about creating thumbnails that perform well across all devices, especially Smart TVs.",
      date: "Nov 10, 2024",
      readTime: "12 min read",
      category: "Guides"
    },
    {
      id: 3,
      title: "Understanding YouTube's Algorithm: Why TV Views Matter",
      excerpt: "Learn why 73% of YouTube views happen on Smart TVs and how to optimize your content for this growing audience.",
      date: "Nov 5, 2024",
      readTime: "6 min read",
      category: "Analytics"
    },
    {
      id: 4,
      title: "Frame-to-Thumbnail: Extracting Perfect Moments from Your Videos",
      excerpt: "Master the art of identifying and extracting the perfect frames from your videos to create compelling thumbnails.",
      date: "Oct 28, 2024",
      readTime: "10 min read",
      category: "Tutorials"
    }
  ]

  const categories = ["All", "Success Stories", "Guides", "Analytics", "Tutorials"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setNewsletterStatus('success')
      setEmail('')
      setTimeout(() => setNewsletterStatus('idle'), 3000)
    }, 1000)
  }

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
                  <Tv className="w-4 h-4 inline mr-2" />
                  Creator Resources
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Master YouTube
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                {" "}Optimization
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Expert insights, tutorials, and success stories to help you dominate YouTube thumbnails across all devices.
            </p>
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

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
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
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-400 text-sm">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3 hover:text-purple-400 transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{post.date}</span>
                    <button className="text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-2">
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Enhanced Footer with Newsletter */}
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
                      <Link href="/blog" className="text-purple-400 font-medium">
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