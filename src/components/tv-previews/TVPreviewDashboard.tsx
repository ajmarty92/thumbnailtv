'use client'

import { useState } from 'react'
import { Upload, AlertCircle } from 'lucide-react'
import TVPlatformCard from '../TVPlatformCard'
import { tvPlatforms } from '@/types/tv-platforms'

interface TVPreviewDashboardProps {
  uploadedImage: string | null
  onImageUpload: (imageUrl: string) => void
}

export function TVPreviewDashboard({ uploadedImage, onImageUpload }: TVPreviewDashboardProps) {
  const [analyzing, setAnalyzing] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onImageUpload(result)
        setAnalyzing(true)
        setTimeout(() => setAnalyzing(false), 2000)
      }
      reader.readAsDataURL(file)
    }
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
        <div className="bg-tv-blue/20 border border-tv-blue rounded-lg p-4 flex items-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-tv-blue"></div>
          <span>Analyzing thumbnail across TV platforms...</span>
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

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">Real TV Screen Previews</h3>
            <p className="text-gray-400">See how your thumbnail looks on different screen sizes from typical viewing distances</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tvPlatforms.map((platform) => (
              <TVPlatformCard
                key={platform.id}
                platform={platform}
                thumbnailUrl={uploadedImage}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}