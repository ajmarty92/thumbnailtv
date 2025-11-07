'use client';

import React, { useState, useEffect } from 'react';
import { Type, ChevronDown } from 'lucide-react';

interface Font {
  family: string;
  category: string;
  variants: string[];
}

interface FontSelectorProps {
  selectedFont: string;
  onFontChange: (fontFamily: string) => void;
}

// Popular Google Fonts for YouTube thumbnails
const POPULAR_FONTS: Font[] = [
  { family: 'Inter', category: 'sans-serif', variants: ['400', '500', '600', '700', '800', '900'] },
  { family: 'Roboto', category: 'sans-serif', variants: ['400', '500', '700', '900'] },
  { family: 'Montserrat', category: 'sans-serif', variants: ['400', '500', '600', '700', '800', '900'] },
  { family: 'Poppins', category: 'sans-serif', variants: ['400', '500', '600', '700', '800', '900'] },
  { family: 'Oswald', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Bebas Neue', category: 'display', variants: ['400'] },
  { family: 'Anton', category: 'display', variants: ['400'] },
  { family: 'Bangers', category: 'display', variants: ['400'] },
  { family: 'Righteous', category: 'display', variants: ['400'] },
  { family: 'Permanent Marker', category: 'handwriting', variants: ['400'] },
  { family: 'Pacifico', category: 'handwriting', variants: ['400'] },
  { family: 'Playfair Display', category: 'serif', variants: ['400', '500', '600', '700', '800', '900'] },
  { family: 'Merriweather', category: 'serif', variants: ['400', '700', '900'] },
];

export default function FontSelector({ selectedFont, onFontChange }: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Load Google Fonts dynamically
    const loadFonts = () => {
      const fontFamilies = POPULAR_FONTS.map(font => 
        `${font.family.replace(/ /g, '+')}:${font.variants.join(',')}`
      ).join('|');

      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?${fontFamilies.split('|').map(f => `family=${f}`).join('&')}&display=swap`;
      link.rel = 'stylesheet';
      
      link.onload = () => setFontsLoaded(true);
      document.head.appendChild(link);
    };

    if (!fontsLoaded) {
      loadFonts();
    }
  }, [fontsLoaded]);

  const handleFontSelect = (fontFamily: string) => {
    onFontChange(fontFamily);
    setIsOpen(false);
  };

  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      'sans-serif': 'Sans Serif',
      'serif': 'Serif',
      'display': 'Display',
      'handwriting': 'Handwriting'
    };
    return labels[category] || category;
  };

  const groupedFonts = POPULAR_FONTS.reduce((acc, font) => {
    if (!acc[font.category]) {
      acc[font.category] = [];
    }
    acc[font.category].push(font);
    return acc;
  }, {} as Record<string, Font[]>);

  return (
    <div className="relative">
      {/* Selected Font Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Type className="w-4 h-4 text-gray-500" />
          <span 
            className="font-medium text-gray-900"
            style={{ fontFamily: selectedFont }}
          >
            {selectedFont}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Font Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {Object.entries(groupedFonts).map(([category, fonts]) => (
              <div key={category} className="py-2">
                <div className="px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {getCategoryLabel(category)}
                </div>
                {fonts.map((font) => (
                  <button
                    key={font.family}
                    onClick={() => handleFontSelect(font.family)}
                    className={`
                      w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors
                      ${selectedFont === font.family ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}
                    `}
                    style={{ fontFamily: font.family }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{font.family}</span>
                      {selectedFont === font.family && (
                        <span className="text-xs text-blue-600">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Loading State */}
      {!fontsLoaded && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-600 text-center">
          Loading fonts...
        </div>
      )}
    </div>
  );
}