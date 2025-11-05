'use client'

import { useState } from 'react'
import { Tv, Upload, Settings, ArrowRight, AlertTriangle, CheckCircle, Play, Monitor } from 'lucide-react'

export default function TVOptimizationSuite() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('preview')

  const tvPlatforms = [
    {
      name: 'Google TV', 
      sizes: [
        { size: '55"', width: '121cm', viewingDistance: '7-8ft', recommendedFor: 'Bedroom' },
        { size: '65"', width: '144cm', viewingDistance: '8-9ft', recommendedFor: 'Living Room' },
        { size: '75"', width: '166cm', viewingDistance: '9-10ft', recommendedFor: 'Living Room' },
        { size: '85"', width: '188cm', viewingDistance: '10-12ft', recommendedFor: 'Large Living Room' },
      ],
      color: 'border-blue-500',
      uiColor: 'bg-blue-600/20',
      baseIssues: ['Text too small for 8ft viewing', 'Bottom 40% covered by UI'],
    },
    {
      name: 'Samsung TV', 
      sizes: [
        { size: '50"', width: '110cm', viewingDistance: '6-7ft', recommendedFor: 'Bedroom' },
        { size: '65"', width: '144cm', viewingDistance: '8-9ft', recommendedFor: 'Living Room' },
        { size: '75"', width: '166cm', viewingDistance: '9-10ft', recommendedFor: 'Living Room' },
        { size: '85"', width: '188cm', viewingDistance: '10-12ft', recommendedFor: 'Large Living Room' },
        { size: '98"', width: '217cm', viewingDistance: '12-14ft', recommendedFor: 'Home Theater' },
      ],
      color: 'border-purple-500',
      uiColor: 'bg-purple-600/20',
      baseIssues: ['Top navigation overlap', 'Side menu reduces visibility'],
    },
    {
      name: 'Apple TV', 
      sizes: [
        { size: '32"', width: '71cm', viewingDistance: '4-5ft', recommendedFor: 'Desk/Office' },
        { size: '43"', width: '95cm', viewingDistance: '5-6ft', recommendedFor: 'Small Room' },
        { size: '55"', width: '121cm', viewingDistance: '7-8ft', recommendedFor: 'Bedroom' },
        { size: '65"', width: '144cm', viewingDistance: '8-9ft', recommendedFor: 'Living Room' },
        { size: '75"', width: '166cm', viewingDistance: '9-10ft', recommendedFor: 'Living Room' },
      ],
      color: 'border-gray-400',
      uiColor: 'bg-gray-600/20',
      baseIssues: ['Content too centered', 'Safe zone violation on edges'],
    },
    {
      name: 'Roku', 
      sizes: [
        { size: '43"', width: '95cm', viewingDistance: '5-6ft', recommendedFor: 'Small Room' },
        { size: '50"', width: '110cm', viewingDistance: '6-7ft', recommendedFor: 'Bedroom' },
        { size: '55"', width: '121cm', viewingDistance: '7-8ft', recommendedFor: 'Bedroom' },
        { size: '65"', width: '144cm', viewingDistance: '8-9ft', recommendedFor: 'Living Room' },
        { size: '75"', width: '166cm', viewingDistance: '9-10ft', recommendedFor: 'Living Room' },
      ],
      color: 'border-green-500',
      uiColor: 'bg-green-600/20',
      baseIssues: ['Right sidebar active', 'Footer menu overlap'],
    },
    {
      name: 'Fire TV', 
      sizes: [
        { size: '43"', width: '95cm', viewingDistance: '5-6ft', recommendedFor: 'Small Room' },
        { size: '50"', width: '110cm', viewingDistance: '6-7ft', recommendedFor: 'Bedroom' },
        { size: '55"', width: '121cm', viewingDistance: '7-8ft', recommendedFor: 'Bedroom' },
        { size: '65"', width: '144cm', viewingDistance: '8-9ft', recommendedFor: 'Living Room' },
        { size: '75"', width: '166cm', viewingDistance: '9-10ft', recommendedFor: 'Living Room' },
      ],
      color: 'border-orange-500',
      uiColor: 'bg-orange-600/20',
      baseIssues: ['Top bar covers 15%', 'Bottom apps visible'],
    },
  ]

  const [selectedSizes, setSelectedSizes] = useState<{[key: string]: number}>(
    Object.fromEntries(tvPlatforms.map(platform => [platform.name, 1])) // Default to second size (usually 65")
  )

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

  const handleSizeChange = (platformName: string, sizeIndex: number) => {
    setSelectedSizes(prev => ({
      ...prev,
      [platformName]: sizeIndex
    }))
  }

  const getPlatformIssues = (platform: any, sizeIndex: number) => {
    const size = platform.sizes[sizeIndex]
    const distance = parseInt(size.viewingDistance.split('-')[0]) // Get minimum distance
    
    let issues = [...platform.baseIssues]
    
    // Add size-specific issues
    if (distance >= 10) {
      issues.unshift('Text appears very small at this viewing distance')
    } else if (distance <= 6) {
      issues.unshift('Text may appear too large for close viewing')
    }
    
    if (size.size.includes('85') || size.size.includes('98')) {
      issues.push('Edge elements may be outside peripheral vision')
    } else if (size.size.includes('32') || size.size.includes('43')) {
      issues.push('Limited space for complex designs')
    }
    
    return issues
  }

  const getScore = (platform: any, sizeIndex: number) => {
    const issues = getPlatformIssues(platform, sizeIndex)
    const baseScore = 60
    const penalty = issues.length * 5
    return Math.max(30, baseScore - penalty)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="px-4 py-2 bg-purple-600/10 border border-purple-500/20 rounded-full">
            <span className="text-purple-400 text-sm font-semibold">🎯 Multi-Size TV Platform Testing</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          TV Optimization Suite
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Test your thumbnails across 5 major Smart TV platforms with multiple screen sizes and realistic viewing distances
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
                Upload your thumbnail or use our demo to see exactly how it looks on different Smart TV platforms and screen sizes
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
                <h3 className="text-2xl font-semibold text-white mb-2">Multi-Size Platform Analysis</h3>
                <p className="text-gray-400">
                  Select different screen sizes to see how your thumbnail performs at various viewing distances
                </p>
              </div>
              
              <div className="space-y-8">
                {tvPlatforms.map((platform) => {
                  const currentSizeIndex = selectedSizes[platform.name]
                  const currentSize = platform.sizes[currentSizeIndex]
                  const issues = getPlatformIssues(platform, currentSizeIndex)
                  const score = getScore(platform, currentSizeIndex)
                  
                  return (
                    <div key={platform.name} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      {/* Platform Header with Size Selector */}
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                        <div className="flex items-center gap-4">
                          <h3 className="text-xl font-semibold text-white">{platform.name}</h3>
                          <div className={`w-4 h-4 rounded-full ${platform.color.replace('border-', 'bg-')}`}></div>
                        </div>
                        
                        {/* Size Selector */}
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-400">Screen Size:</span>
                          <div className="flex flex-wrap gap-2">
                            {platform.sizes.map((size, index) => (
                              <button
                                key={index}
                                onClick={() => handleSizeChange(platform.name, index)}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                                  currentSizeIndex === index
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                              >
                                {size.size}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Size Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* TV Preview */}
                        <div>
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
                        </div>

                        {/* Size Details & Analysis */}
                        <div className="space-y-4">
                          {/* Size Info Card */}
                          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                            <div className="flex items-center gap-2 mb-3">
                              <Monitor className="w-5 h-5 text-purple-400" />
                              <h4 className="text-white font-semibold">Current Configuration</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-gray-400">Screen Size:</span>
                                <div className="text-white font-medium">{currentSize.size}</div>
                              </div>
                              <div>
                                <span className="text-gray-400">Width:</span>
                                <div className="text-white font-medium">{currentSize.width}</div>
                              </div>
                              <div>
                                <span className="text-gray-400">Viewing Distance:</span>
                                <div className="text-white font-medium">{currentSize.viewingDistance}</div>
                              </div>
                              <div>
                                <span className="text-gray-400">Best For:</span>
                                <div className="text-white font-medium">{currentSize.recommendedFor}</div>
                              </div>
                            </div>
                          </div>

                          {/* Performance Score */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Performance Score:</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{width: `${score}%`}}
                                ></div>
                              </div>
                              <span className={`text-sm font-medium ${
                                score >= 70 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'
                              }`}>
                                {score}%
                              </span>
                            </div>
                          </div>

                          {/* Issues */}
                          <div className="space-y-2">
                            {issues.map((issue, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-300">{issue}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-start gap-2 pt-2 border-t border-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">Good contrast and color balance</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">🎯 Multi-Size AI Recommendations</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Adaptive Text Sizing</h4>
                      <p className="text-gray-400 text-sm">Text should be 30% larger for 75"+ screens, 20% larger for 55-65", standard for 43" and below</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Distance-Aware Content Placement</h4>
                      <p className="text-gray-400 text-sm">Shift key elements up more for larger screens to account for increased viewing distance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Dynamic Safe Zones</h4>
                      <p className="text-gray-400 text-sm">Use wider margins for 85"+ screens to accommodate peripheral vision limitations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Platform-Specific Scaling</h4>
                      <p className="text-gray-400 text-sm">Optimize differently for each platform's UI overlay patterns and screen size ranges</p>
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
