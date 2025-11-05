'use client'

import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import { Mail, MessageSquare, Users, Clock } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true)
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000)
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Have questions about ThumbnailTV? We're here to help! Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
                
                {isSuccess ? (
                  <div className="bg-green-600/10 border border-green-500/20 rounded-lg p-6 text-center">
                    <Mail className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Message sent successfully!</h3>
                    <p className="text-gray-300">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="How can we help?"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        placeholder="Tell us more about your question or feedback..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Other Ways to Reach Us */}
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">Other ways to reach us</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Email Support</h3>
                      <p className="text-gray-300 mb-2">support@thumbnailtv.io</p>
                      <p className="text-gray-400 text-sm">We respond within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Hours */}
              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-purple-500/20">
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="w-8 h-8 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">Support Hours</h3>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Email:</strong> 24/7 (responses within 24 hours)</p>
                  <p><strong>Priority Support:</strong> Pro &amp; Manager plans get faster responses</p>
                </div>
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
            &amp;copy; 2024 ThumbnailTV. All rights reserved. Made with &amp;#10084;&amp;#65039; for YouTube creators.
          </div>
        </div>
      </footer>
    </div>
  )
}