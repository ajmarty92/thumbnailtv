'use client'

import React, { useState } from 'react'
import { Mail, Check, Facebook, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

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

  return (
    <footer className="bg-gray-800/50 border-t border-gray-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section - Coming Soon */}
        <div className="mb-12 text-center">
          <div className="relative inline-block">
            <h3 className="text-2xl font-bold text-white mb-4">
              Get TV Optimization Tips Weekly
            </h3>
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
              Coming Soon
            </span>
          </div>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join 10,000+ creators getting exclusive tips, case studies, and early access to new features.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
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

        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
              ThumbnailTV
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              The AI-powered TV optimization suite for YouTube creators.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-3">
              <a 
                href="https://facebook.com/thumbnailtv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-gray-300" />
              </a>
              <a 
                href="https://twitter.com/thumbnailtv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-300" />
              </a>
              <a 
                href="https://youtube.com/@thumbnailtv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-gray-300" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/#features" className="hover:text-gray-300 transition-colors">
                  TV Preview
                </a>
              </li>
              <li>
                <a href="/#pricing" className="hover:text-gray-300 transition-colors">
                  AI Compression
                </a>
              </li>
              <li>
                <a href="/#features" className="hover:text-gray-300 transition-colors">
                  Frame Upscaling
                </a>
              </li>
              <li>
                <a href="/#demo" className="hover:text-gray-300 transition-colors">
                  Platform Analysis
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/blog" className="hover:text-gray-300 transition-colors">
                  Creator Blog
                </a>
              </li>
              <li>
                <a href="/guide" className="hover:text-gray-300 transition-colors">
                  TV Optimization Guide
                </a>
              </li>
              <li>
                <a href="/success-stories" className="hover:text-gray-300 transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="/docs" className="hover:text-gray-300 transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/about" className="hover:text-gray-300 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-gray-300 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-gray-300 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          © 2024 ThumbnailTV. All rights reserved. Made with ❤️ for YouTube creators.
        </div>
      </div>
    </footer>
  )
}