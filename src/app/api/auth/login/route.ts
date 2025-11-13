// Login API endpoint
import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '@/lib/auth'
import { sanitizeInput, isValidEmail, checkRateLimit, logSecurityEvent } from '@/lib/security'

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    // Rate limiting: 5 login attempts per 5 minutes
    const rateLimitCheck = checkRateLimit(`login-${ip}`, 5, 5 * 60 * 1000)
    if (!rateLimitCheck.allowed) {
      logSecurityEvent('login_rate_limit_exceeded', { ip }, 'high')
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { 
          status: 429,
          headers: { 'Retry-After': String(rateLimitCheck.retryAfter) }
        }
      )
    }

    const { email, password } = await request.json()

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Sanitize email
    const sanitizedEmail = sanitizeInput(email)
    
    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      logSecurityEvent('invalid_email_format', { ip, email: sanitizedEmail }, 'low')
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Authenticate user
    const result = await authenticateUser(sanitizedEmail, password)
    
    if (!result) {
      logSecurityEvent('failed_login_attempt', { ip, email: sanitizedEmail }, 'medium')
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    logSecurityEvent('successful_login', { 
      ip, 
      userId: result.user.id,
      email: sanitizedEmail 
    }, 'low')

    return NextResponse.json({
      success: true,
      user: {
        id: result.user.id,
        email: result.user.email,
        role: result.user.role
      },
      token: result.token
    })

  } catch (error) {
    const ip = request.ip || 'unknown'
    logSecurityEvent('login_error', { 
      ip, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 'high')
    
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}