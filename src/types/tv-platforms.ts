export interface TVPlatform {
  id: string
  name: string
  icon: string
  iconColor: string
  screenSize: string // Actual screen size
  viewingDistance: string // Typical viewing distance
  scale: number // Relative scale for visual difference
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
  issues: string[] // Specific issues for this screen size
}

export const tvPlatforms: TVPlatform[] = [
  {
    id: 'tv-55',
    name: '55" Smart TV',
    icon: 'M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z',
    iconColor: '#4285F4',
    screenSize: '55"',
    viewingDistance: '8 feet',
    scale: 0.85, // Smallest visual
    marketShare: 20,
    uiOverlay: { top: 12, bottom: 16, left: 6, right: 6 },
    safeZone: { horizontal: 88, vertical: 74 },
    issues: ['Text appears small', 'Fine details lost', 'Bottom 16% often hidden']
  },
  {
    id: 'tv-65',
    name: '65" Smart TV',
    icon: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
    iconColor: '#1428A0',
    screenSize: '65"',
    viewingDistance: '10 feet',
    scale: 1.0, // Reference size
    marketShare: 25,
    uiOverlay: { top: 15, bottom: 20, left: 8, right: 8 },
    safeZone: { horizontal: 85, vertical: 70 },
    issues: ['Text barely readable', 'Logos get covered', 'UI elements block content']
  },
  {
    id: 'tv-75',
    name: '75" Smart TV',
    icon: 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z',
    iconColor: '#000000',
    screenSize: '75"',
    viewingDistance: '12 feet',
    scale: 1.15, // Larger visual
    marketShare: 30,
    uiOverlay: { top: 18, bottom: 22, left: 10, right: 10 },
    safeZone: { horizontal: 82, vertical: 66 },
    issues: ['Text becomes unreadable', 'Important content hidden', 'Color contrast issues']
  },
  {
    id: 'tv-85',
    name: '85" Smart TV',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    iconColor: '#6B46C1',
    screenSize: '85"',
    viewingDistance: '14 feet',
    scale: 1.3, // Much larger visual
    marketShare: 15,
    uiOverlay: { top: 20, bottom: 25, left: 12, right: 12 },
    safeZone: { horizontal: 78, vertical: 62 },
    issues: ['Critical text invisible', 'Logos completely covered', 'Side content lost']
  },
  {
    id: 'tv-100',
    name: '100" Smart TV',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
    iconColor: '#FF9900',
    screenSize: '100"',
    viewingDistance: '16 feet',
    scale: 1.45, // Largest visual
    marketShare: 10,
    uiOverlay: { top: 22, bottom: 28, left: 14, right: 14 },
    safeZone: { horizontal: 75, vertical: 58 },
    issues: ['Text disappears completely', 'Only center content visible', 'Extreme cropping occurs']
  }
]
