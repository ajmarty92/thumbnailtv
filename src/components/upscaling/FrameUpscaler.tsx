'use client'

import { useState } from 'react'
import { Upload, Sparkles, CheckCircle } from 'lucide-react'

export default function FrameUpscaler() {
  const [file, setFile] = useState<File | null>(null)
  const [upscaling, setUpscaling] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [resolution, setResolution] = useState('4k')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      setResult(null)
    }
  }

  const handleUpscale = async () => {
    if (!file) return

    setUpscaling(true)
    
    // Simulate upscaling
    setTimeout(() => {
      setResult({
        originalResolution: '1920x1080',
        targetResolution: resolution === '4k' ? '3840x2160' : '7680x4320',
        enhancements: ['Face Enhancement', 'Text Sharpening', 'Noise Reduction']
      })
      setUpscaling(false)
    }, 3000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Frame-to-Thumbnail Upscaler</h2>
        <p className="text-gray-400">
          Extract perfect video moments and upscale to 4K/8K with AI enhancement
        </p>
      </div>

      {/* Upload Area */}
      {!file && (
        <div className="bg-tv-gray/50 border-2 border-dashed border-tv-blue/30 rounded-lg p-12 text-center">
          <Sparkles className="w-16 h-16 text-tv-blue mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Upload Video Frame</h3>
          <p className="text-gray-400 mb-6">
            Extract from video or upload existing frame
          </p>
          <label className="inline-block">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="bg-tv-blue hover:bg-tv-blue/80 text-white font-bold py-3 px-6 rounded-lg cursor-pointer inline-block transition-colors">
              Choose File
            </span>
          </label>
        </div>
      )}

      {/* File Info & Settings */}
      {file && !result && (
        <div className="bg-tv-gray/50 border border-tv-blue/30 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-2">{file.name}</h3>
            <p className="text-gray-400">Ready for AI upscaling</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Target Resolution</label>
            <div className="flex gap-4">
              <button
                onClick={() => setResolution('4k')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                  resolution === '4k'
                    ? 'border-tv-blue bg-tv-blue/20 text-tv-blue'
                    : 'border-tv-gray text-gray-400 hover:border-tv-blue/50'
                }`}
              >
                4K (3840x2160)
              </button>
              <button
                onClick={() => setResolution('8k')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                  resolution === '8k'
                    ? 'border-tv-blue bg-tv-blue/20 text-tv-blue'
                    : 'border-tv-gray text-gray-400 hover:border-tv-blue/50'
                }`}
              >
                8K (7680x4320)
              </button>
            </div>
          </div>

          <button
            onClick={handleUpscale}
            disabled={upscaling}
            className="w-full bg-tv-blue hover:bg-tv-blue/80 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {upscaling ? 'Upscaling with AI...' : 'Upscale Now'}
          </button>

          {upscaling && (
            <div className="flex items-center gap-3 text-tv-blue">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-tv-blue"></div>
              <span>AI enhancing image quality...</span>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="bg-tv-green/20 border border-tv-green rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-tv-green" />
              <h3 className="text-lg font-bold">Upscaling Complete</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-400 text-sm">Original</p>
                <p className="text-xl font-bold">{result.originalResolution}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Upscaled</p>
                <p className="text-xl font-bold">{result.targetResolution}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-2">AI Enhancements Applied</p>
              <div className="flex flex-wrap gap-2">
                {result.enhancements.map((enhancement: string) => (
                  <span
                    key={enhancement}
                    className="bg-tv-blue/20 text-tv-blue px-3 py-1 rounded-full text-sm"
                  >
                    {enhancement}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setFile(null)
              setResult(null)
            }}
            className="w-full bg-tv-blue hover:bg-tv-blue/80 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Upscale Another Frame
          </button>
        </div>
      )}
    </div>
  )
}
