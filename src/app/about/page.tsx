'use client'
import React from 'react'
import Navigation from '@/components/Navigation'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About ThumbnailTV
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're on a mission to help YouTube creators stop losing views on TV screens and dominate the living room.
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                ThumbnailTV was born from a simple observation: 73% of YouTube views now happen on Smart TVs, 
                but most creators are still designing thumbnails exclusively for phones. We saw talented creators 
                losing thousands of views because their thumbnails looked terrible on TV screens - text was 
                cut off by UI overlays, images appeared tiny, and important details were hidden.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our founders, a team of YouTube creators and AI engineers, experienced this problem firsthand. 
                After months of research and development, we created the first comprehensive TV optimization 
                suite that shows creators exactly how their thumbnails will appear on all major TV platforms.
              </p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                To empower every YouTube creator with professional TV optimization tools, ensuring their content 
                looks stunning on every screen and reaches its full audience potential.
              </p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">The Team</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">TC</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Tech Creator</h3>
                  <p className="text-gray-400 text-sm">Founder & CEO</p>
                  <p className="text-gray-300 text-sm mt-2">10+ years YouTube experience</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">AE</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI Engineer</h3>
                  <p className="text-gray-400 text-sm">CTO</p>
                  <p className="text-gray-300 text-sm mt-2">Former Google AI researcher</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">YP</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">YouTube Pro</h3>
                  <p className="text-gray-400 text-sm">Head of Creator Success</p>
                  <p className="text-gray-300 text-sm mt-2">2M+ subscribers across channels</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-purple-500/20">
              <h2 className="text-2xl font-bold text-white mb-4">By the Numbers</h2>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">50,000+</div>
                  <div className="text-gray-300 text-sm">Creators using ThumbnailTV</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">73%</div>
                  <div className="text-gray-300 text-sm">YouTube views on TV</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">23%</div>
                  <div className="text-gray-300 text-sm">Average CTR increase</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-400 mb-2">4.9/5</div>
                  <div className="text-gray-300 text-sm">Creator satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}