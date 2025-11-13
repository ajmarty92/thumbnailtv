// Security Middleware - Protects all routes
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Security configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100 // Max requests per window
const API_RATE_LIMIT_MAX = 20 // Stricter for API routes

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // 1. Add Security Headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https://api.stripe.com https://*.claid.ai https://*.stability.ai; " +
    "frame-src https://js.stripe.com;"
  )
  
  // 2. HTTPS Enforcement (in production)
  if (process.env.NODE_ENV === 'production' && !request.url.startsWith('https://')) {
    return NextResponse.redirect(request.url.replace('http://', 'https://'))
  }
  
  // 3. Rate Limiting
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/')
  
  const rateLimit = isApiRoute ? API_RATE_LIMIT_MAX : RATE_LIMIT_MAX_REQUESTS
  const rateLimitKey = `${ip}-${isApiRoute ? 'api' : 'web'}`
  
  const now = Date.now()
  const userRateLimit = rateLimitStore.get(rateLimitKey)
  
  if (userRateLimit) {
    if (now < userRateLimit.resetTime) {
      if (userRateLimit.count >= rateLimit) {
        return new NextResponse('Too Many Requests', { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((userRateLimit.resetTime - now) / 1000))
          }
        })
      }
      userRateLimit.count++
    } else {
      rateLimitStore.set(rateLimitKey, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    }
  } else {
    rateLimitStore.set(rateLimitKey, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
  }
  
  // 4. API Route Protection
  if (isApiRoute) {
    // Check for API key or authentication token
    const apiKey = request.headers.get('x-api-key')
    const authToken = request.headers.get('authorization')
    
    // For now, we'll allow requests but log them
    // In production, you should validate the API key or auth token
    if (!apiKey && !authToken) {
      console.warn(`Unauthenticated API request from ${ip} to ${request.nextUrl.pathname}`)
    }
  }
  
  return response
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}