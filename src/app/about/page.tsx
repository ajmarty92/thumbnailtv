'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'
import { Users, Target, Award, Globe, Heart, Mail, MapPin, ArrowRight, Play, Check, Star, Tv } from 'lucide-react'

export default function AboutPage() {
  const { user, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [activeTab, setActiveTab] = useState('mission')

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & Founder",
      bio: "Former YouTube optimization specialist with 10+ years helping creators grow their channels.",
      avatar: "AC"
    },
    {
      name: "Sarah Martinez",
      role: "CTO",
      bio: "AI/ML expert building cutting-edge computer vision technology for thumbnail optimization.",
      avatar: "SM"
    },
    {
      name: "David Kim",
      role: "Head of Product",
      bio: "Product visionary focused on creating intuitive tools that solve real creator problems.",
      avatar: "DK"
    },
    {
      name: "Emily Johnson",
      role: "Head of Community",
      bio: "YouTube creator and community builder passionate about helping others succeed.",
      avatar: "EJ"
    }
  ]

  const milestones = [
    {
      year: "2022",
      title: "Founded",
      description: "Started with a simple mission: help creators optimize for the 73% of YouTube viewers watching on Smart TVs."
    },
    {
      year: "2023",
      title: "10,000 Creators",
      description: "Reached our first major milestone with 10,000 active creators using ThumbnailTV."
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Launched groundbreaking AI features for frame extraction and smart compression."
    },
    {
      year: "2025",
      title: "50,000+ Creators",
      description: "Now helping over 50,000 creators dominate the YouTube landscape across all devices."
    }
  ]

  const values = [
    {
      icon: Target,
      title: "Creator-First",
      description: "Every decision we make is based on what will help creators succeed and grow their channels."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "We build our products with feedback from real creators facing real challenges every day."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We're obsessed with quality and continuously innovate to provide the best optimization tools."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Helping creators worldwide reach their audience, regardless of device or location."
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
                  <Heart className="w-4 h-4 inline mr-2" />
                  Our Story
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Optimizing YouTube for the
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                {" "}Living Room
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to help YouTube creators capture the 73% of viewers watching on Smart TVs. 
              Because great content deserves to be seen, no matter the screen.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">50,000+</div>
              <div className="text-gray-300">Creators Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">73%</div>
              <div className="text-gray-300">TV Views Optimized</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">15-25%</div>
              <div className="text-gray-300">Average CTR Increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">4.9/5</div>
              <div className="text-gray-300">Customer Satisfaction</div>
            </div>
          </div>

          {/* Mission/Vision Tabs */}
          <div className="mb-20">
            <div className="flex justify-center mb-8">
              <div className="bg-gray-800 rounded-lg p-1 inline-flex">
                <button
                  onClick={() => setActiveTab('mission')}
                  className={`px-6 py-2 rounded-md transition-colors ${
                    activeTab === 'mission' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Our Mission
                </button>
                <button
                  onClick={() => setActiveTab('vision')}
                  className={`px-6 py-2 rounded-md transition-colors ${
                    activeTab === 'vision' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Our Vision
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              {activeTab === 'mission' ? (
                <div className="text-center max-w-3xl mx-auto">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Empower Every Creator to Dominate Every Screen
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    We believe that great content deserves to be discovered. With 73% of YouTube views happening on Smart TVs, 
                    we're dedicated to ensuring creators don't miss out on this massive audience. Our tools bridge the gap between 
                    creative vision and technical optimization, making TV-screen optimization accessible to everyone.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">Accessibility</h4>
                      <p className="text-gray-400 text-sm">Making professional optimization available to creators at every level</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">Innovation</h4>
                      <p className="text-gray-400 text-sm">Pushing the boundaries of what's possible with AI and computer vision</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">Community</h4>
                      <p className="text-gray-400 text-sm">Building a supportive ecosystem of creators helping creators</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center max-w-3xl mx-auto">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    A World Where Every Thumbnail Performs Perfectly on Every Screen
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    We envision a future where creators never have to worry about technical barriers getting in the way of their content being discovered. 
                    Our goal is to make TV optimization as natural and effortless as creating great content itself, ensuring that the best videos 
                    always reach their intended audience, regardless of how they're watching.
                  </p>
                  <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/10 rounded-xl p-6 border border-purple-500/20">
                    <h4 className="text-white font-semibold mb-3">By 2030, we aim to:</h4>
                    <div className="space-y-3 text-left max-w-2xl mx-auto">
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Help 1 million creators optimize their content</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Increase TV-optimized content by 500%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Set the industry standard for cross-platform optimization</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Our Journey</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">{milestone.year}</div>
                  <h3 className="text-white font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-gray-300 text-sm">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {member.avatar}
                  </div>
                  <h3 className="text-white font-bold mb-1">{member.name}</h3>
                  <p className="text-purple-400 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-8 mb-20 border border-purple-500/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Join Our Creator Community
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Get updates on our mission, new features, and tips to help you succeed on YouTube.
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

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-8 mb-20 border border-purple-500/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Want to Join Our Mission?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                We're always looking for talented people who share our passion for helping creators succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all">
                  <Mail className="w-5 h-5 inline mr-2" />
                  Contact Us
                </button>
                <Link href="/blog" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors border border-gray-700">
                  View Open Positions
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
                      <Link href="/about" className="text-purple-400 font-medium">
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