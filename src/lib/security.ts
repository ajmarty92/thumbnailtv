// Security Utilities
import crypto from 'crypto'

/**
 * Input Sanitization - Prevents XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''
  
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

/**
 * Validate Email Format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL Format
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Generate CSRF Token
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Verify CSRF Token
 */
export function verifyCsrfToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(storedToken)
  )
}

/**
 * Hash Password (use bcrypt in production)
 */
export async function hashPassword(password: string): Promise<string> {
  // In production, use bcrypt or argon2
  // For now, using crypto as placeholder
  return crypto
    .createHash('sha256')
    .update(password + process.env.PASSWORD_SALT)
    .digest('hex')
}

/**
 * Verify Password
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const hash = await hashPassword(password)
  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(hashedPassword)
  )
}

/**
 * Generate API Key
 */
export function generateApiKey(): string {
  return `sk_${crypto.randomBytes(32).toString('hex')}`
}

/**
 * Validate API Key Format
 */
export function isValidApiKey(apiKey: string): boolean {
  return /^sk_[a-f0-9]{64}$/.test(apiKey)
}

/**
 * Encrypt Sensitive Data
 */
export function encryptData(data: string, key: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(key.padEnd(32, '0').slice(0, 32)),
    iv
  )
  
  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  return iv.toString('hex') + ':' + encrypted
}

/**
 * Decrypt Sensitive Data
 */
export function decryptData(encryptedData: string, key: string): string {
  const parts = encryptedData.split(':')
  const iv = Buffer.from(parts[0], 'hex')
  const encrypted = parts[1]
  
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(key.padEnd(32, '0').slice(0, 32)),
    iv
  )
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  
  return decrypted
}

/**
 * Validate File Upload
 */
export function validateFileUpload(
  file: File,
  maxSize: number = 10 * 1024 * 1024, // 10MB default
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp']
): { valid: boolean; error?: string } {
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${maxSize / 1024 / 1024}MB limit`
    }
  }
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} not allowed`
    }
  }
  
  return { valid: true }
}

/**
 * Generate Secure Random String
 */
export function generateSecureRandomString(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

/**
 * Validate Image Data URL
 */
export function isValidImageDataUrl(dataUrl: string): boolean {
  const regex = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/
  return regex.test(dataUrl)
}

/**
 * Sanitize Filename
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .slice(0, 255)
}

/**
 * Check for SQL Injection Patterns
 */
export function containsSqlInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
    /(--|\*|;|'|"|\||&)/g,
    /(\bOR\b|\bAND\b).*?=/gi
  ]
  
  return sqlPatterns.some(pattern => pattern.test(input))
}

/**
 * Validate JSON Input
 */
export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

/**
 * Rate Limit Check (simple in-memory implementation)
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs })
    return { allowed: true }
  }
  
  if (record.count >= maxRequests) {
    return {
      allowed: false,
      retryAfter: Math.ceil((record.resetTime - now) / 1000)
    }
  }
  
  record.count++
  return { allowed: true }
}

/**
 * Log Security Event
 */
export function logSecurityEvent(
  event: string,
  details: Record<string, any>,
  severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    severity,
    details,
    environment: process.env.NODE_ENV
  }
  
  // In production, send to logging service (e.g., Sentry, LogRocket)
  console.warn('[SECURITY]', JSON.stringify(logEntry))
  
  // For critical events, you might want to send alerts
  if (severity === 'critical') {
    // Send alert to admin/security team
    console.error('[CRITICAL SECURITY EVENT]', logEntry)
  }
}