'use client'
import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import { Check, AlertTriangle, Tv, Zap, TrendingUp, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'

export default function GuidePage() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  const steps = [
    {
      id: 1,
      title: "Test Your Current Thumbnails",
      description: "See how your existing thumbnails look on TV screens",
      icon: <Tv className="w-6 h-6" />,
      color: "blue",
      details: [
        "Upload your current thumbnail to ThumbnailTV",
        "Select all 5 TV platforms (Google TV, Roku, Samsung, Apple TV, Fire TV)",
        "Check for text overlap, image visibility, and overall impact",
        "Note which platforms show the most issues"
      ],
      tips: "Most creators find their text is 40-60% covered on TV UI overlays"
    },
    {
      id: 2,
      title: "Identify TV-Specific Issues",
      description: "Learn what makes thumbnails fail on TV screens",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "yellow",
      details: [
        "Text too small or placed in danger zones",
        "Important elements hidden by TV UI overlays",
        "Poor contrast on larger screens",
        "Images that don't scale well to 4K resolution",
        "Brand elements that are hard to recognize from 8-16 feet away"
      ],
      tips: "The most common issue is text in the bottom 30% of the thumbnail"
    },
    {
      id: 3,
      title: "Redesign for TV Viewing",
      description: "Create TV-optimized versions of your thumbnails",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "green",
      details: [
        "Move critical text to the top 70% of the thumbnail",
        "Increase font sizes by 20-30% for TV readability",
        "Use high-contrast colors for better visibility",
        "Ensure main subject is centered and clearly visible",
        "Test with TV-safe color palettes"
      ],
      tips: "Center your main subject and keep text in the upper third when possible"
    },
    {
      id: 4,
      title: "Optimize File Size and Quality",
      description: "Compress without losing visual quality",
      icon: <Zap className="w-6 h-6" />,
      color: "purple",
      details: [
        "Use AI Smart Compression to reduce file size",
        "Target under 50MB for YouTube compliance",
        "Maintain 4K resolution for TV quality",
        "Test compression settings on different content types",
        "Batch process multiple thumbnails for efficiency"
      ],
      tips: "AI compression can reduce 100MB+ files to under 50MB with no visible quality loss"
    },
    {
      id: 5,
      title: "Validate Across All Platforms",
      description: "Ensure your thumbnail works everywhere",
      icon: <Check className="w-6 h-6" />,
      color: "pink",
      details: [
        "Final check on all 5 major TV platforms",
        "Verify mobile viewing still looks good",
        "Test different screen sizes (55&quot; to 100&quot;)",
        "Check various viewing distances (8-16 feet)",
        "Get feedback from team members or friends"
      ],
      tips: "A thumbnail that looks great on Google TV usually works well on other platforms too"
    }
  ]

  const colorClasses = {
    blue: "border-blue-500/20 bg-blue-600/10",
    yellow: "border-yellow-500/20 bg-yellow-600/10", 
    green: "border-green-500/20 bg-green-600/10",
    purple: "border-purple-500/20 bg-purple-600/10",
    pink: "border-pink-500/20 bg-pink-600/10"
  }

  const iconColors = {
    blue: "text-blue-400",
    yellow: "text-yellow-400",
    green: "text-green-400", 
    purple: "text-purple-400",
    pink: "text-pink-400"
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Complete TV Optimization Guide
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Follow our 5-step process to transform your thumbnails from phone-perfect to TV-stunning. 
              Used by 50,000+ creators to increase their CTR by 15-25%.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">73%</div>
              <div className="text-gray-400 text-sm">YouTube views on TV</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">15-25%</div>
              <div className="text-gray-400 text-sm">Average CTR increase</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">5</div>
              <div className="text-gray-400 text-sm">Major TV platforms</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-pink-400 mb-2">30 min</div>
              <div className="text-gray-400 text-sm">Average optimization time</div>
            </div>
          </div>

          {/* Step by Step Guide */}
          <div className="space-y-6 mb-12">
            {steps.map((step, index) => (
              <div key={step.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <button
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-400">{index + 1}</span>
                    </div>
                    <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                      <div className={iconColors[step.color as keyof typeof iconColors]}>
                        {step.icon}
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${
                      expandedStep === step.id ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {expandedStep === step.id && (
                  <div className="px-8 pb-6 border-t border-gray-700">
                    <div className={`rounded-lg p-6 ${colorClasses[step.color as keyof typeof colorClasses]} border`}>
                      <h4 className="text-lg font-semibold text-white mb-4">Step Details:</h4>
                      <ul className="space-y-3 mb-6">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                            <span className="text-gray-200">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-400" />
                          <h5 className="font-semibold text-white">Pro Tip:</h5>
                        </div>
                        <p className="text-gray-200 text-sm">{step.tips}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Common Mistakes */}
          <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-2xl p-8 border border-red-500/20 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              🚨 Common TV Optimization Mistakes to Avoid
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Text in Danger Zones</h4>
                    <p className="text-gray-300 text-sm">Putting important text in areas covered by TV UI overlays</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Poor Font Contrast</h4>
                    <p className="text-gray-300 text-sm">Using colors that don't stand out on larger screens</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Cluttered Composition</h4>
                    <p className="text-gray-300 text-sm">Too many elements that become indistinguishable from a distance</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Wrong Aspect Ratio</h4>
                    <p className="text-gray-300 text-sm">Not optimizing for 16:9 format used by most TVs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Small File Size, Poor Quality</h4>
                    <p className="text-gray-300 text-sm">Over-compressing and losing detail on 4K screens</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Ignoring Platform Differences</h4>
                    <p className="text-gray-300 text-sm">Not testing on all major TV platforms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-2xl p-8 border border-green-500/20 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              📊 Measure Your TV Optimization Success
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-white mb-4">CTR Improvement</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Before:</span>
                    <span className="text-red-400">2-4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">After:</span>
                    <span className="text-green-400">3-5%</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-white">Improvement:</span>
                    <span className="text-green-400">+15-25%</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-white mb-4">Watch Time Increase</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Before:</span>
                    <span className="text-red-400">3-5 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">After:</span>
                    <span className="text-green-400">4-7 min</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-white">Improvement:</span>
                    <span className="text-green-400">+20-40%</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-white mb-4">File Size Reduction</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Before:</span>
                    <span className="text-red-400">100MB+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">After:</span>
                    <span className="text-green-400">&lt;50MB</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-white">Reduction:</span>
                    <span className="text-green-400">50-70%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-purple-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Optimize Your Thumbnails for TV?
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Start with our free trial and see the difference in your first video.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Start TV Optimization
                </button>
                <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-lg font-semibold transition-colors border border-gray-700 flex items-center justify-center gap-2">
                  <ArrowRight className="w-5 h-5" />
                  Try Demo First
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-6">
                No credit card required • 7-day free trial • 15-25% higher CTR guaranteed*
              </p>
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
            &copy; 2024 ThumbnailTV. All rights reserved. Made with ❤️ for YouTube creators.
          </div>
        </div>
      </footer>
    </div>
  )
}
