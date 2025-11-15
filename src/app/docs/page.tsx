'use client'

import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import { Code, Terminal, BookOpen, Zap, Shield, Clock, Check, ChevronRight, Copy } from 'lucide-react'

export default function DocsPage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(text)
    setTimeout(() => setCopiedEndpoint(null), 2000)
  }

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/compress',
      description: 'Compress thumbnail images while maintaining quality',
      example: {
        image_url: 'https://example.com/thumbnail.jpg',
        quality: 'high',
        max_size: '50MB'
      }
    },
    {
      method: 'POST',
      endpoint: '/api/upscale',
      description: 'Upscale images to 4K/8K resolution with AI',
      example: {
        image_url: 'https://example.com/frame.jpg',
        target_resolution: '4K',
        enhance_faces: true,
        sharpen_text: true
      }
    },
    {
      method: 'POST',
      endpoint: '/api/tv-preview',
      description: 'Generate TV platform previews with UI overlays',
      example: {
        image_url: 'https://example.com/thumbnail.jpg',
        platforms: ['google-tv', 'roku', 'samsung'],
        safe_zone_analysis: true
      }
    }
  ]

  const codeExamples = [
    {
      language: 'JavaScript',
      code: `const response = await fetch('https://api.thumbnailtv.com/compress', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    image_url: 'https://example.com/thumbnail.jpg',
    quality: 'high',
    max_size: '50MB'
  })
});

const result = await response.json();
console.log(result.compressed_url);`
    },
    {
      language: 'Python',
      code: `import requests

response = requests.post('https://api.thumbnailtv.com/compress', 
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'image_url': 'https://example.com/thumbnail.jpg',
        'quality': 'high',
        'max_size': '50MB'
    }
)

result = response.json()
print(result['compressed_url'])`
    },
    {
      language: 'cURL',
      code: `curl -X POST https://api.thumbnailtv.com/compress \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "image_url": "https://example.com/thumbnail.jpg",
    "quality": "high",
    "max_size": "50MB"
  }'`
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              API Documentation
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Integrate ThumbnailTV's powerful optimization tools into your workflow with our RESTful API.
            </p>
          </div>

          {/* Quick Start */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Zap className="w-8 h-8 text-purple-400" />
              Quick Start
            </h2>
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">1. Get Your API Key</h3>
                  <p className="text-gray-300 mb-6">
                    Sign up for a Pro Creator or Channel Manager plan to access your API key from the dashboard.
                  </p>
                  <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold">
                    Get API Key
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">2. Make Your First Request</h3>
                  <p className="text-gray-300 mb-4">
                    Use your API key to authenticate and start optimizing thumbnails programmatically.
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono">
                    <span className="text-purple-400">Authorization:</span> Bearer YOUR_API_KEY
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* API Endpoints */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Terminal className="w-8 h-8 text-purple-400" />
              API Endpoints
            </h2>
            <div className="space-y-6">
              {apiEndpoints.map((endpoint, index) => (
                <div key={index} className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded">
                        {endpoint.method}
                      </span>
                      <h3 className="text-xl font-semibold text-white font-mono">
                        {endpoint.endpoint}
                      </h3>
                    </div>
                    <button
                      onClick={() => copyToClipboard(endpoint.endpoint)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-300 mb-6">{endpoint.description}</p>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-white mb-3">Example Request:</h4>
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{JSON.stringify(endpoint.example, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Examples */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Code className="w-8 h-8 text-purple-400" />
              Code Examples
            </h2>
            <div className="space-y-8">
              {codeExamples.map((example, index) => (
                <div key={index} className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                  <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
                    <h3 className="text-lg font-semibold text-white">{example.language}</h3>
                  </div>
                  <div className="p-6">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rate Limits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Clock className="w-8 h-8 text-purple-400" />
              Rate Limits
            </h2>
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Starter Plan</h3>
                  <p className="text-3xl font-bold text-purple-400 mb-2">100</p>
                  <p className="text-gray-300">requests per hour</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Pro Creator</h3>
                  <p className="text-3xl font-bold text-purple-400 mb-2">1,000</p>
                  <p className="text-gray-300">requests per hour</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Channel Manager</h3>
                  <p className="text-3xl font-bold text-purple-400 mb-2">5,000</p>
                  <p className="text-gray-300">requests per hour</p>
                </div>
              </div>
            </div>
          </div>

          {/* Authentication */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Shield className="w-8 h-8 text-purple-400" />
              Authentication
            </h2>
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <p className="text-gray-300 mb-6">
                All API requests require authentication using a Bearer token. Include your API key in the Authorization header:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <span className="text-gray-400">Authorization:</span> Bearer YOUR_API_KEY
              </div>
              <div className="mt-6 p-4 bg-blue-600/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-300 text-sm">
                  <strong>Security Note:</strong> Never expose your API key in client-side code. Always make API requests from your backend.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mb-20">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl p-12 border border-purple-500/20">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Integrate?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Start building with our API today and bring professional TV optimization to your workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-xl">
                  <BookOpen className="w-5 h-5 inline mr-2" />
                  View Full Documentation
                </button>
                <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-lg font-semibold transition-colors border border-gray-700">
                  Get API Key
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}