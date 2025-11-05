'use client'
import React from 'react'
import Navigation from '@/components/Navigation'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300">
              Last updated: November 5, 2024
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using ThumbnailTV ("the Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  ThumbnailTV is an AI-powered TV optimization suite that helps YouTube creators optimize their thumbnails 
                  for Smart TV viewing. Our service includes:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• TV platform previews and analysis</li>
                  <li>• AI-powered image compression and upscaling</li>
                  <li>• Design tools and templates</li>
                  <li>• Analytics and performance tracking</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Registration</h3>
                  <p>You must provide accurate and complete information to create an account. You are responsible for safeguarding your password.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Account Security</h3>
                  <p>You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Account Termination</h3>
                  <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">4. Subscription Plans and Payment</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Billing</h3>
                  <p>Subscription fees are billed in advance on a monthly basis. All fees are non-refundable except as required by law.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Plan Changes</h3>
                  <p>You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Cancellation</h3>
                  <p>You can cancel your subscription at any time. You'll retain access until the end of your current billing period.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Free Trial</h3>
                  <p>New users get a 7-day free trial. No credit card required for trial sign-up.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">5. Acceptable Use</h2>
              <div className="space-y-4 text-gray-300">
                <p>You agree to use our service only for lawful purposes and in accordance with these terms. You may not:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Use the service to create inappropriate or harmful content</li>
                  <li>• Attempt to reverse engineer our AI algorithms</li>
                  <li>• Use automated tools to abuse our service limits</li>
                  <li>• Share your account credentials with others</li>
                  <li>• Violate YouTube's terms of service</li>
                  <li>• Infringe on intellectual property rights</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Your Content</h3>
                  <p>You retain ownership of all thumbnails and content you create using our service. You grant us a license to process and store your content only to provide the service.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Our Content</h3>
                  <p>All ThumbnailTV trademarks, logos, and service marks remain our property. You may not use them without our written permission.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">7. Service Availability</h2>
              <div className="space-y-4 text-gray-300">
                <p>We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We may schedule maintenance windows and will notify you in advance when possible.</p>
                <p>We are not liable for any losses resulting from service interruptions.</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                To the maximum extent permitted by law, ThumbnailTV shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses, resulting from your use of the service.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">9. Indemnification</h2>
              <p className="text-gray-300 leading-relaxed">
                You agree to defend, indemnify, and hold harmless ThumbnailTV and its affiliates from and against 
                any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses 
                (including but not limited to attorney's fees).
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law</h2>
              <p className="text-gray-300">
                These terms shall be interpreted and governed by the laws of the State of California, 
                United States, without regard to its conflict of law provisions.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Terms</h2>
              <p className="text-gray-300">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. 
                Your continued use of the service constitutes acceptance of any changes.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">12. Contact Information</h2>
              <div className="space-y-2 text-gray-300">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <p>Email: legal@thumbnailtv.io</p>
                <p>Address: 123 Creator Street, San Francisco, CA 94102</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}