'use client'

import { useState, useCallback, useEffect } from 'react'
import { Upload, Download, Eye, EyeOff, Settings, AlertCircle, CheckCircle, Sparkles, Wand2, Monitor, Layers } from 'lucide-react'
import { LazySmartLoopCompressor, LazyLetsEnhanceUpscaler, preloadComponent } from './DemoComponents'
import { Suspense } from 'react'

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
  const [activeDemo, setActiveDemo] = useState<'tv-preview' | 'smart-compression' | 'thumbnail-upscale'>('tv-preview')

  // TV platforms with accurate UI overlays - FIXED TYPES
  const tvPlatforms = [
    {
      id: 'google-tv',
      name: 'Google TV',
      brandColor: 'from-blue-600 to-blue-700',
      uiOverlay: {
        top: 15, // number instead of string
        bottom: 25, // number instead of string
        left: 5,
        right: 5
      }
    },
    {
      id: 'roku',
      name: 'Roku',
      brandColor: 'from-purple-600 to-purple-700',
      uiOverlay: {
        top: 12, // number instead of string
        bottom: 20, // number instead of string
        left: 3,
        right: 3
      }
    },
    {
      id: 'samsung',
      name: 'Samsung TV',
      brandColor: 'from-indigo-600 to-indigo-700',
      uiOverlay: {
        top: 10, // number instead of string
        bottom: 18, // number instead of string
        left: 4,
        right: 4
      }
    },
    {
      id: 'lg-webos',
      name: 'LG webOS',
      brandColor: 'from-pink-600 to-pink-700',
      uiOverlay: {
        top: 8, // number instead of string
        bottom: 15, // number instead of string
        left: 6,
        right: 6
      }
    },
    {
      id: 'apple-tv',
      name: 'Apple TV',
      brandColor: 'from-gray-600 to-gray-700',
      uiOverlay: {
        top: 10, // number instead of string
        bottom: 15, // number instead of string
        left: 2,
        right: 2
      }
    }
  ]

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setUploadedImage(result)
      setOriginalSize(file.size)
      setCompressedSize(0)
      setCompressionProgress(0)
    }
    reader.readAsDataURL(file)
  }, [])

  const simulateProcessing = async () => {
    setIsProcessing(true)
    setProcessingStage('Analyzing image...')
    
    const stages = [
      { message: 'Analyzing image...', duration: 500 },
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
    }, 1500)
  }

  const resetDemo = () => {
    setUploadedImage(null)
    setSelectedPlatform('all')
    setShowGrid(true)
    setIsProcessing(false)
    setProcessingStage('')
    setCompressionProgress(0)
    setCompressedSize(0)
    setOriginalSize(0)
  }

  // FIXED: Proper type coercion and numeric comparison
  const getPlatformIssues = (platform: typeof tvPlatforms[0]) => {
    const issues = []
    
    // FIXED: Use Number() instead of parseInt for type coercion
    const safeZoneTop = Number(tvSize) * 0.05 // 5% safe zone
    const uiTop = platform.uiOverlay.top
    
    if (uiTop > safeZoneTop) {
      issues.push({
        type: 'ui-cutoff',
        severity: 'high',
        message: `UI elements (${uiTop}% from top) may be cut off on ${tvSize}" TVs`,
        suggestion: 'Move critical elements down by ' + Math.ceil(uiTop - safeZoneTop) + '%'
      })
    }
    
    if (platform.id === 'samsung' && selectedPlatform !== 'samsung') {
      issues.push({
        type: 'brand-optimization',
        severity: 'medium',
        message: 'Samsung-specific optimization available',
        suggestion: 'Use Samsung preset for optimal results'
      })
    }
    
    return issues
  }

  const filteredPlatforms = selectedPlatform === 'all' 
    ? tvPlatforms 
    : tvPlatforms.filter(p => p.id === selectedPlatform)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Demo Feature Selector */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🎬 Demo Account - Test All Features</h2>
        <div className="bg-gray-800 rounded-xl p-6">
          <p className="text-gray-300 mb-4">Experience all 3 core AI features with your demo account:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => setActiveDemo('tv-preview')}
              className={`p-4 rounded-lg border-2 transition-all ${
                activeDemo === 'tv-preview' 
                  ? 'bg-purple-600 border-purple-400 text-white' 
                  : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Monitor className="w-6 h-6 mb-2 mx-auto" />
              <h3 className="font-semibold mb-1">AI TV Safe-Zone Preview</h3>
              <p className="text-xs opacity-80">Optimize thumbnails for 5 TV platforms</p>
            </button>

            <button
              onClick={() => setActiveDemo('smart-compression')}
              className={`p-4 rounded-lg border-2 transition-all ${
                activeDemo === 'smart-compression' 
                  ? 'bg-blue-600 border-blue-400 text-white' 
                  : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Layers className="w-6 h-6 mb-2 mx-auto" />
              <h3 className="font-semibold mb-1">AI Smart-Compression</h3>
              <p className="text-xs opacity-80">Reduce size while maintaining quality</p>
            </button>

            <button
              onClick={() => setActiveDemo('thumbnail-upscale')}
              className={`p-4 rounded-lg border-2 transition-all ${
                activeDemo === 'thumbnail-upscale' 
                  ? 'bg-green-600 border-green-400 text-white' 
                  : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Wand2 className="w-6 h-6 mb-2 mx-auto" />
              <h3 className="font-semibold mb-1">AI Frame-to-Thumbnail Upscaler</h3>
              <p className="text-xs opacity-80">Enhance quality and resolution</p>
            </button>
          </div>

          <div className="text-sm text-gray-400 bg-gray-900/50 rounded-lg p-3">
            <span className="font-semibold text-yellow-400">💡 Demo Tip:</span> 
            {activeDemo === 'tv-preview' && " Upload any image to see how it looks across different TV platforms with accurate UI overlays."}
            {activeDemo === 'smart-compression' && " Test AI compression with different quality targets and formats."}
            {activeDemo === 'thumbnail-upscale' && " Transform small frames into high-quality thumbnails."}
          </div>
        </div>
      </div>

      {/* Feature-Specific Demo Content */}
      {activeDemo === 'tv-preview' && (
        <>
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-purple-400" />
              AI TV Safe-Zone Preview - Demo
            </h3>
            <p className="text-gray-300 mb-4">
              Upload an image to see how it appears across different TV platforms with accurate UI overlays and safe zones.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Upload and Controls */}
            <div className="space-y-6">
              {/* Upload Section */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-400" />
                  Upload Thumbnail
                </h3>
                
                {!uploadedImage ? (
                  <div
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-2">Click to upload thumbnail image</p>
                    <p className="text-sm text-gray-500">Supports JPG, PNG, WebP up to 10MB</p>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Uploaded thumbnail"
                        className="w-full h-auto rounded-lg"
                      />
                      <button
                        onClick={resetDemo}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                      >
                        ×
                      </button>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Original Size: {(originalSize / 1024 / 1024).toFixed(2)}MB</span>
                      <span>Resolution: 1920×1080</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Platform Selection */}
              {uploadedImage && (
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">TV Platforms</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedPlatform('all')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedPlatform === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      All Platforms
                    </button>
                    {tvPlatforms.map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => setSelectedPlatform(platform.id)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedPlatform === platform.id ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {platform.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Processing Controls */}
              {uploadedImage && (
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Optimization Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        TV Size: {tvSize}"
                      </label>
                      <input
                        type="range"
                        min="32"
                        max="85"
                        value={tvSize}
                        onChange={(e) => setTvSize(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        View Distance: {viewDistance} feet
                      </label>
                      <input
                        type="range"
                        min="6"
                        max="15"
                        value={viewDistance}
                        onChange={(e) => setViewDistance(e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="show-grid"
                        checked={showGrid}
                        onChange={(e) => setShowGrid(e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor="show-grid" className="text-sm text-gray-300">
                        Show safe zone grid
                      </label>
                    </div>

                    <button
                      onClick={simulateProcessing}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Processing...' : 'Start AI Optimization'}
                    </button>

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
                </div>
              )}
            </div>

            {/* Right Column - Previews */}
            {uploadedImage && (
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-purple-400" />
                    TV Platform Previews
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-6">
                    {filteredPlatforms.map((platform) => {
                      const issues = getPlatformIssues(platform)
                      return (
                        <div key={platform.id} className="bg-gray-900 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className={`font-semibold bg-gradient-to-r ${platform.brandColor} bg-clip-text text-transparent`}>
                              {platform.name}
                            </h4>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setShowGrid(!showGrid)}
                                className="text-gray-400 hover:text-white transition-colors"
                                title="Toggle grid"
                              >
                                {showGrid ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                          
                          <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                            <img
                              src={uploadedImage}
                              alt={`${platform.name} preview`}
                              className="w-full h-full object-contain"
                            />
                            
                            {/* UI Overlay Simulation */}
                            <div className="absolute inset-0 pointer-events-none">
                              {/* Top UI overlay */}
                              <div 
                                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent"
                                style={{ height: `${platform.uiOverlay.top}%` }}
                              >
                                <div className="p-4">
                                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1 text-white text-sm">
                                    {platform.name} UI Simulation
                                  </div>
                                </div>
                              </div>
                              
                              {/* Bottom UI overlay */}
                              <div 
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent"
                                style={{ height: `${platform.uiOverlay.bottom}%` }}
                              >
                                <div className="absolute bottom-4 left-4 right-4">
                                  <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-2 text-white text-sm">
                                    Content description • Metadata
                                  </div>
                                </div>
                              </div>
                              
                              {/* Side overlays */}
                              <div 
                                className="absolute top-0 bottom-0 bg-gradient-to-r from-black/40 to-transparent"
                                style={{ width: `${platform.uiOverlay.left}%` }}
                              />
                              <div 
                                className="absolute top-0 bottom-0 right-0 bg-gradient-to-l from-black/40 to-transparent"
                                style={{ width: `${platform.uiOverlay.right}%` }}
                              />
                              
                              {/* Safe Zone Grid */}
                              {showGrid && (
                                <div className="absolute inset-0 pointer-events-none">
                                  {/* Safe zone indicators */}
                                  <div className="absolute top-[5%] left-[5%] right-[5%] bottom-[10%] border-2 border-yellow-400/30 border-dashed">
                                    <div className="absolute top-0 left-0 bg-yellow-400 text-black text-xs px-1 rounded-br">
                                      Safe Zone
                                    </div>
                                  </div>
                                  
                                  {/* Action safe zone (smaller) */}
                                  <div className="absolute top-[10%] left-[10%] right-[10%] bottom-[15%] border border-green-400/30 border-dashed">
                                    <div className="absolute top-0 left-0 bg-green-400 text-black text-xs px-1 rounded-br">
                                      Action Safe
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Platform-specific Issues */}
                          {issues.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {issues.map((issue, index) => (
                                <div
                                  key={index}
                                  className={`p-2 rounded text-xs ${
                                    issue.severity === 'high' 
                                      ? 'bg-red-900/20 text-red-400 border border-red-800/30'
                                      : 'bg-yellow-900/20 text-yellow-400 border border-yellow-800/30'
                                  }`}
                                >
                                  <div className="flex items-start gap-2">
                                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="font-medium">{issue.message}</p>
                                      <p className="opacity-80 mt-1">{issue.suggestion}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
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
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {activeDemo === 'smart-compression' && (
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            AI Smart-Compression - Demo
          </h3>
          <p className="text-gray-300 mb-4">
            Test AI-powered compression that reduces file size while maintaining visual quality.
          </p>
          
          <div className="bg-gray-900/50 rounded-lg p-4">
            <Suspense fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
            }>
              <LazySmartLoopCompressor />
            </Suspense>
          </div>
        </div>
      )}

      {activeDemo === 'thumbnail-upscale' && (
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-green-400" />
            AI Frame-to-Thumbnail Upscaler - Demo
          </h3>
          <p className="text-gray-300 mb-4">
            Transform small frames into high-quality thumbnails using AI upscaling technology.
          </p>
          
          <div className="bg-gray-900/50 rounded-lg p-4">
            <Suspense fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
            }>
              <LazyLetsEnhanceUpscaler />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  )
}
