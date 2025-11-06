'use client'

import { useState } from 'react'
import { Upload, AlertCircle, Monitor } from 'lucide-react'
import { TV_PLATFORMS, TVPlatform } from '@/lib/tv-sizes'
import TVSizeSelector from '../TVSizeSelector'

interface EnhancedTVPreviewDashboardProps {
  uploadedImage: string | null
  onImageUpload: (imageUrl: string) => void
}

export default function EnhancedTVPreviewDashboard({ uploadedImage, onImageUpload }: EnhancedTVPreviewDashboardProps) {
  const [analyzing, setAnalyzing] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<TVPlatform>('samsung')
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        onImageUpload(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePlatformSizeChange = (platform: TVPlatform, sizeIndex: number) => {
    setSelectedPlatform(platform)
    setSelectedSizeIndex(sizeIndex)
  }

  const currentPlatform = TV_PLATFORMS[selectedPlatform]
  const currentSize = currentPlatform.popularSizes[selectedSizeIndex]

  // Calculate TV dimensions based on screen size and aspect ratio
  const calculateTVDimensions = () => {
    const aspectRatio = currentSize.resolution.width / currentSize.resolution.height
    const maxWidth = 800
    const maxHeight = 450
    
    let width = maxWidth
    let height = width / aspectRatio
    
    if (height > maxHeight) {
      height = maxHeight
      width = height * aspectRatio
    }
    
    return { width: Math.round(width), height: Math.round(height) }
  }

  const tvDimensions = calculateTVDimensions()

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">TV Preview Dashboard</h3>
        <p className="text-gray-400">Test your thumbnail on different TV platforms and screen sizes</p>
      </div>

      {/* Size Selector */}
      <TVSizeSelector onPlatformChange={handlePlatformSizeChange} />

      {/* Upload Section */}
      <div className="mb-6">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700/50 hover:bg-gray-700 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {/* TV Preview */}
      {uploadedImage ? (
        <div className="flex justify-center items-center bg-gray-900 rounded-xl p-8">
          <div className="relative">
            {/* TV Frame */}
            <div
              className="bg-black rounded-lg shadow-2xl relative overflow-hidden"
              style={{
                width: `${tvDimensions.width}px`,
                height: `${tvDimensions.height}px`,
              }}
            >
              {/* TV Screen */}
              <div className="w-full h-full relative">
                {/* Safe Zone Indicator */}
                <div
                  className="absolute border-2 border-red-500 border-dashed opacity-50 pointer-events-none"
                  style={{
                    top: `${currentPlatform.safeZone.top}%`,
                    left: `${currentPlatform.safeZone.left}%`,
                    right: `${currentPlatform.safeZone.right}%`,
                    bottom: `${currentPlatform.safeZone.bottom}%`,
                  }}
                >
                  <div className="absolute top-0 left-0 transform -translate-y-6">
                    <span className="text-red-500 text-xs font-semibold">SAFE ZONE</span>
                  </div>
                </div>

                {/* Uploaded Thumbnail */}
                <img
                  src={uploadedImage}
                  alt="Thumbnail preview"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* TV Brand Badge */}
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {currentPlatform.name}
              </div>
              
              {/* Screen Size Badge */}
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {currentSize.inches}" • {currentSize.resolution.width}×{currentSize.resolution.height}
              </div>
            </div>

            {/* TV Stand */}
            <div className="w-16 h-8 bg-gray-700 mx-auto rounded-b-lg -mt-1" />
            <div className="w-24 h-2 bg-gray-800 mx-auto" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Monitor className="w-16 h-16 text-gray-600 mb-4" />
          <p className="text-gray-400">Upload a thumbnail to see how it looks on different TVs</p>
        </div>
      )}

      {/* Analysis Results */}
      {uploadedImage && !analyzing && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-green-900/20 border border-green-500/20 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-green-400 text-sm font-medium">Optimized for {currentSize.inches}" {currentPlatform.name}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between p-2 bg-gray-700/50 rounded">
              <span className="text-gray-400">Screen Size:</span>
              <span className="text-white font-medium">{currentSize.inches}"</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-700/50 rounded">
              <span className="text-gray-400">Resolution:</span>
              <span className="text-white font-medium">{currentSize.resolution.width}×{currentSize.resolution.height}</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-700/50 rounded">
              <span className="text-gray-400">Platform:</span>
              <span className="text-white font-medium">{currentPlatform.name}</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-700/50 rounded">
              <span className="text-gray-400">Safe Zone:</span>
              <span className="text-white font-medium">5% margin</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}