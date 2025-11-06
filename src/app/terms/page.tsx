'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'
import { FileText, Scale, AlertTriangle, ChevronDown, ChevronUp, Mail, Check, Tv } from 'lucide-react'

export default function TermsPage() {
  const { user, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [expandedSections, setExpandedSections] = useState<number[]>([])

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterStatus('loading')
    
    setTimeout(() => {
      setNewsletterStatus('success')
      setEmail('')
      setTimeout(() => setNewsletterStatus('idle'), 3000)
    }, 1000)
  }

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const termsSections = [
    {
      title: "Acceptance of Terms",
      icon: FileText,
      content: "By accessing and using ThumbnailTV, you accept and agree to be bound by the terms and provision of this agreement."
    },
    {
      title: "Use License",
      icon: Scale,
      content: "Permission is granted to temporarily use ThumbnailTV for personal, non-commercial transitory viewing only."
    },
    {
      title: "Disclaimer",
      icon: AlertTriangle,
      content: "The information on this website is provided on an as-is basis. To the fullest extent permitted by law, this Company disclaims all warranties."
    },
    {
      title: "Limitations",
      icon: Scale,
      content: "In no event shall this Company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit)."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="flex justify-center mb-6">
              <div className="px-4 py-2 bg-orange-600/10 border border-orange-500/20 rounded-full">
                <span className="text-orange-400 text-sm font-semibold">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Terms of Service
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Terms of
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                {" "}Service
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Last updated: November 5, 2024
            </p>
          </div>

          {/* Agreement Notice */}
          <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-2xl p-8 border border-orange-500/20 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Important Notice</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              By accessing and using ThumbnailTV, you accept and agree to be bound by the terms and provision of this agreement. 
              These Terms of Service govern your use of our website, services, and applications.
            </p>
            <p className="text-gray-300 leading-relaxed">
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-6 mb-12">
            {termsSections.map((section, index) => (
              <div key={index} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                      <section.icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-white font-semibold">{section.title}</h3>
                  </div>
                  {expandedSections.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedSections.includes(index) && (
                  <div className="px-6 pb-4 border-t border-gray-700">
                    <p className="text-gray-300 pt-4">{section.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-8 mb-12 border border-purple-500/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Updated on Terms
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Get notified about important updates to our terms and service agreements.
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

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-2xl p-8 border border-orange-500/20 mb-12">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Questions About Our Terms?</h3>
            <p className="text-gray-300 mb-6 text-center">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="text-center">
              <p className="text-gray-300 mb-2">
                <strong>Email:</strong> legal@thumbnailtv.com
              </p>
              <p className="text-gray-300">
                <strong>Website:</strong> <a href="https://thumbnailtv.com" className="text-orange-400 hover:text-orange-300">thumbnailtv.com</a>
              </p>
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
                      <Link href="/terms" className="text-purple-400 font-medium">
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