'use client'

import { useState } from 'react'
import { Upload, AlertCircle, Download, Sparkles, Zap, Crown, CheckCircle, Loader2 } from 'lucide-react'
import TVPlatformCard from '../TVPlatformCard'
import { tvPlatforms } from '@/types/tv-platforms'

interface TVPreviewDashboardProps {
  uploadedImage: string | null
  onImageUpload: (imageUrl: string) => void
}

// NAMED EXPORT (Option A)
export function TVPreviewDashboard({ uploadedImage, onImageUpload }: TVPreviewDashboardProps) {
  const [analyzing, setAnalyzing] = useState(false)
  const [compressionResult, setCompressionResult] = useState<any>(null)
  const [upscalingResult, setUpscalingResult] = useState<any>(null)
  const [activeFeature, setActiveFeature] = useState<'preview' | 'compression' | 'upscaling'>('preview')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onImageUpload(result)
        setAnalyzing(true)
        setCompressionResult(null)
        setUpscalingResult(null)
        
        // Simulate AI analysis
        setTimeout(() => {
          setAnalyzing(false)
          // Auto-generate compression result
          setCompressionResult({
            originalSize: Math.floor(file.size / 1024 / 1024 * 10) / 10 + 'MB',
            compressedSize: '49MB',
            qualityScore: 95,
            optimizations: ['Quality preservation', 'Platform compliance', 'Size reduction']
          })
        }, 2500)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCompression = () => {
    setActiveFeature('compression')
    setTimeout(() => {
      setCompressionResult({
        originalSize: '12.5MB',
        compressedSize: '49MB',
        qualityScore: 95,
        optimizations: ['Quality preservation', 'Platform compliance', 'Size reduction']
      })
    }, 2000)
  }

  const handleUpscaling = () => {
    setActiveFeature('upscaling')
    setTimeout(() => {
      setUpscalingResult({
        originalResolution: '1920x1080',
        targetResolution: '3840x2160',
        enhancements: ['Face Enhancement', 'Text Sharpening', 'Noise Reduction']
      })
    }, 3000)
  }

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      {!uploadedImage && (
        <div className="bg-tv-gray/50 border-2 border-dashed border-tv-blue/30 rounded-lg p-12 text-center">
          <Upload className="w-16 h-16 text-tv-blue mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Upload Your Thumbnail</h3>
          <p className="text-gray-400 mb-6">
            Test how your thumbnail looks on 5 major TV platforms
          </p>
          <label className="inline-block">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="bg-tv-blue hover:bg-tv-blue/80 text-white font-bold py-3 px-6 rounded-lg cursor-pointer inline-block transition-colors">
              Choose File
            </span>
          </label>
        </div>
      )}

      {/* Analysis Status */}
      {analyzing && (
        <div className="bg-tv-blue/20 border border-tv-blue rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Loader2 className="w-6 h-6 text-tv-blue animate-spin" />
            <span className="text-lg font-semibold">AI Analyzing Your Thumbnail...</span>
          </div>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Checking TV platform compatibility...</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-tv-blue border-t-transparent rounded-full animate-spin" />
              <span>Optimizing compression settings...</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              <span>Preparing upscaling options...</span>
            </div>
          </div>
        </div>
      )}

      {/* TV Platform Previews */}
      {uploadedImage && !analyzing && (
        <>
          <div className="bg-tv-gray/50 border border-tv-red/30 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-tv-red flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-tv-red mb-2">TV Screen Analysis Results</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-gray-300 mb-2">Critical Issues:</p>
                    <ul className="space-y-1 text-sm text-gray-400">
                      <li>• 55" TV: Text appears small from 8 feet</li>
                      <li>• 65" TV: Text barely readable at 10 feet</li>
                      <li>• 75" TV: Logos get covered by UI elements</li>
                      <li>• 85" TV: Critical text becomes invisible</li>
                      <li>• 100" TV: Only center content visible</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300 mb-2">Recommendations:</p>
                    <ul className="space-y-1 text-sm text-gray-400">
                      <li>• Increase text size by 40% for 75"+ screens</li>
                      <li>• Move key elements to center 60% area</li>
                      <li>• Avoid bottom 25% for important content</li>
                      <li>• Use high contrast colors for readability</li>
                      <li>• Test on actual TV screens before publishing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

      {/* AI Optimization Results - NEW SECTION */}
      <div className="bg-gradient-to-r from-tv-blue/20 to-tv-purple/20 border border-tv-blue/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-tv-blue" />
          <h3 className="text-xl font-bold">AI Analysis Complete</h3>
        </div>
        <p className="text-gray-300 mb-6">
          Your thumbnail has been analyzed for TV optimization, compression, and upscaling potential.
          Choose which optimization you'd like to apply:
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {/* TV Safe Zone Preview */}
          <div 
            className={`bg-tv-gray/50 border-2 rounded-lg p-4 cursor-pointer transition-all ${
              activeFeature === 'preview' 
                ? 'border-tv-blue bg-tv-blue/10' 
                : 'border-tv-gray hover:border-tv-blue/50'
            }`}
            onClick={() => setActiveFeature('preview')}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-tv-blue/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-tv-blue" />
              </div>
              <div>
                <h4 className="font-semibold text-white">TV Safe Zone</h4>
                <p className="text-xs text-gray-400">See how it looks on TV</p>
              </div>
            </div>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• 5 TV platform previews</li>
              <li>• UI overlap detection</li>
              <li>• Distance optimization</li>
            </ul>
          </div>

          {/* Smart Compression */}
          <div 
            className={`bg-tv-gray/50 border-2 rounded-lg p-4 cursor-pointer transition-all ${
              activeFeature === 'compression' 
                ? 'border-pink-500 bg-pink-500/10' 
                : 'border-tv-gray hover:border-pink-500/50'
            }`}
            onClick={handleCompression}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Smart Compression</h4>
                <p className="text-xs text-gray-400">Reduce size, keep quality</p>
              </div>
            </div>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• 100MB+ → 49MB</li>
              <li>• Quality preservation</li>
              <li>• Platform compliant</li>
            </ul>
            {compressionResult && (
              <div className="mt-2 text-xs text-green-400">
                ✓ Optimized and ready
              </div>
            )}
          </div>

          {/* Frame Upscaler */}
          <div 
            className={`bg-tv-gray/50 border-2 rounded-lg p-4 cursor-pointer transition-all ${
              activeFeature === 'upscaling' 
                ? 'border-purple-500 bg-purple-500/10' 
                : 'border-tv-gray hover:border-purple-500/50'
            }`}
            onClick={handleUpscaling}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Frame Upscaler</h4>
                <p className="text-xs text-gray-400">Pro Feature</p>
              </div>
            </div>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• 1080p → 4K/8K</li>
              <li>• Face enhancement</li>
              <li>• Text sharpening</li>
            </ul>
            {upscalingResult && (
              <div className="mt-2 text-xs text-green-400">
                ✓ Upscaled successfully
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feature Content - CONDITIONAL DISPLAY */}
      {activeFeature === 'compression' && compressionResult && (
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-pink-400" />
            <h3 className="text-lg font-bold text-white">Smart Compression Complete</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-tv-gray/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Original Size</p>
              <p className="text-xl font-bold text-white">{compressionResult.originalSize}</p>
            </div>
            <div className="bg-tv-gray/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Compressed Size</p>
              <p className="text-xl font-bold text-green-400">{compressionResult.compressedSize}</p>
            </div>
            <div className="bg-tv-gray/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Quality Score</p>
              <p className="text-xl font-bold text-yellow-400">{compressionResult.qualityScore}%</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-2">AI Optimizations Applied</p>
            <div className="flex flex-wrap gap-2">
              {compressionResult.optimizations.map((optimization: string) => (
                <span
                  key={optimization}
                  className="bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-sm"
                >
                  {optimization}
                </span>
              ))}
            </div>
          </div>

          <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Download Compressed Thumbnail
          </button>
        </div>
      )}

      {activeFeature === 'upscaling' && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Frame Upscaler - Pro Feature</h3>
          </div>
          
          <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Crown className="w-6 h-6 text-purple-400" />
              <div>
                <p className="text-purple-300 font-semibold">Upgrade to Pro Creator</p>
                <p className="text-purple-200 text-sm">Unlock unlimited 4K upscaling and all TV platform previews</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-tv-gray/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">1080p → 4K/8K</p>
              <p className="text-lg font-semibold text-white">AI-powered enhancement</p>
            </div>
            <div className="bg-tv-gray/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Face & Text Enhancement</p>
              <p className="text-lg font-semibold text-white">Professional quality</p>
            </div>
          </div>

          <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Crown className="w-5 h-5" />
            Upgrade to Pro Creator - $79/month
          </button>
        </div>
      )}

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">Real TV Screen Previews</h3>
            <p className="text-gray-400">See how your thumbnail looks on different screen sizes from typical viewing distances</p>
          </div>

          {activeFeature === 'preview' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tvPlatforms.map((platform) => (
                <TVPlatformCard
                  key={platform.id}
                  platform={platform}
                  thumbnailUrl={uploadedImage}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
