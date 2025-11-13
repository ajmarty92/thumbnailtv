'use client';

import React from 'react';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Trash2, 
  ChevronUp, 
  ChevronDown,
  Image as ImageIcon,
  Type
} from 'lucide-react';

export interface Layer {
  id: string;
  type: 'image' | 'text';
  name: string;
  visible: boolean;
  locked: boolean;
  zIndex: number;
}

interface LayerManagerProps {
  layers: Layer[];
  selectedLayerId: string | null;
  onLayerSelect: (layerId: string) => void;
  onLayerVisibilityToggle: (layerId: string) => void;
  onLayerLockToggle: (layerId: string) => void;
  onLayerDelete: (layerId: string) => void;
  onLayerReorder: (layerId: string, direction: 'up' | 'down') => void;
}

export default function LayerManager({
  layers,
  selectedLayerId,
  onLayerSelect,
  onLayerVisibilityToggle,
  onLayerLockToggle,
  onLayerDelete,
  onLayerReorder
}: LayerManagerProps) {
  const sortedLayers = [...layers].sort((a, b) => b.zIndex - a.zIndex);

  return (
    <div className="space-y-2">
      {sortedLayers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="mb-2 opacity-50">
            <ImageIcon className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-sm">No layers yet</p>
          <p className="text-xs mt-1">Upload an image or add text to start</p>
        </div>
      ) : (
        sortedLayers.map((layer, index) => (
          <div
            key={layer.id}
            className={`
              group p-3 rounded-lg border-2 transition-all cursor-pointer
              ${selectedLayerId === layer.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
              }
            `}
            onClick={() => onLayerSelect(layer.id)}
          >
            <div className="flex items-center space-x-2">
              <div className={`
                p-1.5 rounded
                ${layer.type === 'image' ? 'bg-purple-100' : 'bg-blue-100'}
              `}>
                {layer.type === 'image' ? (
                  <ImageIcon className="w-4 h-4 text-purple-600" />
                ) : (
                  <Type className="w-4 h-4 text-blue-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {layer.name}
                </p>
                <p className="text-xs text-gray-500">
                  {layer.type === 'image' ? 'Image Layer' : 'Text Layer'}
                </p>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLayerReorder(layer.id, 'up');
                  }}
                  disabled={index === 0}
                  className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLayerReorder(layer.id, 'down');
                  }}
                  disabled={index === sortedLayers.length - 1}
                  className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLayerVisibilityToggle(layer.id);
                  }}
                  className="p-1 hover:bg-gray-200 rounded"
                  title={layer.visible ? 'Hide layer' : 'Show layer'}
                >
                  {layer.visible ? (
                    <Eye className="w-4 h-4 text-gray-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLayerLockToggle(layer.id);
                  }}
                  className="p-1 hover:bg-gray-200 rounded"
                  title={layer.locked ? 'Unlock layer' : 'Lock layer'}
                >
                  {layer.locked ? (
                    <Lock className="w-4 h-4 text-gray-600" />
                  ) : (
                    <Unlock className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Delete "${layer.name}"?`)) {
                      onLayerDelete(layer.id);
                    }
                  }}
                  className="p-1 hover:bg-red-100 rounded"
                  title="Delete layer"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
