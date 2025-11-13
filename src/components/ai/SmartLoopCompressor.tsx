'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { 
  Upload, 
  Download, 
  Loader2, 
  CheckCircle, 
  AlertTriangle,
  Image as ImageIcon,
  Zap, 
  Target, 
  BarChart3, 
  Gauge,
  Settings,
  Eye,
  Brain,
  Sparkles,
  Info
} from 'lucide-react';

interface CompressionPreset {
  id: string;
  name: string;
  description: string;
  targetSizeKB: number;
  icon: React.ReactNode;
  popular: boolean;
}

interface AIAnalysis {
  recommendedFormat: 'jpeg' | 'png' | 'webp';
  recommendedQualityMode: 'balanced' | 'quality' | 'size';
  reasoning: string[];
  contentType: 'photo' | 'graphic' | 'text-heavy' | 'mixed';
  hasTransparency: boolean;
  colorComplexity: 'low' | 'medium' | 'high';
}

interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  quality: number;
  processingTime: number;
  blob: Blob;
  url: string;
  qualityScore: number;
  aiAnalysis: AIAnalysis;
}

// Popular presets for content creators
const compressionPresets: CompressionPreset[] = [
  {
    id: 'youtube-thumbnail',
    name: 'YouTube Thumbnail',
    description: 'Optimized for 1280x720 thumbnails',
    targetSizeKB: 50,
    icon: <Target className="w-4 h-4" />,
    popular: true
  },
  {
    id: 'instagram-post',
    name: 'Instagram Post',
    description: 'Perfect for square Instagram images',
    targetSizeKB: 100,
    icon: <ImageIcon className="w-4 h-4" />,
    popular: true
  },
  {
    id: 'web-banner',
    name: 'Web Banner',
    description: 'Ideal for website hero images',
    targetSizeKB: 200,
    icon: <BarChart3 className="w-4 h-4" />,
    popular: true
  },
  {
    id: 'email-attachment',
    name: 'Email Attachment',
    description: 'Optimized for email delivery',
    targetSizeKB: 150,
    icon: <Upload className="w-4 h-4" />,
    popular: false
  },
  {
    id: 'social-media',
    name: 'Social Media',
    description: 'Works across all platforms',
    targetSizeKB: 80,
    icon: <Sparkles className="w-4 h-4" />,
    popular: true
  },
  {
    id: 'custom',
    name: 'Custom Size',
    description: 'Specify your own target size',
    targetSizeKB: 100,
    icon: <Settings className="w-4 h-4" />,
    popular: false
  }
];

// AI Analysis Engine
const analyzeImageForCompression = async (file: File): Promise<AIAnalysis> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (!ctx) {
        resolve({
          recommendedFormat: 'jpeg',
          recommendedQualityMode: 'balanced',
          reasoning: ['Unable to analyze image, using defaults'],
          contentType: 'mixed',
          hasTransparency: false,
          colorComplexity: 'medium'
        });
        return;
      }
      
      // Draw image to analyze
      ctx.drawImage(img, 0, 0);
      
      // Get image data for analysis
      const imageData = ctx.getImageData(0, 0, Math.min(img.width, 100), Math.min(img.height, 100));
      const data = imageData.data;
      
      // Analyze transparency
      let hasTransparency = false;
      let transparencyPixels = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] < 255) {
          hasTransparency = true;
          transparencyPixels++;
        }
      }
      
      // Analyze color complexity
      let colorVariance = 0;
      const sampleSize = Math.min(data.length / 4, 1000);
      for (let i = 0; i < sampleSize * 4; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;
        colorVariance += Math.abs(128 - brightness);
      }
      
      const colorComplexity = colorVariance / sampleSize > 50 ? 'high' : 
                            colorVariance / sampleSize > 25 ? 'medium' : 'low';
      
      // Determine content type
      const aspectRatio = img.width / img.height;
      const isSquare = Math.abs(aspectRatio - 1) < 0.1;
      const isLandscape = aspectRatio > 1.2;
      
      let contentType: 'photo' | 'graphic' | 'text-heavy' | 'mixed' = 'mixed';
      let recommendedFormat: 'jpeg' | 'png' | 'webp' = 'jpeg';
      let recommendedQualityMode: 'balanced' | 'quality' | 'size' = 'balanced';
      let reasoning: string[] = [];
      
      // Format selection logic
      if (hasTransparency && transparencyPixels > sampleSize * 0.1) {
        recommendedFormat = 'png';
        reasoning.push('Image has transparency - using PNG format');
      } else if (colorComplexity === 'high' && !hasTransparency) {
        recommendedFormat = 'webp';
        reasoning.push('Complex colors detected - WebP provides better compression');
      } else {
        recommendedFormat = 'jpeg';
        reasoning.push('Standard image - JPEG for optimal compatibility');
      }
      
      // Quality mode selection
      if (isSquare || isLandscape) {
        recommendedQualityMode = 'balanced';
        reasoning.push('Standard aspect ratio - using balanced optimization');
      } else if (img.width < 500 || img.height < 500) {
        recommendedQualityMode = 'quality';
        reasoning.push('Small image detected - prioritizing quality preservation');
      } else {
        recommendedQualityMode = 'balanced';
        reasoning.push('Large image - using balanced optimization');
      }
      
      // Content type detection
      if (isSquare) {
        contentType = 'graphic';
        reasoning.push('Square aspect ratio - likely graphic or social media image');
      } else if (aspectRatio > 1.5) {
        contentType = 'photo';
        reasoning.push('Wide aspect ratio - likely photo or banner');
      }
      
      resolve({
        recommendedFormat,
        recommendedQualityMode,
        reasoning,
        contentType,
        hasTransparency,
        colorComplexity
      });
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Enhanced AI-Powered Smart Compression
const compressToTargetSize = async (
  imageFile: File,
  targetSizeKB: number,
  aiAnalysis: AIAnalysis
): Promise<{ blob: Blob; quality: number; size: number; qualityScore: number }> => {

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Apply AI-enhanced preprocessing based on analysis
      const enhancedCtx = enhanceImageQuality(ctx, img, aiAnalysis);
      
      const smartBinarySearch = async (low: number, high: number, iterations: number = 0): Promise<{ blob: Blob; quality: number; size: number; qualityScore: number }> => {
        if (low >= high || iterations > 10) {
          const quality = Math.max(low, 10) / 100;
          const result = optimizedCanvasToBlob(canvas, quality, aiAnalysis.recommendedFormat, enhancedCtx);
          const qualityScore = calculateQualityScore(img, result.blob, quality, aiAnalysis);
          return { blob: result.blob, quality, size: result.size, qualityScore };
        }

        const mid = Math.floor((low + high) / 2);
        const quality = Math.max(mid, 10) / 100;
        
        const result = optimizedCanvasToBlob(canvas, quality, aiAnalysis.recommendedFormat, enhancedCtx);
        const sizeKB = result.size / 1024;
        const qualityScore = calculateQualityScore(img, result.blob, quality, aiAnalysis);

        // AI-enhanced decision making based on analysis
        if (sizeKB <= targetSizeKB) {
          if (aiAnalysis.recommendedQualityMode === 'quality' && qualityScore > 0.8) {
            return { blob: result.blob, quality, size: result.size, qualityScore };
          }
          return smartBinarySearch(low, mid, iterations + 1);
        } else {
          return smartBinarySearch(mid + 1, high, iterations + 1);
        }
      };

      // Smart initial bounds based on AI analysis
      const initialQuality = getSmartInitialQuality(aiAnalysis, targetSizeKB);
      smartBinarySearch(initialQuality.low, initialQuality.high).then(resolve).catch(reject);
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(imageFile);
  });
};

// AI-driven image enhancement
const enhanceImageQuality = (ctx: CanvasRenderingContext2D | null, img: HTMLImageElement, analysis: AIAnalysis): CanvasRenderingContext2D | null => {
  if (!ctx) return ctx;

  // Apply enhancements based on AI analysis
  let filterString = '';
  
  if (analysis.contentType === 'photo') {
    filterString = 'contrast(1.05) saturate(1.02) brightness(1.01)';
  } else if (analysis.contentType === 'graphic') {
    filterString = 'contrast(1.03) saturate(1.01)';
  } else if (analysis.contentType === 'text-heavy') {
    filterString = 'contrast(1.08) brightness(1.02)';
  } else {
    filterString = 'contrast(1.05) saturate(1.02)';
  }
  
  ctx.filter = filterString;
  ctx.drawImage(img, 0, 0);
  ctx.filter = 'none';
  
  return ctx;
};

// Optimized compression based on AI analysis
const optimizedCanvasToBlob = (
  canvas: HTMLCanvasElement, 
  quality: number, 
  format: string,
  ctx: CanvasRenderingContext2D | null
): { blob: Blob; size: number } => {
  let dataUrl: string;
  
  if (format === 'webp') {
    dataUrl = canvas.toDataURL('image/webp', quality);
  } else if (format === 'png') {
    dataUrl = canvas.toDataURL('image/png');
  } else {
    // JPEG with AI-optimized quality
    dataUrl = canvas.toDataURL('image/jpeg', Math.min(quality * 1.1, 0.95));
  }
  
  const blob = dataUrlToBlob(dataUrl);
  return { blob, size: blob.size };
};

// AI-enhanced quality scoring
const calculateQualityScore = (
  originalImg: HTMLImageElement, 
  compressedBlob: Blob, 
  quality: number, 
  analysis: AIAnalysis
): number => {
  const fileSizeScore = 1 - (compressedBlob.size / (originalImg.width * originalImg.height * 3));
  const formatScore = analysis.recommendedFormat === 'webp' ? 1.1 : 
                    analysis.recommendedFormat === 'png' ? 0.9 : 1.0;
  const qualityBonus = analysis.recommendedQualityMode === 'quality' ? 0.1 : 0;
  const complexityBonus = analysis.colorComplexity === 'high' ? 0.05 : 
                        analysis.colorComplexity === 'medium' ? 0.02 : 0;
  
  return Math.min(1, (quality + fileSizeScore + formatScore + qualityBonus + complexityBonus) / 4);
};

// Smart initial quality based on AI analysis
const getSmartInitialQuality = (
  analysis: AIAnalysis,
  targetSizeKB: number
): { low: number; high: number } => {
  if (analysis.recommendedQualityMode === 'quality') {
    return { low: 70, high: 95 };
  } else if (analysis.recommendedQualityMode === 'size') {
    return { low: 25, high: 70 };
  } else { // balanced
    if (targetSizeKB > 150) {
      return { low: 50, high: 85 };
    } else if (targetSizeKB > 80) {
      return { low: 40, high: 80 };
    } else {
      return { low: 30, high: 70 };
    }
  }
};

const dataUrlToBlob = (dataUrl: string): Blob => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime || 'image/jpeg' });
};

export default function SmartLoopCompressor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<CompressionPreset>(compressionPresets[0]);
  const [customSize, setCustomSize] = useState(100);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Analyze image when file is selected
  useEffect(() => {
    if (selectedFile) {
      setIsAnalyzing(true);
      analyzeImageForCompression(selectedFile).then(analysis => {
        setAiAnalysis(analysis);
        setIsAnalyzing(false);
        setResult(null);
      });
    } else {
      setAiAnalysis(null);
      setResult(null);
    }
  }, [selectedFile]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  const handleCompress = useCallback(async () => {
    if (!selectedFile || !aiAnalysis) return;

    setCompressing(true);
    const startTime = performance.now();

    try {
      const targetSize = selectedPreset.id === 'custom' ? customSize : selectedPreset.targetSizeKB;
      const compressionResult = await compressToTargetSize(selectedFile, targetSize, aiAnalysis);
      const processingTime = (performance.now() - startTime) / 1000;

      const finalResult: CompressionResult = {
        originalSize: selectedFile.size,
        compressedSize: compressionResult.size,
        compressionRatio: (1 - compressionResult.size / selectedFile.size) * 100,
        quality: compressionResult.quality * 100,
        processingTime,
        blob: compressionResult.blob,
        url: URL.createObjectURL(compressionResult.blob),
        qualityScore: compressionResult.qualityScore,
        aiAnalysis
      };

      setResult(finalResult);
    } catch (error) {
      console.error('Compression failed:', error);
    } finally {
      setCompressing(false);
    }
  }, [selectedFile, aiAnalysis, selectedPreset, customSize]);

  const downloadImage = useCallback(() => {
    if (!result) return;

    const link = document.createElement('a');
    link.href = result.url;
    link.download = `compressed.${result.aiAnalysis.recommendedFormat}`;
    link.click();
  }, [result]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI Smart Compression</h1>
                <p className="text-blue-100">Automatically optimized for content creators</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Upload Section */}
            {!selectedFile ? (
              <div className="border-2 border-dashed border-blue-300 rounded-xl p-12 text-center bg-blue-50/50">
                <ImageIcon className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload an image to compress</h3>
                <p className="text-gray-600 mb-6">AI will automatically choose the best settings for your image</p>
                <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                  <Upload className="w-5 h-5" />
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="space-y-8">
                {/* AI Analysis Section */}
                {aiAnalysis && (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Brain className="w-6 h-6 text-purple-600" />
                      <h3 className="text-lg font-semibold text-gray-900">AI Analysis Complete</h3>
                      {isAnalyzing && <Loader2 className="w-5 h-5 animate-spin text-blue-600" />}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Content Type</div>
                        <div className="font-semibold text-gray-900 capitalize">{aiAnalysis.contentType.replace('-', ' ')}</div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Recommended Format</div>
                        <div className="font-semibold text-gray-900 uppercase">{aiAnalysis.recommendedFormat}</div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Color Complexity</div>
                        <div className="font-semibold text-gray-900 capitalize">{aiAnalysis.colorComplexity}</div>
                      </div>
                    </div>

                    <div className="bg-white/70 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Info className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">AI Reasoning:</span>
                      </div>
                      <ul className="mt-2 space-y-1 text-sm text-gray-600">
                        {aiAnalysis.reasoning.map((reason, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Preset Selection */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Compression Target</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {compressionPresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setSelectedPreset(preset)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedPreset.id === preset.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          {preset.icon}
                          <span className="font-semibold text-gray-900">{preset.name}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{preset.description}</p>
                        <div className="text-sm font-medium text-blue-600">
                          Target: {preset.targetSizeKB} KB
                        </div>
                        {preset.popular && (
                          <div className="mt-2 inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            <Sparkles className="w-3 h-3" />
                            Popular
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {selectedPreset.id === 'custom' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Target Size (KB)
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="1000"
                        value={customSize}
                        onChange={(e) => setCustomSize(parseInt(e.target.value) || 100)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">File:</span> {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          setAiAnalysis(null);
                          setResult(null);
                        }}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Clear
                      </button>
                      <button
                        onClick={handleCompress}
                        disabled={compressing || isAnalyzing}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
                      >
                        {compressing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            AI Optimizing...
                          </>
                        ) : (
                          <>
                            <Target className="w-4 h-4" />
                            AI Optimize
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Results */}
                {result && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-900">AI Optimization Complete!</h3>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {(result.originalSize / 1024).toFixed(1)} KB
                        </div>
                        <div className="text-sm text-gray-600">Original</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {(result.compressedSize / 1024).toFixed(1)} KB
                        </div>
                        <div className="text-sm text-gray-600">Optimized</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {result.compressionRatio.toFixed(0)}%
                        </div>
                        <div className="text-sm text-gray-600">Space Saved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {(result.qualityScore * 100).toFixed(0)}%
                        </div>
                        <div className="text-sm text-gray-600">Quality Score</div>
                      </div>
                    </div>

                    {/* Before/After Preview */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Eye className="w-5 h-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-900">Quality Comparison</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">Original</h5>
                          <img 
                            src={URL.createObjectURL(selectedFile!)} 
                            alt="Original" 
                            className="w-full rounded-lg border border-gray-300 shadow-sm"
                          />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">
                            AI Optimized ({result.aiAnalysis.recommendedFormat.toUpperCase()})
                          </h5>
                          <img 
                            src={result.url} 
                            alt="Compressed" 
                            className="w-full rounded-lg border border-gray-300 shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Download */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Brain className="w-4 h-4" />
                        <span>AI-optimized compression with {result.aiAnalysis.recommendedFormat.toUpperCase()} format</span>
                        <span>•</span>
                        <span>{result.processingTime.toFixed(2)}s processing</span>
                      </div>
                      <button
                        onClick={downloadImage}
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download Optimized
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
