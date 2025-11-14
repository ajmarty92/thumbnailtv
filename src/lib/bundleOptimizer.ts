// Bundle optimization utilities
export const preloadEssentialResources = () => {
  // Only preload critical resources
  const essentialResources = [
    { href: '/images/logo.webp', as: 'image' },
    { href: 'https://fonts.googleapis.com', as: 'fetch', crossorigin: 'anonymous' },
  ]
  
  essentialResources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    Object.assign(link, resource)
    document.head.appendChild(link)
  })
}

export const deferNonCriticalLoading = () => {
  // Use requestIdleCallback to defer non-critical tasks
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Load analytics, chat widgets, etc. here
      console.log('Loading non-critical resources...')
    }, { timeout: 2000 })
  }
}

export const optimizeEventListeners = () => {
  // Use passive event listeners where possible
  const options = { passive: true, capture: false }
  
  // Optimize scroll listeners
  const optimizedScrollHandler = (callback: Function) => {
    let ticking = false
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback()
          ticking = false
        })
        ticking = true
      }
    }
  }
  
  return { optimizedScrollHandler }
}

// Memory management
export const cleanupMemory = () => {
  // Clear unnecessary data from memory
  if ('gc' in window) {
    // Force garbage collection if available
    ;(window as any).gc()
  }
}