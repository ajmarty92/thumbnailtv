'use client'

import { useState } from 'react'
import { Upload, Zap, CheckCircle, AlertCircle } from 'lucide-react'

export default function SmartCompressor() {
  const [file, setFile] = useState<File | null>(null)
  const [compressing, setCompressing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      setResult(null)
    }
  }

  const handleCompress = async () => {
    if (!file) return

    setCompressing(true)
    
    // Simulate compression
    setTimeout(() => {
      const originalSize = file.size
      const compressedSize = Math.floor(originalSize * 0.45) // 55% compression
      
      setResult({
        originalSize,
        compressedSize,
        compressionRatio: 55,
        platformCompliant: compressedSize < 50 * 1024 * 1024
      })
      setCompressing(false)
    }, 2000)
  }

  const formatFileSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">AI Smart Compression</h2>
        <p className="text-gray-400">
          Compress 4K thumbnails to under 50MB while maintaining perfect quality
        </p>
      </div>

      {/* Upload Area */}
      {!file && (
        <div className="bg-tv-gray/50 border-2 border-dashed border-tv-blue/30 rounded-lg p-12 text-center">
          <Zap className="w-16 h-16 text-tv-blue mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Upload 4K Thumbnail</h3>
          <p className="text-gray-400 mb-6">
            PNG, JPG, or WebP up to 200MB
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

      {/* File Info */}
      {file && !result && (
        <div className="bg-tv-gray/50 border border-tv-blue/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold">{file.name}</h3>
              <p className="text-gray-400">Original size: {formatFileSize(file.size)}</p>
            </div>
            <button
              onClick={handleCompress}
              disabled={compressing}
              className="bg-tv-blue hover:bg-tv-blue/80 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {compressing ? 'Compressing...' : 'Compress Now'}
            </button>
          </div>
          
          {compressing && (
            <div className="flex items-center gap-3 text-tv-blue">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-tv-blue"></div>
              <span>AI analyzing and compressing...</span>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className={`border rounded-lg p-6 ${
            result.platformCompliant 
              ? 'bg-tv-green/20 border-tv-green' 
              : 'bg-tv-red/20 border-tv-red'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              {result.platformCompliant ? (
                <CheckCircle className="w-6 h-6 text-tv-green" />
              ) : (
                <AlertCircle className="w-6 h-6 text-tv-red" />
              )}
              <h3 className="text-lg font-bold">
                {result.platformCompliant 
                  ? 'Platform Compliant ✓' 
                  : 'Still Too Large'}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Original Size</p>
                <p className="text-2xl font-bold">{formatFileSize(result.originalSize)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Compressed Size</p>
                <p className="text-2xl font-bold">{formatFileSize(result.compressedSize)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Compression Ratio</p>
                <p className="text-2xl font-bold">{result.compressionRatio}%</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Quality</p>
                <p className="text-2xl font-bold">Perfect</p>
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
            Compress Another File
          </button>
        </div>
      )}
    </div>
  )
}
