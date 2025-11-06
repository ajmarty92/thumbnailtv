'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'
import { Mail, Phone, MapPin, Send, MessageSquare, Users, Clock, Check, Tv, ArrowRight } from 'lucide-react'

export default function ContactPage() {
  const { user, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'support'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactOptions = [
    {
      icon: MessageSquare,
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      availability: "Mon-Fri, 9AM-6PM EST",
      action: "Start Chat",
      isRecommended: false
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions and feedback",
      availability: "Response within 24 hours",
      action: "Send Email",
      isRecommended: true
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other creators and share tips",
      availability: "Always available",
      action: "Join Community",
      isRecommended: false
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          type: 'support'
        })
      }, 3000)
    }, 1500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <main className="pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <Link href="/" className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
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
                  <Mail className="w-4 h-4 inline mr-2" />
                  Get in Touch
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              We're Here to
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                {" "}Help
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Have questions about ThumbnailTV? Need support? Want to share feedback? 
              Our team is ready to assist you on your YouTube optimization journey.
            </p>
          </div>

          {/* Quick Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {contactOptions.map((option, index) => (
              <div key={index} className={`bg-gray-800 rounded-xl p-6 border ${
                option.isRecommended ? 'border-purple-500' : 'border-gray-700'
              } hover:border-gray-600 transition-all relative`}>
                {option.isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-3 py-1 bg-purple-600 rounded-full text-white text-xs font-semibold">
                      RECOMMENDED
                    </span>
                  </div>
                )}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold mb-2">{option.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{option.description}</p>
                <div className="flex items-center text-gray-400 text-xs mb-4">
                  <Clock className="w-3 h-3 mr-1" />
                  {option.availability}
                </div>
                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
                  {option.action}
                </button>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    What can we help you with?
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing & Account</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                    placeholder="Tell us more about your question or feedback..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 inline mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Other Ways to Reach Us</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white font-semibold">Email Us</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    For general inquiries and support
                  </p>
                  <a href="mailto:support@thumbnailtv.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                    support@thumbnailtv.com
                  </a>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white font-semibold">Live Chat</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Available Monday - Friday, 9AM - 6PM EST
                  </p>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                    Start Chat Conversation
                  </button>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white font-semibold">Community</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Join our creator community
                  </p>
                  <div className="space-y-2">
                    <a href="#" className="block text-green-400 hover:text-green-300 transition-colors">
                      Discord Server
                    </a>
                    <a href="#" className="block text-green-400 hover:text-green-300 transition-colors">
                      Facebook Group
                    </a>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="mt-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-white font-semibold mb-3">Quick Answers</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Find instant answers to common questions in our comprehensive FAQ.
                </p>
                <Link href="/guide" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors font-medium">
                  View FAQ <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Response Times */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 mb-20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Expected Response Times</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">&lt; 2 Hours</div>
                <div className="text-gray-300">Live Chat</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">&lt; 24 Hours</div>
                <div className="text-gray-300">Email Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">Immediate</div>
                <div className="text-gray-300">Community Forum</div>
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
                      <Link href="/contact" className="text-purple-400 font-medium">
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