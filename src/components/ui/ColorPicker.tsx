'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

// Preset colors optimized for YouTube thumbnails (high contrast, TV-safe)
const PRESET_COLORS = [
  // Reds
  '#FF0000', '#DC143C', '#8B0000', '#FF6B6B',
  // Oranges
  '#FF8C00', '#FF6347', '#FFA500', '#FF7F50',
  // Yellows
  '#FFD700', '#FFFF00', '#F4D03F', '#F9E79F',
  // Greens
  '#00FF00', '#32CD32', '#228B22', '#90EE90',
  // Blues
  '#0000FF', '#1E90FF', '#4169E1', '#87CEEB',
  // Purples
  '#8B00FF', '#9370DB', '#BA55D3', '#DDA0DD',
  // Pinks
  '#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB',
  // Neutrals
  '#FFFFFF', '#F0F0F0', '#C0C0C0', '#808080',
  '#404040', '#202020', '#000000', '#1A1A1A',
];

export default function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState(color);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCustomColor(color);
  }, [color]);

  const handlePresetClick = (presetColor: string) => {
    onChange(presetColor);
    setCustomColor(presetColor);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    onChange(newColor);
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Ensure it starts with #
    if (!value.startsWith('#')) {
      value = '#' + value;
    }
    
    // Limit to 7 characters (#RRGGBB)
    value = value.slice(0, 7);
    
    setCustomColor(value);
    
    // Only update if it's a valid hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Color Display Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded border-2 border-gray-300 shadow-sm"
              style={{ backgroundColor: color }}
            />
            <span className="font-mono text-sm text-gray-700 uppercase">
              {color}
            </span>
          </div>
          <Palette className="w-4 h-4 text-gray-500" />
        </button>

        {/* Color Picker Dropdown */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Panel */}
            <div className="absolute z-20 w-80 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-xl">
              {/* Custom Color Picker */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Custom Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    ref={colorInputRef}
                    type="color"
                    value={customColor}
                    onChange={handleCustomColorChange}
                    className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColor}
                    onChange={handleHexInputChange}
                    placeholder="#000000"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={7}
                  />
                </div>
              </div>

              {/* Preset Colors */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Preset Colors
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {PRESET_COLORS.map((presetColor) => (
                    <button
                      key={presetColor}
                      onClick={() => handlePresetClick(presetColor)}
                      className={`
                        w-8 h-8 rounded border-2 transition-all hover:scale-110
                        ${color === presetColor 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-300 hover:border-gray-400'
                        }
                      `}
                      style={{ backgroundColor: presetColor }}
                      title={presetColor}
                    />
                  ))}
                </div>
              </div>

              {/* Color Info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  <p className="font-medium mb-1">TV-Safe Colors</p>
                  <p>High contrast colors work best on large screens</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}