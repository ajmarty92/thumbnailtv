'use client'

import { useState } from 'react'
import { Tv, Upload, Settings, ArrowRight, AlertTriangle, CheckCircle, Play } from 'lucide-react'

export default function TVOptimizationSuite() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('preview')

  const tvPlatforms = [
    { 
      name: 'Google TV', 
      size: '65"', 
      color: 'border-blue-500',
      uiColor: 'bg-blue-600/20',
      issues: ['Text too small for 8ft viewing', 'Bottom 40% covered by UI']
    },
    { 
      name: 'Samsung TV', 
      size: '75"', 
      color: 'border-purple-500',
      uiColor: 'bg-purple-600/20',
      issues: ['Top navigation overlap', 'Side menu reduces visibility']
    },
    { 
      name: 'Apple TV', 
      size: '55"', 
      color: 'border-gray-400',
      uiColor: 'bg-gray-600/20',
      issues: ['Content too centered', 'Safe zone violation on edges']
    },
    { 
      name: 'Roku', 
      size: '70"', 
      color: 'border-green-500',
      uiColor: 'bg-green-600/20',
      issues: ['Right sidebar active', 'Footer menu overlap']
    },
    { 
      name: 'Fire TV', 
      size: '60"', 
      color: 'border-orange-500',
      uiColor: 'bg-orange-600/20',
      issues: ['Top bar covers 15%', 'Bottom apps visible']
    },
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDemoImage = () => {
    setSelectedImage('https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="px-4 py-2 bg-purple-600/10 border border-purple-500/20 rounded-full">
            <span className="text-purple-400 text-sm font-semibold">🎯 Live TV Platform Testing</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          TV Optimization Suite
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          See exactly how your thumbnails appear on 5 major Smart TV platforms with real UI overlays
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-gray-700 mb-8">
        {['preview', 'compression', 'upscaling'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium capitalize transition-all duration-200 ${
              activeTab === tab
                ? 'text-purple-400 border-b-2 border-purple-400 bg-purple-600/10'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            {tab === 'preview' && <Tv className="w-4 h-4 inline mr-2" />}
            {tab === 'compression' && <Settings className="w-4 h-4 inline mr-2" />}
            {tab === 'upscaling' && <ArrowRight className="w-4 h-4 inline mr-2" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <div className="space-y-8">
          {/* Upload Section */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Test Your Thumbnail
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Upload your thumbnail or use our demo to see exactly how it looks on different Smart TV platforms
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <span className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Choose Thumbnail
                  </span>
                </label>
                <button
                  onClick={handleDemoImage}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Use Demo Image
                </button>
              </div>
            </div>
          </div>

          {/* TV Previews */}
          {selectedImage && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-white mb-2">Platform Analysis</h3>
                <p className="text-gray-400">
                  See how your thumbnail performs on each platform with AI-powered insights
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tvPlatforms.map((platform) => (
                  <div key={platform.name} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">{platform.size}</span>
                        <div className={`w-3 h-3 rounded-full ${platform.color.replace('border-', 'bg-')}`}></div>
                      </div>
                    </div>
                    
                    <div className={`aspect-video bg-gray-900 rounded-lg border-2 ${platform.color} p-2 relative overflow-hidden mb-4`}>
                      <img
                        src={selectedImage}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover rounded"
                      />
                      
                      {/* TV UI Overlay Simulation */}
                      <div className="absolute inset-0 pointer-events-none">
                        {/* Top UI Bar */}
                        <div className={`top-2 left-2 right-2 h-8 ${platform.uiColor} rounded-lg flex items-center px-3 backdrop-blur-sm`}>
                          <div className="flex-1 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-4 h-4 bg-white/20 rounded"></div>
                              <span className="text-white text-xs font-medium">Apps • Input • Settings</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-white/20 rounded"></div>
                              <div className="text-white text-xs">12:45</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom UI Navigation */}
                        <div className={`bottom-2 left-2 right-2 h-12 ${platform.uiColor} rounded-lg flex items-center px-3 backdrop-blur-sm`}>
                          <div className="flex-1 flex items-center justify-center gap-6">
                            <span className="text-white text-sm">Netflix</span>
                            <span className="text-white text-sm font-bold">YouTube</span>
                            <span className="text-white text-sm">Prime</span>
                            <span className="text-white text-sm">Disney+</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Analysis Results */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Overall Score:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="w-3/5 h-full bg-yellow-500 rounded-full"></div>
                          </div>
                          <span className="text-sm text-yellow-400 font-medium">60%</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {platform.issues.map((issue, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">{issue}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-start gap-2 pt-2 border-t border-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">Good contrast and color balance</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">🎯 AI Recommendations</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Increase Text Size</h4>
                      <p className="text-gray-400 text-sm">Text should be 30% larger to be readable from 8+ feet</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Move Content Up</h4>
                      <p className="text-gray-400 text-sm">Shift key elements 20% up to avoid bottom UI overlap</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Widen Safe Margins</h4>
                      <p className="text-gray-400 text-sm">Add 15% padding on all sides for universal compatibility</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Boost Contrast</h4>
                      <p className="text-gray-400 text-sm">Increase text contrast for better living room visibility</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Compression Tab */}
      {activeTab === 'compression' && (
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Smart Compression</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Compress your 4K thumbnails from 100MB+ to under 50MB while maintaining perfect quality
            </p>
            <button className="px-6 py-3 bg-gray-700 text-gray-400 rounded-lg font-medium cursor-not-allowed" disabled>
              Coming Soon - Demo Mode
            </button>
          </div>
        </div>
      )}

      {/* Upscaling Tab */}
      {activeTab === 'upscaling' && (
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Frame Upscaling</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Extract perfect video frames and upscale to 4K/8K with AI enhancement
            </p>
            <button className="px-6 py-3 bg-gray-700 text-gray-400 rounded-lg font-medium cursor-not-allowed" disabled>
              Coming Soon - Demo Mode
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
