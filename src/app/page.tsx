'use client'

import { useState } from 'react'
import { 
  Tv, 
  Zap, 
  Sparkles, 
  TrendingUp, 
  CheckCircle, 
  Star,
  Play,
  ArrowRight,
  MessageSquare,
  Users,
  Award,
  Eye,
  Clock,
  DollarSign
} from 'lucide-react'
import TVOptimizationSuite from '@/components/TVOptimizationSuite'

export default function Home() {
  const [showApp, setShowApp] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  if (showApp) {
    return <TVOptimizationSuite />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-tv-black via-tv-gray to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%230066cc" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-tv-blue to-tv-green rounded-lg flex items-center justify-center">
                <Tv className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-tv-blue to-tv-green bg-clip-text text-transparent">
                ThumbnailTV
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Reviews</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <button
                onClick={() => setShowApp(true)}
                className="bg-tv-blue hover:bg-tv-blue/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Try Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-tv-green/20 border border-tv-green/30 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-tv-green" />
            <span className="text-sm text-tv-green font-medium">73% of YouTube views now happen on TV</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Stop Losing Views
            </span>
            <br />
            <span className="bg-gradient-to-r from-tv-blue to-tv-green bg-clip-text text-transparent">
              on TV Screens
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your thumbnails look 🔥 on phones but 💀 on 55" TVs. 
            Fix that in 2 minutes with AI-powered TV optimization trusted by 10,000+ creators.
          </p>

          {/* Stats Bar */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-400">4.9/5 rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-tv-green">15-25%</p>
              <p className="text-sm text-gray-400">higher CTR</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-tv-blue">2-3 hours</p>
              <p className="text-sm text-gray-400">saved per video</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setShowApp(true)}
              className="bg-gradient-to-r from-tv-blue to-tv-blue/80 hover:from-tv-blue/90 hover:to-tv-blue/70 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Start Optimizing Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch 2-Min Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>10,000+ creators</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>50M+ thumbnails optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>#1 TV optimization tool</span>
            </div>
          </div>
        </div>

        {/* Before/After Demo */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">See The Difference Instantly</h2>
            <p className="text-gray-400">Your thumbnails go from "meh" to "must-click" on TV screens</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-tv-blue/20 to-tv-green/20 rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-tv-gray/50 border border-white/10 rounded-xl p-6">
                <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl">📱</span>
                </div>
                <h3 className="text-lg font-bold text-center mb-2">Phone View</h3>
                <p className="text-sm text-gray-400 text-center">Looks perfect 👌</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-tv-red/20 rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-tv-gray/50 border border-tv-red/30 rounded-xl p-6">
                <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <span className="text-6xl opacity-30">📺</span>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-2xl font-bold text-tv-red">💀</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-center mb-2 text-tv-red">TV View (Before)</h3>
                <p className="text-sm text-gray-400 text-center">Text unreadable 🙈</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-tv-green/20 to-tv-blue/20 rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-tv-gray/50 border border-tv-green/30 rounded-xl p-6">
                <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <span className="text-6xl">📺</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-tv-green/20 to-transparent"></div>
                </div>
                <h3 className="text-lg font-bold text-center mb-2 text-tv-green">TV View (After)</h3>
                <p className="text-sm text-gray-400 text-center">Crystal clear! 🔥</p>
              </div>
            </div>
          </div>
        </div>

        {/* Creator Testimonials */}
        <div id="testimonials" className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Creators Are Crushing It</h2>
            <p className="text-gray-400">Join thousands of YouTubers getting more views</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-tv-gray/50 to-white/5 border border-white/10 rounded-xl p-6 hover:border-tv-blue/30 transition-all">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "My views increased 20% after using ThumbnailTV. Finally, thumbnails look perfect on my 65" Samsung TV!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
                  AC
                </div>
                <div>
                  <p className="font-bold">Alex Chen</p>
                  <p className="text-sm text-gray-400">500K subs • Tech reviews</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-tv-gray/50 to-white/5 border border-white/10 rounded-xl p-6 hover:border-tv-blue/30 transition-all">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "Saved me 3 hours per video. The TV preview alone is worth 10x the price. Game-changer for serious creators!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center font-bold">
                  SJ
                </div>
                <div>
                  <p className="font-bold">Sarah Johnson</p>
                  <p className="text-sm text-gray-400">200K subs • Gaming</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-tv-gray/50 to-white/5 border border-white/10 rounded-xl p-6 hover:border-tv-blue/30 transition-all">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "The AI compression saved my channel! 4K thumbnails under 50MB with perfect quality. Absolutely essential!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center font-bold">
                  MR
                </div>
                <div>
                  <p className="font-bold">Mike Rodriguez</p>
                  <p className="text-sm text-gray-400">1M+ subs • Photography</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Features */}
        <div id="features" className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Win</h2>
            <p className="text-gray-400">Three killer features that actually move the needle</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-tv-blue/10 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-xl p-8 hover:border-tv-blue/30 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-tv-blue to-tv-blue/60 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Tv className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">TV Safe-Zone Preview</h3>
                <p className="text-gray-400 mb-6">
                  Test thumbnails on 5 major TV platforms with accurate UI overlays and AI-powered recommendations
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-tv-green" />
                    Google TV, Roku, Samsung, Apple TV, Fire TV
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-tv-green" />
                    Real-time UI overlay simulation
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-tv-green" />
                    AI issue detection & fixes
                  </li>
                </ul>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-tv-green/10 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-xl p-8 hover:border-tv-green/30 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-tv-green to-tv-green/60 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">AI Smart Compression</h3>
                <p className="text-gray-400 mb-6">
                  Compress 4K thumbnails from 100MB+ to under 50MB while maintaining perfect quality
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-tv-green" />
                    Platform compliance guaranteed
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-tv-green" />
                    Zero quality loss
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-tv-green" />
                    Instant processing
                  </li>
                </ul>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-xl p-8 hover:border-purple-500/30 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-500/60 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Frame Upscaler</h3>
                <p className="text-gray-400 mb-6">
                  Extract perfect video moments and upscale to 4K/8K with AI enhancement
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-tv-green" />
                    Face enhancement technology
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-tv-green" />
                    Text sharpening for readability
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-tv-green" />
                    4K & 8K output options
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Start Free, Scale When You Win</h2>
            <p className="text-gray-400">No credit card required • Cancel anytime</p>
          </div>

          <div className="bg-gradient-to-br from-tv-gray/50 to-white/5 border border-white/10 rounded-2xl p-8 relative">
            <div className="absolute top-4 right-4 bg-tv-green/20 border border-tv-green/30 rounded-full px-3 py-1">
              <span className="text-sm text-tv-green font-medium">Most Popular</span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Creator Pro</h3>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-5xl font-bold">$29</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-400">Perfect for serious creators</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-tv-green" />
                <span>Unlimited thumbnail optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-tv-green" />
                <span>5 TV platform testing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-tv-green" />
                <span>AI smart compression</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-tv-green" />
                <span>4K/8K upscaling</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-tv-green" />
                <span>Priority AI processing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-tv-green" />
                <span>24/7 creator support</span>
              </div>
            </div>

            <div className="bg-tv-blue/20 border border-tv-blue/30 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-tv-blue" />
                <span className="font-bold text-tv-blue">$100-150 value per video</span>
              </div>
              <p className="text-sm text-gray-300">Save 2-3 hours + increase CTR by 15-25%</p>
            </div>

            <button
              onClick={() => setShowApp(true)}
              className="w-full bg-gradient-to-r from-tv-blue to-tv-blue/80 hover:from-tv-blue/90 hover:to-tv-blue/70 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105"
            >
              Start Your 7-Day Free Trial
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
              No credit card required • 50 free AI credits included
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-tv-red/20 to-tv-red/10 border border-tv-red/30 rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Stop Losing Views?</h2>
            <p className="text-xl text-gray-300 mb-6">
              Join 10,000+ creators who optimized their thumbnails for TV screens
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-tv-red" />
                <span>Limited time: 50% off first month</span>
              </div>
              <div className="text-tv-red">•</div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-tv-red" />
                <span>Only 24 hours left</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setShowApp(true)}
                className="bg-gradient-to-r from-tv-blue to-tv-blue/80 hover:from-tv-blue/90 hover:to-tv-blue/70 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 flex items-center gap-2"
              >
                Start Optimizing Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle className="w-4 h-4 text-tv-green" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-tv-blue to-tv-green rounded-lg flex items-center justify-center">
                <Tv className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">ThumbnailTV</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 ThumbnailTV. Made with ❤️ for creators.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
