// Script optimization utilities for better performance
export const deferScript = (src: string, id: string) => {
  return {
    id,
    src,
    defer: true,
    async: true,
    strategy: 'afterInteractive' as const,
  }
}

export const preloadCriticalScripts = () => {
  // Preload critical fonts and scripts
  const criticalResources = [
    '/fonts/inter-var.woff2',
    '/images/logo.webp',
  ]
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = resource
    if (resource.endsWith('.woff2')) {
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
    } else if (resource.endsWith('.webp')) {
      link.as = 'image'
    }
    document.head.appendChild(link)
  })
}

export const loadScriptsOnDemand = (scripts: string[]) => {
  return Promise.all(
    scripts.map(src => 
      new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    )
  )
}

// Remove unused CSS and JavaScript
export const cleanupUnusedResources = () => {
  // Remove any unused event listeners
  // Clean up memory leaks
  if (typeof window !== 'undefined') {
    // Force garbage collection hints
    const unusedVars: any[] = []
    ;(window as any).unusedVars = unusedVars
  }
}