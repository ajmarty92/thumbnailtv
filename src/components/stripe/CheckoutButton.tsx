'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { createCheckoutSession, PRICES } from '@/lib/stripe'

interface CheckoutButtonProps {
  plan: 'starter' | 'pro' | 'manager'
  billing: 'monthly' | 'yearly'
  className?: string
  children: React.ReactNode
}

export default function CheckoutButton({ plan, billing, className, children }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    
    try {
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      
      if (!stripe) {
        throw new Error('Failed to load Stripe')
      }

      const priceId = PRICES[plan][billing]
      const session = await createCheckoutSession(priceId)
      
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      })

      if (result.error) {
        console.error('Stripe redirect error:', result.error)
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}