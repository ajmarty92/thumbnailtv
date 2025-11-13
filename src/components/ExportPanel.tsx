'use client';

import React, { useState } from 'react';
import { Download, FileImage, Loader2 } from 'lucide-react';

interface ExportOptions {
  format: 'png' | 'jpeg';
  quality: number;
  scale: number;
  includeBackground: boolean;
}

interface ExportPanelProps {
  onExport: (options: ExportOptions) => Promise<void>;
  canvasWidth: number;
  canvasHeight: number;
}

export default function ExportPanel({ 
  onExport, 
  canvasWidth, 
  canvasHeight 
}: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [options, setOptions] = useState<ExportOptions>({
    format: 'png',
    quality: 95,
    scale: 1,
    includeBackground: true
  });

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport(options);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const calculateFileSize = (): string => {
    const pixels = canvasWidth * canvasHeight * options.scale * options.scale;
    let estimatedBytes: number;

    if (options.format === 'png') {
      // PNG: roughly 4 bytes per pixel (uncompressed)
      estimatedBytes = pixels * 4;
    } else {
      // JPEG: depends on quality
      const compressionRatio = options.quality / 100;
      estimatedBytes = pixels * 3 * compressionRatio;
    }

    const mb = estimatedBytes / (1024 * 1024);
    return mb < 1 ? `${(mb * 1024).toFixed(0)} KB` : `${mb.toFixed(2)} MB`;
  };

  const getOutputDimensions = () => {
    const width = Math.round(canvasWidth * options.scale);
    const height = Math.round(canvasHeight * options.scale);
    return `${width} × ${height}px`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Export Settings
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Export your 4K thumbnail for YouTube
        </p>
      </div>

      {/* Format Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Format
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setOptions({ ...options, format: 'png' })}
            className={`
              px-4 py-3 rounded-lg border-2 transition-all text-left
              ${options.format === 'png'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="font-medium text-sm">PNG</div>
            <div className="text-xs text-gray-500 mt-0.5">
              Lossless, larger file
            </div>
          </button>
          <button
            onClick={() => setOptions({ ...options, format: 'jpeg' })}
            className={`
              px-4 py-3 rounded-lg border-2 transition-all text-left
              ${options.format === 'jpeg'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="font-medium text-sm">JPEG</div>
            <div className="text-xs text-gray-500 mt-0.5">
              Compressed, smaller
            </div>
          </button>
        </div>
      </div>

      {/* Quality Slider (JPEG only) */}
      {options.format === 'jpeg' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quality: {options.quality}%
          </label>
          <input
            type="range"
            min="60"
            max="100"
            step="5"
            value={options.quality}
            onChange={(e) => setOptions({ ...options, quality: parseInt(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Smaller file</span>
            <span>Better quality</span>
          </div>
        </div>
      )}

      {/* Scale Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Resolution Scale
        </label>
        <div className="space-y-2">
          {[
            { value: 1, label: '100% (3840×2160)', desc: 'Full 4K' },
            { value: 0.75, label: '75% (2880×1620)', desc: 'High quality' },
            { value: 0.5, label: '50% (1920×1080)', desc: 'Standard HD' },
          ].map((scale) => (
            <button
              key={scale.value}
              onClick={() => setOptions({ ...options, scale: scale.value })}
              className={`
                w-full px-4 py-2.5 rounded-lg border-2 transition-all text-left
                ${options.scale === scale.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{scale.label}</div>
                  <div className="text-xs text-gray-500">{scale.desc}</div>
                </div>
                {options.scale === scale.value && (
                  <div className="text-blue-500 text-xs font-medium">✓</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Background Option */}
      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.includeBackground}
            onChange={(e) => setOptions({ ...options, includeBackground: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Include background</span>
        </label>
        <p className="text-xs text-gray-500 mt-1 ml-6">
          Uncheck for transparent background (PNG only)
        </p>
      </div>

      {/* Export Info */}
      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Output size:</span>
          <span className="font-medium text-gray-900">{getOutputDimensions()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Est. file size:</span>
          <span className="font-medium text-gray-900">{calculateFileSize()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Format:</span>
          <span className="font-medium text-gray-900 uppercase">{options.format}</span>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={handleExport}
        disabled={isExporting}
        className={`
          w-full px-6 py-3 rounded-lg font-medium transition-all
          flex items-center justify-center space-x-2
          ${isExporting
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
          }
        `}
      >
        {isExporting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <FileImage className="w-5 h-5" />
            <span>Export Thumbnail</span>
          </>
        )}
      </button>

      {/* YouTube Guidelines */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs font-medium text-gray-700 mb-2">
          📺 YouTube Requirements
        </p>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Max file size: 2MB (recommended)</li>
          <li>• Resolution: 1280×720 minimum</li>
          <li>• Aspect ratio: 16:9</li>
          <li>• Formats: JPG, GIF, PNG</li>
        </ul>
      </div>
    </div>
  );
}