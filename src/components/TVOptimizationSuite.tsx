'use client'

import { useState, useCallback, useEffect } from 'react'
import { Upload, Download, Eye, EyeOff, Settings, AlertCircle, CheckCircle, Sparkles } from 'lucide-react'

export default function TVOptimizationSuite() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [showGrid, setShowGrid] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStage, setProcessingStage] = useState('')
  const [compressionProgress, setCompressionProgress] = useState(0)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [tvSize, setTvSize] = useState('65')
  const [viewDistance, setViewDistance] = useState('10')

  // TV platforms with accurate UI overlays
  const tvPlatforms = [
    {
      id: 'google-tv',
      name: 'Google TV',
      brandColor: 'from-blue-600 to-blue-700',
      uiOverlay: {
        top: '15%', // Navigation bar
        bottom: '25%', // Content info bar
        left: '5%',
        right: '5%'
      }
    },
    {
      id: 'roku',
      name: 'Roku',
      brandColor: 'from-purple-600 to-purple-700',
      uiOverlay: {
        top: '12%', // Roku navigation
        bottom: '20%', // Content bar
        left: '3%',
        right: '3%'
      }
    },
    {
      id: 'samsung',
      name: 'Samsung TV',
      brandColor: 'from-indigo-600 to-indigo-700',
      uiOverlay: {
        top: '10%', // Samsung menu
        bottom: '18%', // Smart Hub bar
        left: '4%',
        right: '4%'
      }
    },
    {
      id: 'apple-tv',
      name: 'Apple TV',
      brandColor: 'from-gray-700 to-gray-800',
      uiOverlay: {
        top: '8%', // Apple TV menu
        bottom: '15%', // Content bar
        left: '6%',
        right: '6%'
      }
    },
    {
      id: 'fire-tv',
      name: 'Fire TV',
      brandColor: 'from-orange-600 to-orange-700',
      uiOverlay: {
        top: '18%', // Fire TV navigation
        bottom: '22%', // Content info
        left: '7%',
        right: '7%'
      }
    }
  ]

  // Calculate safe zones based on TV size and viewing distance
  const calculateSafeZones = useCallback((size: string, distance: string) => {
    const sizeNum = parseInt(size)
    const distanceNum = parseInt(distance)
    
    // Larger TVs and further distances = more content hidden
    const baseTopOverlay = 10 + (sizeNum - 55) * 0.2 + (distanceNum - 8) * 0.3
    const baseBottomOverlay = 15 + (sizeNum - 55) * 0.3 + (distanceNum - 8) * 0.4
    
    return {
      top: Math.min(baseTopOverlay, 25),
      bottom: Math.min(baseBottomOverlay, 30),
      left: 5,
      right: 5
    }
  }, [])

  const safeZones = calculateSafeZones(tvSize, viewDistance)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setOriginalSize(file.size)
        setCompressedSize(0)
        setCompressionProgress(0)
      }
      reader.readAsDataURL(file)
    }
  }

  const simulateProcessing = async () => {
    setIsProcessing(true)
    setProcessingStage('Analyzing thumbnail content...')
    
    // Simulate processing stages
    const stages = [
      { message: 'Analyzing thumbnail content...', duration: 1000 },
      { message: 'Detecting text and faces...', duration: 1500 },
      { message: 'Calculating optimal compression...', duration: 1000 },
      { message: 'Applying AI optimization...', duration: 2000 },
      { message: 'Finalizing...', duration: 500 }
    ]
    
    for (const stage of stages) {
      setProcessingStage(stage.message)
      await new Promise(resolve => setTimeout(resolve, stage.duration))
      
      // Update compression progress
      if (stage.message.includes('compression')) {
        const interval = setInterval(() => {
          setCompressionProgress(prev => {
            if (prev >= 95) {
              clearInterval(interval)
              return prev
            }
            return prev + Math.random() * 15
          })
        }, 200)
      }
    }
    
    setCompressedSize(Math.floor(originalSize * 0.45))
    setCompressionProgress(100)
    setProcessingStage('Complete!')
    
    setTimeout(() => {
      setIsProcessing(false)
      setProcessingStage('')
    }, 1000)
  }

  const resetDemo = () => {
    setUploadedImage(null)
    setSelectedPlatform('all')
    setShowGrid(true)
    setCompressionProgress(0)
    setCompressedSize(0)
    setProcessingStage('')
  }

  const getPlatformIssues = (platform: typeof tvPlatforms[0]) => {
    const issues = []
    
    if (platform.uiOverlay.top > 15) {
      issues.push('Top navigation covers important content')
    }
    if (platform.uiOverlay.bottom > 20) {
      issues.push('Bottom content bar may hide text')
    }
    if (platform.uiOverlay.left > 5 || platform.uiOverlay.right > 5) {
      issues.push('Side UI elements reduce visible area')
    }
    
    return issues.length > 0 ? issues : ['Good layout for this platform']
  }

  const filteredPlatforms = selectedPlatform === 'all' 
    ? tvPlatforms 
    : tvPlatforms.filter(p => p.id === selectedPlatform)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          TV Optimization Suite
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Test your thumbnails across different TV sizes and viewing distances. 
          See exactly how they appear on real TV interfaces.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upload Thumbnail
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="thumbnail-upload"
              />
              <label
                htmlFor="thumbnail-upload"
                className="flex items-center justify-center w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </label>
            </div>
          </div>

          {/* Platform Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Platform
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Platforms</option>
              {tvPlatforms.map(platform => (
                <option key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>

          {/* TV Size */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              TV Size
            </label>
            <select
              value={tvSize}
              onChange={(e) => setTvSize(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="55">55" TV</option>
              <option value="65">65" TV</option>
              <option value="75">75" TV</option>
              <option value="85">85" TV</option>
              <option value="100">100" TV</option>
            </select>
          </div>

          {/* View Distance */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Viewing Distance
            </label>
            <select
              value={viewDistance}
              onChange={(e) => setViewDistance(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="8">8 feet</option>
              <option value="10">10 feet</option>
              <option value="12">12 feet</option>
              <option value="14">14 feet</option>
              <option value="16">16 feet</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          {uploadedImage && (
            <>
              <button
                onClick={simulateProcessing}
                disabled={isProcessing}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing ? 'Processing...' : 'Optimize for TV'}
              </button>
              
              <button
                onClick={() => setShowGrid(!showGrid)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                {showGrid ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showGrid ? 'Hide Grid' : 'Show Grid'}
              </button>
              
              <button
                onClick={resetDemo}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Reset
              </button>
            </>
          )}
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-white font-medium">{processingStage}</span>
            </div>
            
            {compressionProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Compression Progress</span>
                  <span>{Math.floor(compressionProgress)}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${compressionProgress}%` }}
                  />
                </div>
                {compressedSize > 0 && (
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Size: {(originalSize / 1024 / 1024).toFixed(1)}MB → {(compressedSize / 1024 / 1024).toFixed(1)}MB</span>
                    <span className="text-green-400">-{Math.floor((1 - compressedSize / originalSize) * 100)}%</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {!uploadedImage ? (
        <div className="bg-gray-800/50 rounded-xl p-12 text-center border border-gray-700">
          <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Upload a Thumbnail to Get Started
          </h3>
          <p className="text-gray-400">
            See how your thumbnail appears on different TV platforms and get AI-powered optimization recommendations.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* TV Platform Previews */}
          <div className={`grid gap-6 ${filteredPlatforms.length > 1 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
            {filteredPlatforms.map(platform => {
              const issues = getPlatformIssues(platform)
              
              return (
                <div key={platform.id} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  {/* Platform Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 bg-gradient-to-r ${platform.brandColor} rounded-full`}>
                        <span className="text-white text-sm font-semibold">
                          {platform.name}
                        </span>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {tvSize}" TV • {viewDistance} feet
                      </span>
                    </div>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>

                  {/* TV Preview */}
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4">
                    {/* TV Frame */}
                    <div className="relative" style={{ paddingBottom: '56.25%' }}>
                      {/* Safe Zone Overlay */}
                      <div className="absolute inset-0 bg-black/10" />
                      
                      {/* Top UI Overlay */}
                      <div 
                        className="absolute top-0 left-0 right-0 bg-black/60 flex items-center px-4 py-2"
                        style={{ height: `${safeZones.top}%` }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-700 rounded" />
                          <div className="w-20 h-4 bg-gray-700 rounded" />
                        </div>
                        <div className="ml-auto flex gap-2">
                          <div className="w-12 h-4 bg-gray-700 rounded" />
                          <div className="w-8 h-8 bg-gray-700 rounded" />
                        </div>
                      </div>

                      {/* Bottom UI Overlay */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-black/60 flex items-center px-4 py-3"
                        style={{ height: `${safeZones.bottom}%` }}
                      >
                        <div className="w-16 h-16 bg-gray-700 rounded" />
                        <div className="ml-4 flex-1">
                          <div className="w-32 h-4 bg-gray-700 rounded mb-1" />
                          <div className="w-48 h-3 bg-gray-700 rounded" />
                        </div>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 bg-gray-700 rounded" />
                          <div className="w-8 h-8 bg-gray-700 rounded" />
                        </div>
                      </div>

                      {/* Thumbnail Preview */}
                      <div 
                        className="absolute flex items-center justify-center"
                        style={{
                          top: `${safeZones.top}%`,
                          bottom: `${safeZones.bottom}%`,
                          left: `${safeZones.left}%`,
                          right: `${safeZones.right}%`
                        }}
                      >
                        <img 
                          src={uploadedImage} 
                          alt="Thumbnail preview"
                          className="w-full h-full object-contain"
                        />
                        
                        {/* Grid Overlay */}
                        {showGrid && (
                          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                            {[...Array(9)].map((_, i) => (
                              <div key={i} className="border border-white/20" />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Distance Indicator */}
                      <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 rounded text-white text-xs">
                        {viewDistance} feet
                      </div>
                    </div>
                  </div>

                  {/* Issues/Recommendations */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Analysis Results
                    </h4>
                    <div className="space-y-2">
                      {issues.map((issue, index) => (
                        <div 
                          key={index}
                          className={`flex items-start gap-2 text-sm ${
                            issue.includes('Good layout') ? 'text-green-400' : 'text-yellow-400'
                          }`}
                        >
                          {issue.includes('Good layout') ? (
                            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          )}
                          <span>{issue}</span>
                        </div>
                      ))}
                    </div>
                    
                    {compressedSize > 0 && (
                      <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">Optimization Complete</span>
                          <span className="text-green-400 font-semibold">
                            {Math.floor((1 - compressedSize / originalSize) * 100)}% smaller
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
