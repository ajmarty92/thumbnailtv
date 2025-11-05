import React from 'react'
import Navigation from '@/components/Navigation'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300">
              Last updated: November 5, 2024
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Account Information</h3>
                  <p>When you create an account, we collect your name, email address, and YouTube channel information (if you choose to connect it).</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Usage Data</h3>
                  <p>We collect information about how you use our service, including features accessed, thumbnails processed, and optimization preferences.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Technical Data</h3>
                  <p>We collect IP addresses, browser information, and device data to improve our service and prevent abuse.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <ul className="space-y-3 text-gray-300">
                <li>• To provide and maintain our TV optimization services</li>
                <li>• To process your thumbnail uploads and generate optimized versions</li>
                <li>• To communicate with you about your account and service updates</li>
                <li>• To improve our services through analytics and user feedback</li>
                <li>• To ensure security and prevent fraudulent activity</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Data Storage and Security</h2>
              <div className="space-y-4 text-gray-300">
                <p>Your thumbnail files are stored securely on our servers and are automatically deleted after 30 days unless you choose to save them to your account.</p>
                <p>We use industry-standard encryption and security measures to protect your data from unauthorized access.</p>
                <p>We never share your personal information with third parties for marketing purposes.</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Access and Correction</h3>
                  <p>You can access, update, or delete your personal information at any time through your account settings.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Data Portability</h3>
                  <p>You can request a copy of your data in a machine-readable format.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Account Deletion</h3>
                  <p>You can delete your account and all associated data at any time. We'll process deletion requests within 30 days.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
              <div className="space-y-4 text-gray-300">
                <p>We use third-party services to help us operate our business:</p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Payment Processors:</strong> Stripe for subscription billing</li>
                  <li>• <strong>Analytics:</strong> Google Analytics to improve our service</li>
                  <li>• <strong>Customer Support:</strong> Intercom for help desk functionality</li>
                  <li>• <strong>AI Services:</strong> OpenAI and Stability AI for image processing</li>
                </ul>
                <p>These services have their own privacy policies and we encourage you to review them.</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
              <p className="text-gray-300">
                Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. 
                If we become aware that we have collected such information, we will delete it immediately.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
              <p className="text-gray-300">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy 
                on this page and updating the "Last updated" date at the top.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <div className="space-y-2 text-gray-300">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <p>Email: privacy@thumbnailtv.io</p>
                <p>Address: 123 Creator Street, San Francisco, CA 94102</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}