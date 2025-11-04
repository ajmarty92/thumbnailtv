export interface TVPlatform {
  id: string
  name: string
  icon: string
  marketShare: number
  uiOverlay: {
    top: number
    bottom: number
    left: number
    right: number
  }
  safeZone: {
    horizontal: number
    vertical: number
  }
}

export const tvPlatforms: TVPlatform[] = [
  {
    id: 'google-tv',
    name: 'Google TV',
    icon: '📺',
    marketShare: 28,
    uiOverlay: { top: 15, bottom: 20, left: 8, right: 8 },
    safeZone: { horizontal: 85, vertical: 70 }
  },
  {
    id: 'roku',
    name: 'Roku',
    icon: '🟣',
    marketShare: 25,
    uiOverlay: { top: 12, bottom: 18, left: 10, right: 10 },
    safeZone: { horizontal: 80, vertical: 72 }
  },
  {
    id: 'samsung-tv',
    name: 'Samsung TV',
    icon: '📱',
    marketShare: 20,
    uiOverlay: { top: 18, bottom: 22, left: 12, right: 12 },
    safeZone: { horizontal: 78, vertical: 65 }
  },
  {
    id: 'apple-tv',
    name: 'Apple TV',
    icon: '🍎',
    marketShare: 15,
    uiOverlay: { top: 10, bottom: 15, left: 8, right: 8 },
    safeZone: { horizontal: 85, vertical: 75 }
  },
  {
    id: 'fire-tv',
    name: 'Fire TV',
    icon: '🔥',
    marketShare: 12,
    uiOverlay: { top: 14, bottom: 20, left: 10, right: 10 },
    safeZone: { horizontal: 82, vertical: 68 }
  }
]
