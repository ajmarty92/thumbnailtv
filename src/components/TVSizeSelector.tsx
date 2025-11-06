'use client'

import { useState } from 'react'
import { TV_PLATFORMS, TVPlatform } from '@/lib/tv-sizes'
import { ChevronDown, Monitor } from 'lucide-react'

interface TVSizeSelectorProps {
  onPlatformChange: (platform: TVPlatform, sizeIndex: number) => void
}

export default function TVSizeSelector({ onPlatformChange }: TVSizeSelectorProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<TVPlatform>('samsung')
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
  const [isPlatformOpen, setIsPlatformOpen] = useState(false)
  const [isSizeOpen, setIsSizeOpen] = useState(false)

  const handlePlatformSelect = (platform: TVPlatform) => {
    setSelectedPlatform(platform)
    setSelectedSizeIndex(0)
    setIsPlatformOpen(false)
    onPlatformChange(platform, 0)
  }

  const handleSizeSelect = (sizeIndex: number) => {
    setSelectedSizeIndex(sizeIndex)
    setIsSizeOpen(false)
    onPlatformChange(selectedPlatform, sizeIndex)
  }

  const currentPlatform = TV_PLATFORMS[selectedPlatform]
  const currentSize = currentPlatform.popularSizes[selectedSizeIndex]

  return (
    <div className="flex items-center gap-4 bg-gray-800 rounded-lg p-4 border border-gray-700">
      <Monitor className="w-5 h-5 text-purple-400" />
      
      {/* Platform Selector */}
      <div className="relative">
        <button
          onClick={() => setIsPlatformOpen(!isPlatformOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 hover:border-purple-500 transition-colors"
        >
          <span className="text-white font-medium">{currentPlatform.name}</span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isPlatformOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isPlatformOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-50">
            {Object.entries(TV_PLATFORMS).map(([key, platform]) => (
              <button
                key={key}
                onClick={() => handlePlatformSelect(key as TVPlatform)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  selectedPlatform === key ? 'bg-purple-600 text-white' : 'text-gray-300'
                }`}
              >
                {platform.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Size Selector */}
      <div className="relative">
        <button
          onClick={() => setIsSizeOpen(!isSizeOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 hover:border-purple-500 transition-colors"
        >
          <span className="text-white font-medium">{currentSize.inches}"</span>
          <span className="text-gray-400 text-sm">
            {currentSize.resolution.width}×{currentSize.resolution.height}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isSizeOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isSizeOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-50">
            {currentPlatform.popularSizes.map((size, index) => (
              <button
                key={index}
                onClick={() => handleSizeSelect(index)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  selectedSizeIndex === index ? 'bg-purple-600 text-white' : 'text-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{size.inches}"</span>
                  <span className="text-sm text-gray-400">
                    {size.resolution.width}×{size.resolution.height}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Current Selection Info */}
      <div className="ml-auto text-right">
        <div className="text-sm text-gray-400">Screen Size</div>
        <div className="text-white font-semibold">{currentSize.inches}" Display</div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {isPlatformOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsPlatformOpen(false)}
        />
      )}
      {isSizeOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsSizeOpen(false)}
        />
      )}
    </div>
  )
}