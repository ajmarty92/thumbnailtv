'use client'

import { useState } from 'react'
import { Tv, Zap, Sparkles, ArrowLeft } from 'lucide-react'
import TVPreviewDashboard from './tv-previews/TVPreviewDashboard'
import SmartCompressor from './compression/SmartCompressor'
import FrameUpscaler from './upscaling/FrameUpscaler'

type Tab = 'preview' | 'compress' | 'upscale'

export default function TVOptimizationSuite() {
  const [activeTab, setActiveTab] = useState<Tab>('preview')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl)
  }

  return (
    <div className="min-h-screen bg-tv-black text-white">
      {/* Header */}
      <header className="border-b border-tv-gray">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Tv className="w-8 h-8 text-tv-blue" />
              <h1 className="text-2xl font-bold">ThumbnailTV</h1>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-tv-gray">
        <div className="container mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'preview'
                  ? 'border-tv-blue text-tv-blue'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Tv className="w-5 h-5" />
              TV Preview
            </button>
            <button
              onClick={() => setActiveTab('compress')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'compress'
                  ? 'border-tv-blue text-tv-blue'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Zap className="w-5 h-5" />
              Smart Compress
            </button>
            <button
              onClick={() => setActiveTab('upscale')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'upscale'
                  ? 'border-tv-blue text-tv-blue'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              Frame Upscale
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'preview' && (
          <TVPreviewDashboard 
            uploadedImage={uploadedImage}
            onImageUpload={handleImageUpload}
          />
        )}
        {activeTab === 'compress' && (
          <SmartCompressor />
        )}
        {activeTab === 'upscale' && (
          <FrameUpscaler />
        )}
      </div>
    </div>
  )
}
