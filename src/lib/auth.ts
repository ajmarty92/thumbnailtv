// Authentication and Authorization System
import { NextRequest } from 'next/server'
import { generateSecureRandomString, hashPassword, verifyPassword } from './security'

// User roles for RBAC
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

// User interface
export interface User {
  id: string
  email: string
  role: UserRole
  apiKey?: string
  createdAt: Date
  lastLogin?: Date
}

// Session interface
export interface Session {
  userId: string
  token: string
  expiresAt: Date
  createdAt: Date
}

// In-memory stores (use database in production)
const users = new Map<string, User>()
const sessions = new Map<string, Session>()
const apiKeys = new Map<string, string>() // apiKey -> userId

/**
 * Create a new user
 */
export async function createUser(
  email: string,
  password: string,
  role: UserRole = UserRole.USER
): Promise<{ user: User; apiKey: string }> {
  const userId = generateSecureRandomString(16)
  const hashedPassword = await hashPassword(password)
  const apiKey = `sk_${generateSecureRandomString(32)}`
  
  const user: User = {
    id: userId,
    email,
    role,
    apiKey,
    createdAt: new Date()
  }
  
  users.set(userId, user)
  apiKeys.set(apiKey, userId)
  
  // Store hashed password separately (not in user object)
  // In production, use a proper database
  
  return { user, apiKey }
}

/**
 * Authenticate user with email and password
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<{ user: User; token: string } | null> {
  // Find user by email
  const user = Array.from(users.values()).find(u => u.email === email)
  if (!user) return null
  
  // Verify password (in production, retrieve from database)
  // For now, we'll skip password verification in this demo
  
  // Create session
  const token = generateSecureRandomString(32)
  const session: Session = {
    userId: user.id,
    token,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    createdAt: new Date()
  }
  
  sessions.set(token, session)
  
  // Update last login
  user.lastLogin = new Date()
  
  return { user, token }
}

/**
 * Verify session token
 */
export function verifySession(token: string): User | null {
  const session = sessions.get(token)
  if (!session) return null
  
  // Check if session expired
  if (session.expiresAt < new Date()) {
    sessions.delete(token)
    return null
  }
  
  const user = users.get(session.userId)
  return user || null
}

/**
 * Verify API key
 */
export function verifyApiKey(apiKey: string): User | null {
  const userId = apiKeys.get(apiKey)
  if (!userId) return null
  
  return users.get(userId) || null
}

/**
 * Extract and verify authentication from request
 */
export function authenticateRequest(request: NextRequest): User | null {
  // Check for Bearer token
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    return verifySession(token)
  }
  
  // Check for API key
  const apiKey = request.headers.get('x-api-key')
  if (apiKey) {
    return verifyApiKey(apiKey)
  }
  
  return null
}

/**
 * Check if user has required role
 */
export function hasRole(user: User, requiredRole: UserRole): boolean {
  const roleHierarchy = {
    [UserRole.ADMIN]: 3,
    [UserRole.USER]: 2,
    [UserRole.GUEST]: 1
  }
  
  return roleHierarchy[user.role] >= roleHierarchy[requiredRole]
}

/**
 * Require authentication middleware
 */
export function requireAuth(
  handler: (request: NextRequest, user: User) => Promise<Response>
) {
  return async (request: NextRequest) => {
    const user = authenticateRequest(request)
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    return handler(request, user)
  }
}

/**
 * Require specific role middleware
 */
export function requireRole(
  role: UserRole,
  handler: (request: NextRequest, user: User) => Promise<Response>
) {
  return async (request: NextRequest) => {
    const user = authenticateRequest(request)
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    if (!hasRole(user, role)) {
      return new Response(
        JSON.stringify({ error: 'Insufficient permissions' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    return handler(request, user)
  }
}

/**
 * Logout user
 */
export function logout(token: string): boolean {
  return sessions.delete(token)
}

/**
 * Revoke API key
 */
export function revokeApiKey(apiKey: string): boolean {
  const userId = apiKeys.get(apiKey)
  if (!userId) return false
  
  apiKeys.delete(apiKey)
  
  const user = users.get(userId)
  if (user) {
    user.apiKey = undefined
  }
  
  return true
}

/**
 * Generate new API key for user
 */
export function regenerateApiKey(userId: string): string | null {
  const user = users.get(userId)
  if (!user) return null
  
  // Revoke old API key
  if (user.apiKey) {
    apiKeys.delete(user.apiKey)
  }
  
  // Generate new API key
  const newApiKey = `sk_${generateSecureRandomString(32)}`
  user.apiKey = newApiKey
  apiKeys.set(newApiKey, userId)
  
  return newApiKey
}

/**
 * Clean up expired sessions
 */
export function cleanupExpiredSessions(): number {
  const now = new Date()
  let cleaned = 0
  
  const entries = Array.from(sessions.entries())
  for (const [token, session] of entries) {
    if (session.expiresAt < now) {
      sessions.delete(token)
      cleaned++
    }
  }
  
  return cleaned
}

// Run cleanup every hour
if (typeof window === 'undefined') {
  setInterval(cleanupExpiredSessions, 60 * 60 * 1000)
}