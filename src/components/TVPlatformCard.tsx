'use client'

import { TVPlatform } from '@/types/tv-platforms'
import { AlertTriangle, Eye, Ruler } from 'lucide-react'

interface TVPlatformCardProps {
  platform: TVPlatform
  thumbnailUrl: string
}

export default function TVPlatformCard({ platform, thumbnailUrl }: TVPlatformCardProps) {
  // Calculate container size based on TV scale
  const containerStyle = {
    transform: `scale(${platform.scale})`,
    transformOrigin: 'center'
  }

  return (
    <div className="bg-tv-gray/50 border border-tv-blue/30 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-tv-gray">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${platform.iconColor}20` }}
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill={platform.iconColor}
              >
                <path d={platform.icon} />
              </svg>
            </div>
            <div>
              <h3 className="font-bold">{platform.name}</h3>
              <p className="text-sm text-gray-400">{platform.viewingDistance} away</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-tv-blue">{platform.screenSize}</div>
            <div className="text-xs text-gray-400">{platform.marketShare}% share</div>
          </div>
        </div>
      </div>

      {/* TV Preview with Scale */}
      <div className="p-4 bg-black flex items-center justify-center">
        <div className="relative" style={containerStyle}>
          <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl" style={{ width: '240px', height: '135px' }}>
            <img
              src={thumbnailUrl}
              alt="Thumbnail preview"
              className="w-full h-full object-cover"
            />
            
            {/* Platform UI Overlay - Different for each size */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top overlay */}
              <div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent"
                style={{ height: `${platform.uiOverlay.top}%` }}
              />
              
              {/* Bottom overlay */}
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent"
                style={{ height: `${platform.uiOverlay.bottom}%` }}
              />
              
              {/* Left overlay */}
              <div 
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-black/60 to-transparent"
                style={{ width: `${platform.uiOverlay.left}%` }}
              />
              
              {/* Right overlay */}
              <div 
                className="absolute top-0 bottom-0 right-0 bg-gradient-to-l from-black/60 to-transparent"
                style={{ width: `${platform.uiOverlay.right}%` }}
              />
            </div>

            {/* Safe Zone Indicator */}
            <div 
              className="absolute border-2 border-dashed border-tv-green/40 pointer-events-none"
              style={{
                top: `${(100 - platform.safeZone.vertical) / 2}%`,
                left: `${(100 - platform.safeZone.horizontal) / 2}%`,
                right: `${(100 - platform.safeZone.horizontal) / 2}%`,
                bottom: `${(100 - platform.safeZone.vertical) / 2}%`
              }}
            />

            {/* Screen Size Label */}
            <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs font-bold">
              {platform.screenSize}
            </div>
          </div>
        </div>
      </div>

      {/* Issues Specific to This Screen Size */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-tv-red" />
          <span className="text-sm font-bold text-tv-red">Issues at {platform.viewingDistance}</span>
        </div>
        <ul className="space-y-1">
          {platform.issues.map((issue, index) => (
            <li key={index} className="text-xs text-gray-300 flex items-start gap-2">
              <span className="text-tv-red mt-0.5">•</span>
              <span>{issue}</span>
            </li>
          ))}
        </ul>

        {/* Safe Zone Metrics */}
        <div className="mt-3 pt-3 border-t border-tv-gray flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Eye className="w-3 h-3 text-tv-blue" />
            <span className="text-gray-400">Safe Zone:</span>
          </div>
          <div className="flex gap-2">
            <span className="bg-tv-blue/20 text-tv-blue px-2 py-1 rounded">
              {platform.safeZone.horizontal}% H
            </span>
            <span className="bg-tv-blue/20 text-tv-blue px-2 py-1 rounded">
              {platform.safeZone.vertical}% V
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
