'use client';

import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Type
} from 'lucide-react';
import FontSelector from './FontSelector';
import ColorPicker from './ColorPicker';

interface TextStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline';
  textAlign: 'left' | 'center' | 'right';
  color: string;
  strokeColor: string;
  strokeWidth: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
}

interface TextStylePanelProps {
  style: TextStyle;
  onChange: (style: Partial<TextStyle>) => void;
}

export default function TextStylePanel({ style, onChange }: TextStylePanelProps) {
  const fontSizes = [24, 32, 48, 64, 80, 96, 128, 160, 192, 224, 256];
  const strokeWidths = [0, 2, 4, 6, 8, 10, 12, 16, 20];

  const toggleStyle = (property: keyof TextStyle, value1: any, value2: any) => {
    onChange({ [property]: style[property] === value1 ? value2 : value1 });
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg border border-gray-200">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
          <Type className="w-4 h-4 mr-2" />
          Text Styling
        </h3>
      </div>

      {/* Font Family */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Family
        </label>
        <FontSelector
          selectedFont={style.fontFamily}
          onFontChange={(fontFamily) => onChange({ fontFamily })}
        />
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Size: {style.fontSize}px
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="24"
            max="256"
            step="8"
            value={style.fontSize}
            onChange={(e) => onChange({ fontSize: parseInt(e.target.value) })}
            className="flex-1"
          />
          <select
            value={style.fontSize}
            onChange={(e) => onChange({ fontSize: parseInt(e.target.value) })}
            className="px-3 py-1.5 border border-gray-300 rounded text-sm"
          >
            {fontSizes.map(size => (
              <option key={size} value={size}>{size}px</option>
            ))}
          </select>
        </div>
      </div>

      {/* Text Style Buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Style
        </label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleStyle('fontWeight', 'normal', 'bold')}
            className={`
              p-2 rounded border transition-colors
              ${style.fontWeight === 'bold'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }
            `}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleStyle('fontStyle', 'normal', 'italic')}
            className={`
              p-2 rounded border transition-colors
              ${style.fontStyle === 'italic'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }
            `}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleStyle('textDecoration', 'none', 'underline')}
            className={`
              p-2 rounded border transition-colors
              ${style.textDecoration === 'underline'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }
            `}
            title="Underline"
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Text Alignment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Alignment
        </label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onChange({ textAlign: 'left' })}
            className={`
              p-2 rounded border transition-colors
              ${style.textAlign === 'left'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }
            `}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onChange({ textAlign: 'center' })}
            className={`
              p-2 rounded border transition-colors
              ${style.textAlign === 'center'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }
            `}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => onChange({ textAlign: 'right' })}
            className={`
              p-2 rounded border transition-colors
              ${style.textAlign === 'right'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }
            `}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Text Color */}
      <ColorPicker
        label="Text Color"
        color={style.color}
        onChange={(color) => onChange({ color })}
      />

      {/* Text Stroke/Outline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Outline
        </label>
        <div className="space-y-3">
          <ColorPicker
            label="Outline Color"
            color={style.strokeColor}
            onChange={(strokeColor) => onChange({ strokeColor })}
          />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Outline Width: {style.strokeWidth}px
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="20"
                step="2"
                value={style.strokeWidth}
                onChange={(e) => onChange({ strokeWidth: parseInt(e.target.value) })}
                className="flex-1"
              />
              <select
                value={style.strokeWidth}
                onChange={(e) => onChange({ strokeWidth: parseInt(e.target.value) })}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm"
              >
                {strokeWidths.map(width => (
                  <option key={width} value={width}>{width}px</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Text Shadow */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Shadow
        </label>
        <div className="space-y-3">
          <ColorPicker
            label="Shadow Color"
            color={style.shadowColor}
            onChange={(shadowColor) => onChange({ shadowColor })}
          />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Shadow Blur: {style.shadowBlur}px
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="2"
              value={style.shadowBlur}
              onChange={(e) => onChange({ shadowBlur: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Offset X: {style.shadowOffsetX}px
              </label>
              <input
                type="range"
                min="-20"
                max="20"
                step="2"
                value={style.shadowOffsetX}
                onChange={(e) => onChange({ shadowOffsetX: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Offset Y: {style.shadowOffsetY}px
              </label>
              <input
                type="range"
                min="-20"
                max="20"
                step="2"
                value={style.shadowOffsetY}
                onChange={(e) => onChange({ shadowOffsetY: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}