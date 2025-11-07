'use client';

import React, { useState } from 'react';
import { 
  Image as ImageIcon,
  Wand2,
  Gauge,
  Play,
  Settings,
  BarChart3,
  DollarSign,
  Zap,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import LetsEnhanceUpscaler from './LetsEnhanceUpscaler';
import StabilityAIGenerativeFill from './StabilityAIGenerativeFill';
import SmartLoopCompressor from './SmartLoopCompressor';

interface UsageMetrics {
  upscalingCost: number;
  generativeFillCost: number;
  compressionCost: number;
  totalCost: number;
}

export default function ValidationAIEditor() {
  const [activeTab, setActiveTab] = useState<'upscaling' | 'generative' | 'compression'>('upscaling');
  const [metrics, setMetrics] = useState<UsageMetrics>({
    upscalingCost: 9, // Fixed monthly cost
    generativeFillCost: 0,
    compressionCost: 0,
    totalCost: 9
  });

  const updateMetrics = (feature: keyof UsageMetrics, cost: number) => {
    setMetrics(prev => {
      const newMetrics = { ...prev, [feature]: cost };
      newMetrics.totalCost = newMetrics.upscalingCost + newMetrics.generativeFillCost + newMetrics.compressionCost;
      return newMetrics;
    });
  };

  const tabs = [
    {
      id: 'upscaling' as const,
      name: 'AI Upscaling',
      icon: ImageIcon,
      description: '2x-6x image enhancement',
      provider: 'Let\'s Enhance',
      cost: '$9/month',
      color: 'blue'
    },
    {
      id: 'generative' as const,
      name: 'Generative Fill',
      icon: Wand2,
      description: 'AI-powered image editing',
      provider: 'Stability AI',
      cost: 'Pay-as-you-go',
      color: 'purple'
    },
    {
      id: 'compression' as const,
      name: 'Smart Compression',
      icon: Gauge,
      description: 'Target size optimization',
      provider: 'Smart Loop',
      cost: '$0/month',
      color: 'green'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Features Validation</h1>
                <p className="text-sm text-gray-500">Build vs. Buy Strategy Implementation</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Total Monthly Cost</div>
              <div className="text-2xl font-bold text-green-600">${metrics.totalCost}</div>
            </div>
          </div>

          {/* Strategy Overview */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Upscaling: BUY</span>
              </div>
              <p className="text-xs text-blue-700">Let's Enhance API - Fast validation</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wand2 className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Generative: BUY</span>
              </div>
              <p className="text-xs text-purple-700">Stability AI - Pay-as-you-go</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Compression: BUILD</span>
              </div>
              <p className="text-xs text-green-700">Smart Loop - 12 lines of code</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Feature Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">AI Features</h3>
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  const colors = {
                    blue: isActive ? 'bg-blue-100 text-blue-700 border-blue-200' : 'text-gray-600 hover:bg-gray-50',
                    purple: isActive ? 'bg-purple-100 text-purple-700 border-purple-200' : 'text-gray-600 hover:bg-gray-50',
                    green: isActive ? 'bg-green-100 text-green-700 border-green-200' : 'text-gray-600 hover:bg-gray-50'
                  };

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        isActive ? colors[tab.color] : 'border-transparent'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="w-4 h-4 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{tab.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{tab.description}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <DollarSign className="w-3 h-3" />
                            <span className="text-xs">{tab.cost}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Cost Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Cost Breakdown
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Upscaling</span>
                    <span className="font-medium">${metrics.upscalingCost}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Generative Fill</span>
                    <span className="font-medium">${metrics.generativeFillCost.toFixed(2)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Compression</span>
                    <span className="font-medium">${metrics.compressionCost}/mo</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-green-600">${metrics.totalCost.toFixed(2)}/mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Feature Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {tabs.find(t => t.id === activeTab)?.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Provider: {tabs.find(t => t.id === activeTab)?.provider}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activeTab === 'upscaling' ? 'bg-blue-100 text-blue-700' :
                    activeTab === 'generative' ? 'bg-purple-100 text-purple-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {activeTab === 'compression' ? 'Zero Cost' : 'API Based'}
                  </div>
                  {activeTab !== 'compression' && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Zap className="w-3 h-3" />
                      Validation Ready
                    </div>
                  )}
                </div>
              </div>

              {/* Feature Content */}
              <div className="min-h-[500px]">
                {activeTab === 'upscaling' && <LetsEnhanceUpscaler />}
                {activeTab === 'generative' && <StabilityAIGenerativeFill />}
                {activeTab === 'compression' && <SmartLoopCompressor />}
              </div>
            </div>

            {/* Strategy Benefits */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategy Benefits</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2 weeks</div>
                  <div className="text-sm text-gray-600">Time to Market</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$9/mo</div>
                  <div className="text-sm text-gray-600">Fixed Costs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">100%</div>
                  <div className="text-sm text-gray-600">Feature Validation</div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-4 text-center">
                This approach maximizes speed while minimizing cash burn - perfect for early-stage validation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}