// Secure Stripe Webhook Handler
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { logSecurityEvent } from '@/lib/security'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      logSecurityEvent('stripe_webhook_no_signature', {}, 'high')
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      logSecurityEvent('stripe_webhook_verification_failed', {
        error: err instanceof Error ? err.message : 'Unknown error'
      }, 'critical')
      
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        logSecurityEvent('payment_succeeded', {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency
        }, 'low')
        // Handle successful payment
        await handlePaymentSuccess(paymentIntent)
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        logSecurityEvent('payment_failed', {
          paymentIntentId: failedPayment.id,
          error: failedPayment.last_payment_error?.message
        }, 'medium')
        // Handle failed payment
        await handlePaymentFailure(failedPayment)
        break

      case 'customer.subscription.created':
        const subscription = event.data.object as Stripe.Subscription
        logSecurityEvent('subscription_created', {
          subscriptionId: subscription.id,
          customerId: subscription.customer
        }, 'low')
        // Handle new subscription
        await handleSubscriptionCreated(subscription)
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription
        logSecurityEvent('subscription_deleted', {
          subscriptionId: deletedSubscription.id,
          customerId: deletedSubscription.customer
        }, 'low')
        // Handle subscription cancellation
        await handleSubscriptionDeleted(deletedSubscription)
        break

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice
        logSecurityEvent('invoice_payment_succeeded', {
          invoiceId: invoice.id,
          customerId: invoice.customer
        }, 'low')
        // Handle successful invoice payment
        await handleInvoicePaymentSuccess(invoice)
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice
        logSecurityEvent('invoice_payment_failed', {
          invoiceId: failedInvoice.id,
          customerId: failedInvoice.customer
        }, 'medium')
        // Handle failed invoice payment
        await handleInvoicePaymentFailure(failedInvoice)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    logSecurityEvent('stripe_webhook_error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 'critical')
    
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

// Handler functions
async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  // Update database with successful payment
  // Send confirmation email
  // Update user's subscription status
  console.log('Payment succeeded:', paymentIntent.id)
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  // Log failed payment
  // Notify user of payment failure
  // Retry logic if applicable
  console.log('Payment failed:', paymentIntent.id)
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  // Update user's subscription status in database
  // Send welcome email
  // Grant access to premium features
  console.log('Subscription created:', subscription.id)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // Update user's subscription status in database
  // Revoke access to premium features
  // Send cancellation confirmation email
  console.log('Subscription deleted:', subscription.id)
}

async function handleInvoicePaymentSuccess(invoice: Stripe.Invoice) {
  // Update billing records
  // Send receipt to customer
  console.log('Invoice payment succeeded:', invoice.id)
}

async function handleInvoicePaymentFailure(invoice: Stripe.Invoice) {
  // Notify customer of payment failure
  // Attempt to retry payment
  // Update subscription status if needed
  console.log('Invoice payment failed:', invoice.id)
}