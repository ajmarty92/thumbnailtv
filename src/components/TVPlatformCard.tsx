'use client'

import { TVPlatform } from '@/types/tv-platforms'

interface TVPlatformCardProps {
  platform: TVPlatform
  thumbnailUrl: string
}

export default function TVPlatformCard({ platform, thumbnailUrl }: TVPlatformCardProps) {
  return (
    <div className="bg-tv-gray/50 border border-tv-blue/30 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-tv-gray">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-tv-blue/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">{platform.icon}</span>
          </div>
          <div>
            <h3 className="font-bold">{platform.name}</h3>
            <p className="text-sm text-gray-400">{platform.marketShare}% market share</p>
          </div>
        </div>
      </div>

      <div className="relative aspect-video bg-black">
        <img
          src={thumbnailUrl}
          alt="Thumbnail preview"
          className="w-full h-full object-cover"
        />
        
        {/* Platform UI Overlay */}
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
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-400 mb-2">Safe Zone</div>
        <div className="flex gap-2 text-xs">
          <span className="bg-tv-blue/20 text-tv-blue px-2 py-1 rounded">
            {platform.safeZone.horizontal}% H
          </span>
          <span className="bg-tv-blue/20 text-tv-blue px-2 py-1 rounded">
            {platform.safeZone.vertical}% V
          </span>
        </div>
      </div>
    </div>
  )
}
