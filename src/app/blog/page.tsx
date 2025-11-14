'use client'
import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import { Calendar, Clock, User, ArrowRight, Search, Filter } from 'lucide-react'

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to TV Thumbnail Optimization",
      excerpt: "Learn everything you need to know about optimizing thumbnails for Smart TV viewing. From UI overlays to color contrast, we cover it all.",
      author: "Sarah Chen",
      date: "November 1, 2024",
      readTime: "8 min read",
      category: "Optimization",
      image: "/blog/tv-optimization-guide.jpg"
    },
    {
      id: 2,
      title: "How We Analyzed 100,000+ YouTube Thumbnails for TV Performance",
      excerpt: "Deep dive into our research analyzing how different thumbnail designs perform on TV screens versus mobile devices.",
      author: "Mike Rodriguez",
      date: "October 28, 2024",
      readTime: "12 min read",
      category: "Research",
      image: "/blog/thumbnail-analysis.jpg"
    },
    {
      id: 3,
      title: "AI Upscaling: Making 1080p Thumbnails Look Amazing on 4K TVs",
      excerpt: "Discover how AI upscaling technology can transform your existing thumbnails into stunning 4K masterpieces.",
      author: "Emma Kim",
      date: "October 21, 2024",
      readTime: "6 min read",
      category: "AI Technology",
      image: "/blog/ai-upscaling.jpg"
    },
    {
      id: 4,
      title: "Case Study: How Gaming Channels Increased CTR by 35% with TV Optimization",
      excerpt: "Real-world results from gaming creators who implemented TV-optimized thumbnails and saw massive engagement gains.",
      author: "Tech Creator",
      date: "October 15, 2024",
      readTime: "10 min read",
      category: "Case Studies",
      image: "/blog/gaming-case-study.jpg"
    },
    {
      id: 5,
      title: "The Psychology of TV Viewing: Why Your Thumbnails Need Different Design",
      excerpt: "Understanding how people view content on TV screens versus mobile devices can revolutionize your thumbnail strategy.",
      author: "Dr. Alex Thompson",
      date: "October 8, 2024",
      readTime: "9 min read",
      category: "Psychology",
      image: "/blog/tv-psychology.jpg"
    },
    {
      id: 6,
      title: "Compression Without Quality Loss: Our AI-Powered Solution",
      excerpt: "Technical deep-dive into how we compress 4K thumbnails from 100MB+ to under 50MB while maintaining visual quality.",
      author: "AI Engineer",
      date: "October 1, 2024",
      readTime: "15 min read",
      category: "Technical",
      image: "/blog/compression-tech.jpg"
    }
  ]

  const categories = ['all', 'Optimization', 'Research', 'AI Technology', 'Case Studies', 'Psychology', 'Technical']

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Creator Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tips, strategies, and insights to help you master TV optimization and grow your YouTube channel.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Featured Post */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-8 border border-purple-500/20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full mb-4">
                    Featured
                  </span>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    The Ultimate Guide to TV Thumbnail Optimization
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Learn everything you need to know about optimizing thumbnails for Smart TV viewing. 
                    From UI overlays to color contrast, we cover it all.
                  </p>
                  <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>Sarah Chen</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Nov 1, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>8 min read</span>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all font-semibold">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-gray-700 rounded-xl h-64 flex items-center justify-center">
                  <span className="text-gray-400">Featured Image</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredPosts.map(post => (
              <article key={post.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all">
                <div className="bg-gray-700 h-48 flex items-center justify-center">
                  <span className="text-gray-400">Article Image</span>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-sm font-semibold rounded-full mb-4">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium">
                    Read More
                  </button>
                </div>
              </article>
            ))}
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
                  <a href="/guide" className="text-gray-400 hover:text-white transition-colors">
                    Guide
                  </a>
                </li>
                <li>
                  <a href="/success-stories" className="text-gray-400 hover:text-white transition-colors">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="/docs" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            &copy; 2024 ThumbnailTV. All rights reserved. Made with ❤️ for YouTube creators.
          </div>
        </div>
      </footer>
    </div>
  )
}
