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
  Target, 
  BarChart3, 
  Gauge
} from 'lucide-react';

interface CompressionOptions {
  targetSizeKB: number;
  outputFormat: 'jpeg' | 'png' | 'webp';
}

interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  quality: number;
  processingTime: number;
  blob: Blob;
  url: string;
}

// Smart Loop: Binary search for optimal quality (12 lines of core logic)
const compressToTargetSize = async (
  imageFile: File,
  targetSizeKB: number,
  outputFormat: string = 'jpeg'
): Promise<{ blob: Blob; quality: number; size: number }> => {

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const binarySearch = async (low: number, high: number): Promise<{ blob: Blob; quality: number; size: number }> => {
        if (low >= high) {
          const quality = low / 100;
          const dataUrl = canvas.toDataURL(`image/${outputFormat}`, quality);
          const blob = dataUrlToBlob(dataUrl);
          return { blob, quality, size: blob.size };
        }

        const mid = Math.floor((low + high) / 2);
        const quality = mid / 100;
        const dataUrl = canvas.toDataURL(`image/${outputFormat}`, quality);
        const blob = dataUrlToBlob(dataUrl);

        if (blob.size / 1024 <= targetSizeKB) {
          return binarySearch(low, mid);
        } else {
          return binarySearch(mid + 1, high);
        }
      };

      binarySearch(10, 100).then(resolve).catch(reject);
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(imageFile);
  });
};

const dataUrlToBlob = (dataUrl: string): Blob => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export default function SmartLoopCompressor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
      setError(null);
      setProgress(0);
    }
  }, []);

  const handleCompress = useCallback(async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      const startTime = performance.now();
      setProgress(20);

      const { blob, quality } = await compressToTargetSize(
        selectedFile, 
        500, 
        'jpeg'
      );
      
      setProgress(80);
      
      const endTime = performance.now();
      const processingTime = (endTime - startTime) / 1000;
      
      const originalSize = selectedFile.size;
      const compressedSize = blob.size;
      const compressionRatio = ((originalSize - compressedSize) / originalSize * 100);

      setResult({
        originalSize,
        compressedSize,
        compressionRatio,
        quality,
        processingTime,
        blob,
        url: URL.createObjectURL(blob)
      });
      
      setProgress(100);
    } catch (err) {
      setError('Compression failed. Please try again.');
      console.error('Compression error:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile]);

  const handleDownload = useCallback(() => {
    if (result?.url) {
      const link = document.createElement('a');
      link.href = result.url;
      link.download = `compressed_${Date.now()}.jpeg`;
      link.click();
    }
  }, [result]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-100 rounded-full">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Smart Loop Compressor</h1>
              <p className="text-gray-600 mt-1">Intelligent image compression with binary search optimization</p>
            </div>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <label className="cursor-pointer">
              <span className="text-lg font-medium text-gray-900">Choose an image or drag and drop</span>
              <p className="text-gray-600 mt-1">PNG, JPG, GIF up to 10MB</p>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </label>
          </div>

          {/* File Info */}
          {selectedFile && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-600">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Compressing...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4" />
                      Compress to 500KB
                    </>
                  )}
                </button>
              </div>

              {/* Progress Bar */}
              {isProcessing && (
                <div className="mt-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <p className="text-red-900 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Compression Complete!</h2>
                </div>
                <button
                  onClick={handleDownload}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Compressed Image
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {(result.originalSize / 1024).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Original Size (KB)</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {(result.compressedSize / 1024).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Compressed Size (KB)</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {result.compressionRatio.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Compression Ratio</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {result.quality.toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">Quality</div>
                </div>
              </div>

              {/* Before/After Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Original</h3>
                  <img 
                    src={URL.createObjectURL(selectedFile!)} 
                    alt="Original" 
                    className="w-full rounded-lg border border-gray-300"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Compressed</h3>
                  <img 
                    src={result.url} 
                    alt="Compressed" 
                    className="w-full rounded-lg border border-gray-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Performance Metrics */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Gauge className="w-4 h-4" />
              <span>12-line compression algorithm with binary search optimization</span>
              {result && (
                <>
                  <span>•</span>
                  <span>{result.processingTime.toFixed(2)}s processing time</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
