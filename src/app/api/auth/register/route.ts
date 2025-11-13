// Registration API endpoint
import { NextRequest, NextResponse } from 'next/server'
import { createUser, UserRole } from '@/lib/auth'
import { sanitizeInput, isValidEmail, checkRateLimit, logSecurityEvent } from '@/lib/security'

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    // Rate limiting: 3 registration attempts per 10 minutes
    const rateLimitCheck = checkRateLimit(`register-${ip}`, 3, 10 * 60 * 1000)
    if (!rateLimitCheck.allowed) {
      logSecurityEvent('registration_rate_limit_exceeded', { ip }, 'high')
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        { 
          status: 429,
          headers: { 'Retry-After': String(rateLimitCheck.retryAfter) }
        }
      )
    }

    const { email, password, confirmPassword } = await request.json()

    // Validate inputs
    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'Email, password, and password confirmation are required' },
        { status: 400 }
      )
    }

    // Sanitize email
    const sanitizedEmail = sanitizeInput(email)
    
    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Check password complexity
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      return NextResponse.json(
        { 
          error: 'Password must contain uppercase, lowercase, numbers, and special characters' 
        },
        { status: 400 }
      )
    }

    // Verify passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      )
    }

    // Create user
    const { user, apiKey } = await createUser(sanitizedEmail, password, UserRole.USER)

    logSecurityEvent('user_registered', { 
      ip, 
      userId: user.id,
      email: sanitizedEmail 
    }, 'low')

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      apiKey,
      message: 'Registration successful. Please save your API key securely.'
    })

  } catch (error) {
    const ip = request.ip || 'unknown'
    logSecurityEvent('registration_error', { 
      ip, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 'high')
    
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    )
  }
}