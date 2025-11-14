// Lazy-loaded demo components for better performance
'use client'

import { lazy } from 'react'

// Heavy components that should be loaded on demand
export const LazySmartLoopCompressor = lazy(() => import('./ai/SmartLoopCompressor'))
export const LazyLetsEnhanceUpscaler = lazy(() => import('./ai/LetsEnhanceUpscaler'))

// Utility function for preloading components when needed
export const preloadComponent = (componentLoader: () => Promise<any>) => {
  componentLoader()
}