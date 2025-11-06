export const TV_PLATFORMS = {
  samsung: {
    name: 'Samsung Tizen',
    safeZone: { top: 5, bottom: 5, left: 5, right: 5 },
    popularSizes: [
      { inches: 32, resolution: { width: 1366, height: 768 } },
      { inches: 43, resolution: { width: 1920, height: 1080 } },
      { inches: 50, resolution: { width: 1920, height: 1080 } },
      { inches: 55, resolution: { width: 3840, height: 2160 } },
      { inches: 65, resolution: { width: 3840, height: 2160 } },
      { inches: 75, resolution: { width: 3840, height: 2160 } },
      { inches: 85, resolution: { width: 3840, height: 2160 } },
    ]
  },
  lg: {
    name: 'LG webOS',
    safeZone: { top: 5, bottom: 5, left: 5, right: 5 },
    popularSizes: [
      { inches: 32, resolution: { width: 1366, height: 768 } },
      { inches: 43, resolution: { width: 1920, height: 1080 } },
      { inches: 49, resolution: { width: 1920, height: 1080 } },
      { inches: 55, resolution: { width: 3840, height: 2160 } },
      { inches: 65, resolution: { width: 3840, height: 2160 } },
      { inches: 75, resolution: { width: 3840, height: 2160 } },
      { inches: 86, resolution: { width: 3840, height: 2160 } },
    ]
  },
  sony: {
    name: 'Sony Android TV',
    safeZone: { top: 5, bottom: 5, left: 5, right: 5 },
    popularSizes: [
      { inches: 32, resolution: { width: 1366, height: 768 } },
      { inches: 43, resolution: { width: 1920, height: 1080 } },
      { inches: 50, resolution: { width: 1920, height: 1080 } },
      { inches: 55, resolution: { width: 3840, height: 2160 } },
      { inches: 65, resolution: { width: 3840, height: 2160 } },
      { inches: 75, resolution: { width: 3840, height: 2160 } },
      { inches: 85, resolution: { width: 3840, height: 2160 } },
    ]
  },
  vizio: {
    name: 'Vizio SmartCast',
    safeZone: { top: 5, bottom: 5, left: 5, right: 5 },
    popularSizes: [
      { inches: 32, resolution: { width: 1366, height: 768 } },
      { inches: 40, resolution: { width: 1920, height: 1080 } },
      { inches: 50, resolution: { width: 1920, height: 1080 } },
      { inches: 55, resolution: { width: 3840, height: 2160 } },
      { inches: 65, resolution: { width: 3840, height: 2160 } },
      { inches: 75, resolution: { width: 3840, height: 2160 } },
      { inches: 85, resolution: { width: 3840, height: 2160 } },
    ]
  },
  tcl: {
    name: 'TCL Roku/Android',
    safeZone: { top: 5, bottom: 5, left: 5, right: 5 },
    popularSizes: [
      { inches: 32, resolution: { width: 1366, height: 768 } },
      { inches: 43, resolution: { width: 1920, height: 1080 } },
      { inches: 50, resolution: { width: 1920, height: 1080 } },
      { inches: 55, resolution: { width: 3840, height: 2160 } },
      { inches: 65, resolution: { width: 3840, height: 2160 } },
      { inches: 75, resolution: { width: 3840, height: 2160 } },
      { inches: 85, resolution: { width: 3840, height: 2160 } },
    ]
  }
} as const

export type TVPlatform = keyof typeof TV_PLATFORMS