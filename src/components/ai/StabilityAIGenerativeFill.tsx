'use client';

import React, { useState, useCallback, useRef } from 'react';
import { 
  Upload, 
  Download, 
  Loader2, 
  CheckCircle, 
  AlertTriangle,
  Image as ImageIcon,
  Wand2,
  DollarSign,
  Palette,
  Move
} from 'lucide-react';

interface GenerativeFillOptions {
  samples: number;
  steps: number;
  cfg_scale: number;
}

interface GenerativeFillResult {
  images: string[];
  processingTime: number;
  creditsUsed: number;
  estimatedCost: number;
}

class StabilityAIProvider {
  private apiKey: string;
  private baseUrl = 'https://api.stability.ai/v1beta';
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async inpaint(
    imageFile: File, 
    maskFile: File, 
    prompt: string,
    options: GenerativeFillOptions
  ): Promise<string[]> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('mask', maskFile);
    formData.append('prompt', prompt);
    formData.append('samples', options.samples.toString());
    formData.append('steps', options.steps.toString());
    formData.append('cfg_scale', options.cfg_scale.toString());
    
    const response = await fetch(`${this.baseUrl}/stable-image/edit/inpaint`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'application/json'
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Inpainting failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.artifacts.map((artifact: any) => artifact.base64);
  }
  
  // Cost tracking: 5 credits per inpaint operation
  calculateCost(samples: number): { credits: number; cost: number } {
    const creditsPerSample = 5;
    const totalCredits = samples * creditsPerSample;
    const costPerCredit = 0.01; // $0.01 per credit
    return {
      credits: totalCredits,
      cost: totalCredits * costPerCredit
    };
  }
}

export default function StabilityAIGenerativeFill() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [maskFile, setMaskFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<GenerativeFillResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<GenerativeFillOptions>({
    samples: 1,
    steps: 20,
    cfg_scale: 7
  });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleImageSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setResults(null);
      setError(null);
    }
  }, []);

  const handleMaskSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setMaskFile(file);
    }
  }, []);

  // Simple mask drawing on canvas
  const startDrawing = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!imageFile) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, [imageFile]);

  const draw = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !imageFile) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.stroke();
  }, [isDrawing, imageFile]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const loadImageToCanvas = useCallback(() => {
    if (!imageFile || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = URL.createObjectURL(imageFile);
  }, [imageFile]);

  React.useEffect(() => {
    loadImageToCanvas();
  }, [imageFile, loadImageToCanvas]);

  const handleGenerativeFill = async () => {
    if (!imageFile || !prompt.trim()) return;

    setIsProcessing(true);
    setError(null);

    try {
      const startTime = Date.now();
      
      // Create mask from canvas or use uploaded mask
      let maskToUse = maskFile;
      if (!maskToUse && canvasRef.current) {
        // Convert canvas to blob as mask
        const blob = await new Promise<Blob>((resolve) => {
          canvasRef.current?.toBlob((blob) => {
            resolve(blob!);
          }, 'image/png');
        });
        maskToUse = new File([blob], 'mask.png', { type: 'image/png' });
      }

      if (!maskToUse) {
        throw new Error('Please upload a mask file or draw on the image');
      }

      const provider = new StabilityAIProvider(process.env.REACT_APP_STABILITY_API_KEY || 'demo-key');
      const images = await provider.inpaint(imageFile, maskToUse, prompt, options);
      
      const processingTime = Date.now() - startTime;
      const costInfo = provider.calculateCost(options.samples);

      setResults({
        images: images.map(base64 => `data:image/png;base64,${base64}`),
        processingTime,
        creditsUsed: costInfo.credits,
        estimatedCost: costInfo.cost
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generative fill failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (imageUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generative_fill_${index + 1}_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Wand2 className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Generative Fill</h3>
            <p className="text-sm text-gray-500">Powered by Stability AI</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <DollarSign className="w-3 h-3" />
          Pay-as-you-go
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Samples
          </label>
          <select
            value={options.samples}
            onChange={(e) => setOptions(prev => ({ ...prev, samples: Number(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value={1}>1 Sample ($0.05)</option>
            <option value={2}>2 Samples ($0.10)</option>
            <option value={4}>4 Samples ($0.20)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Steps
          </label>
          <select
            value={options.steps}
            onChange={(e) => setOptions(prev => ({ ...prev, steps: Number(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value={10}>10 (Fast)</option>
            <option value={20}>20 (Balanced)</option>
            <option value={30}>30 (Quality)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CFG Scale
          </label>
          <select
            value={options.cfg_scale}
            onChange={(e) => setOptions(prev => ({ ...prev, cfg_scale: Number(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value={5}>5 (Creative)</option>
            <option value={7}>7 (Balanced)</option>
            <option value={10}>10 (Strict)</option>
          </select>
        </div>
      </div>

      {/* Prompt */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe what to generate
        </label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., beautiful mountain landscape with sunset"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Base Image
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            id="gen-fill-image-input"
          />
          <label htmlFor="gen-fill-image-input" className="cursor-pointer">
            {imageFile ? (
              <div className="space-y-2">
                <ImageIcon className="w-8 h-8 text-purple-600 mx-auto" />
                <p className="text-sm font-medium text-gray-900">{imageFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-sm font-medium text-gray-900">Click to upload image</p>
                <p className="text-xs text-gray-500">Supports JPG, PNG, WebP</p>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Mask Creation */}
      {imageFile && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Create Mask (draw where to fill)
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="max-w-full cursor-crosshair"
              style={{ maxHeight: '300px' }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            <Move className="w-3 h-3 inline mr-1" />
            Draw with your mouse to mark areas for generative fill
          </p>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleGenerativeFill}
        disabled={!imageFile || !prompt.trim() || isProcessing}
        className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4" />
            Generate Fill
          </>
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              Generation completed!
            </div>
            <div className="text-xs text-gray-500">
              {results.creditsUsed} credits (${results.estimatedCost.toFixed(2)})
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {results.images.map((image, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt={`Generated result ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Result {index + 1}</span>
                  <button
                    onClick={() => handleDownload(image, index)}
                    className="bg-green-600 text-white py-1 px-3 rounded text-sm hover:bg-green-700 transition-colors flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}