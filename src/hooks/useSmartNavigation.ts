import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useSmartNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)

  const navigateToSection = (sectionId: string) => {
    // Check if we're on the homepage
    if (pathname === '/') {
      // On homepage: try to scroll to section
      const element = document.getElementById(sectionId)
      if (element) {
        // Section exists, scroll to it
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        return true
      } else {
        // Section doesn't exist on current page, redirect with hash
        router.push(`/#${sectionId}`)
        return false
      }
    } else {
      // Not on homepage: redirect to homepage with hash
      setIsNavigating(true)
      router.push(`/#${sectionId}`)
      
      // Reset navigation state after delay
      setTimeout(() => {
        setIsNavigating(false)
      }, 2000)
      
      return false
    }
  }

  // Handle hash navigation on page load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash && pathname === '/') {
        // Remove the # and scroll to section
        const sectionId = hash.replace('#', '')
        setTimeout(() => {
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 100) // Small delay to ensure DOM is ready
      }
    }
  }, [pathname])

  return { 
    navigateToSection,
    isNavigating,
    isOnHomepage: pathname === '/'
  }
}