'use client';

import React, { useState, useCallback } from 'react';
import { 
  Upload, 
  Download, 
  Loader2, 
  CheckCircle, 
  AlertTriangle,
  Image as ImageIcon,
  Zap,
  Settings,
  ArrowRight
} from 'lucide-react';

interface UpscaleOptions {
  scale: number;
  model: 'standard' | 'ultra';
}

interface UpscaleResult {
  url: string;
  originalSize: number;
  newSize: number;
  processingTime: number;
}

class LetsEnhanceProvider {
  private apiKey: string;
  private baseUrl = 'https://api.letsenhance.io/v1.0';
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async enhance(imageFile: File, options: UpscaleOptions): Promise<string> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('scale', options.scale.toString());
    formData.append('model', options.model);
    
    const response = await fetch(`${this.baseUrl}/enhance`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Enhancement failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    return await this.pollForResult(result.task_id);
  }
  
  private async pollForResult(taskId: string): Promise<string> {
    const maxAttempts = 30;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const response = await fetch(`${this.baseUrl}/status/${taskId}`, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      
      const status = await response.json();
      
      if (status.status === 'completed') {
        return status.result_url;
      }
      
      if (status.status === 'failed') {
        throw new Error('Enhancement processing failed');
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      attempts++;
    }
    
    throw new Error('Enhancement timeout');
  }
}

export default function LetsEnhanceUpscaler() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<UpscaleResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState<UpscaleOptions>({
    scale: 2,
    model: 'standard'
  });

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResult(null);
      setError(null);
      setProgress(0);
    }
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResult(null);
      setError(null);
      setProgress(0);
    }
  }, []);

  const handleUpscale = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      const startTime = Date.now();
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 1000);

      const provider = new LetsEnhanceProvider(process.env.REACT_APP_LETSENHANCE_API_KEY || 'demo-key');
      const resultUrl = await provider.enhance(selectedFile, options);
      
      clearInterval(progressInterval);
      setProgress(100);

      const processingTime = Date.now() - startTime;
      
      setResult({
        url: resultUrl,
        originalSize: selectedFile.size,
        newSize: selectedFile.size * options.scale * options.scale, // Estimated
        processingTime
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upscaling failed');
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result?.url) {
      const link = document.createElement('a');
      link.href = result.url;
      link.download = `upscaled_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <ImageIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Upscaling</h3>
            <p className="text-sm text-gray-500">Powered by Let's Enhance API</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Zap className="w-3 h-3" />
          $9/month
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scale Factor
          </label>
          <select
            value={options.scale}
            onChange={(e) => setOptions(prev => ({ ...prev, scale: Number(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={2}>2x</option>
            <option value={4}>4x</option>
            <option value={6}>6x</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quality Model
          </label>
          <select
            value={options.model}
            onChange={(e) => setOptions(prev => ({ ...prev, model: e.target.value as 'standard' | 'ultra' }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="standard">Standard (Fast)</option>
            <option value="ultra">Ultra (Best Quality)</option>
          </select>
        </div>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="upscale-file-input"
        />
        <label htmlFor="upscale-file-input" className="cursor-pointer">
          {selectedFile ? (
            <div className="space-y-2">
              <ImageIcon className="w-12 h-12 text-blue-600 mx-auto" />
              <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="text-sm font-medium text-gray-900">Drop image here or click to upload</p>
              <p className="text-xs text-gray-500">Supports JPG, PNG, WebP</p>
            </div>
          )}
        </label>
      </div>

      {/* Action Button */}
      <button
        onClick={handleUpscale}
        disabled={!selectedFile || isProcessing}
        className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Upscaling...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            Upscale Image
          </>
        )}
      </button>

      {/* Progress */}
      {isProcessing && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Processing...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle className="w-4 h-4" />
            Upscaling completed successfully!
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Original Size:</span>
              <span className="ml-2 font-medium">
                {(result.originalSize / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
            <div>
              <span className="text-gray-500">Processing Time:</span>
              <span className="ml-2 font-medium">
                {(result.processingTime / 1000).toFixed(1)}s
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Result
            </button>
          </div>
        </div>
      )}
    </div>
  );
}