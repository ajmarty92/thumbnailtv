'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Text as KonvaText, Transformer } from 'react-konva';
import Konva from 'konva';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Plus,
  Save
} from 'lucide-react';
import ImageUploader from './ImageUploader';
import TextStylePanel from '../ui/TextStylePanel';
import LayerManager, { Layer as LayerType } from './LayerManager';
import ExportPanel from '../ExportPanel';

// Canvas dimensions (4K)
const CANVAS_WIDTH = 3840;
const CANVAS_HEIGHT = 2160;

interface CanvasObject {
  id: string;
  type: 'image' | 'text';
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  visible: boolean;
  locked: boolean;
  zIndex: number;
  // Image specific
  imageData?: string;
  imageName?: string;
  // Text specific
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline';
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
}

export default function EnhancedCanvasEditor() {
  const [objects, setObjects] = useState<CanvasObject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.25); // Start at 25% for 4K canvas
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'upload' | 'text' | 'layers' | 'export'>('upload');
  
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const imageRefs = useRef<{ [key: string]: Konva.Image }>({});
  const textRefs = useRef<{ [key: string]: Konva.Text }>({});

  // Update transformer when selection changes
  useEffect(() => {
    if (transformerRef.current && selectedId) {
      const node = imageRefs.current[selectedId] || textRefs.current[selectedId];
      if (node) {
        transformerRef.current.nodes([node]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    }
  }, [selectedId]);

  // Handle image upload
  const handleImageUpload = useCallback((imageData: string, fileName: string) => {
    const img = new window.Image();
    img.onload = () => {
      const newObject: CanvasObject = {
        id: `image-${Date.now()}`,
        type: 'image',
        x: CANVAS_WIDTH / 2 - img.width / 2,
        y: CANVAS_HEIGHT / 2 - img.height / 2,
        width: img.width,
        height: img.height,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        locked: false,
        zIndex: objects.length,
        imageData,
        imageName: fileName
      };
      setObjects([...objects, newObject]);
      setSelectedId(newObject.id);
      setActiveTab('layers');
    };
    img.src = imageData;
  }, [objects]);

  // Add text
  const handleAddText = useCallback(() => {
    const newObject: CanvasObject = {
      id: `text-${Date.now()}`,
      type: 'text',
      x: CANVAS_WIDTH / 2 - 200,
      y: CANVAS_HEIGHT / 2 - 50,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      visible: true,
      locked: false,
      zIndex: objects.length,
      text: 'Your Text Here',
      fontFamily: 'Inter',
      fontSize: 96,
      fontWeight: 'bold',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAlign: 'center',
      color: '#FFFFFF',
      strokeColor: '#000000',
      strokeWidth: 4,
      shadowColor: '#000000',
      shadowBlur: 10,
      shadowOffsetX: 2,
      shadowOffsetY: 2
    };
    setObjects([...objects, newObject]);
    setSelectedId(newObject.id);
    setActiveTab('text');
  }, [objects]);

  // Update text style
  const handleTextStyleChange = useCallback((style: Partial<CanvasObject>) => {
    if (!selectedId) return;
    setObjects(objects.map(obj => 
      obj.id === selectedId ? { ...obj, ...style } : obj
    ));
  }, [selectedId, objects]);

  // Layer management
  const handleLayerVisibilityToggle = useCallback((layerId: string) => {
    setObjects(objects.map(obj =>
      obj.id === layerId ? { ...obj, visible: !obj.visible } : obj
    ));
  }, [objects]);

  const handleLayerLockToggle = useCallback((layerId: string) => {
    setObjects(objects.map(obj =>
      obj.id === layerId ? { ...obj, locked: !obj.locked } : obj
    ));
  }, [objects]);

  const handleLayerDelete = useCallback((layerId: string) => {
    setObjects(objects.filter(obj => obj.id !== layerId));
    if (selectedId === layerId) {
      setSelectedId(null);
    }
  }, [objects, selectedId]);

  const handleLayerReorder = useCallback((layerId: string, direction: 'up' | 'down') => {
    const index = objects.findIndex(obj => obj.id === layerId);
    if (index === -1) return;

    const newObjects = [...objects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= objects.length) return;

    // Swap zIndex values
    const temp = newObjects[index].zIndex;
    newObjects[index].zIndex = newObjects[targetIndex].zIndex;
    newObjects[targetIndex].zIndex = temp;

    setObjects(newObjects);
  }, [objects]);

  // Zoom controls
  const handleZoomIn = () => setZoom(Math.min(zoom * 1.2, 2));
  const handleZoomOut = () => setZoom(Math.max(zoom / 1.2, 0.1));
  const handleZoomFit = () => {
    const container = stageRef.current?.container();
    if (!container) return;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const scale = Math.min(
      containerWidth / CANVAS_WIDTH,
      containerHeight / CANVAS_HEIGHT
    ) * 0.9;
    setZoom(scale);
    setStagePos({ x: 0, y: 0 });
  };

  // Export
  const handleExport = useCallback(async (options: any) => {
    if (!stageRef.current) return;

    const uri = stageRef.current.toDataURL({
      mimeType: options.format === 'png' ? 'image/png' : 'image/jpeg',
      quality: options.quality / 100,
      pixelRatio: options.scale
    });

    // Download
    const link = document.createElement('a');
    link.download = `thumbnail-${Date.now()}.${options.format}`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // Convert objects to layers
  const layers: LayerType[] = objects.map(obj => ({
    id: obj.id,
    type: obj.type,
    name: obj.type === 'image' ? obj.imageName || 'Image' : obj.text || 'Text',
    visible: obj.visible,
    locked: obj.locked,
    zIndex: obj.zIndex
  }));

  const selectedObject = objects.find(obj => obj.id === selectedId);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar - Tools */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">LivingRoom Editor</h2>
          <p className="text-sm text-gray-500">4K Thumbnail Designer</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'upload', label: 'Upload' },
            { id: 'text', label: 'Text' },
            { id: 'layers', label: 'Layers' },
            { id: 'export', label: 'Export' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex-1 px-4 py-3 text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <ImageUploader onImageUpload={handleImageUpload} />
              <button
                onClick={handleAddText}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Text Layer</span>
              </button>
            </div>
          )}

          {activeTab === 'text' && selectedObject?.type === 'text' && (
            <TextStylePanel
              style={{
                fontFamily: selectedObject.fontFamily || 'Inter',
                fontSize: selectedObject.fontSize || 96,
                fontWeight: selectedObject.fontWeight || 'bold',
                fontStyle: selectedObject.fontStyle || 'normal',
                textDecoration: selectedObject.textDecoration || 'none',
                textAlign: selectedObject.textAlign || 'center',
                color: selectedObject.color || '#FFFFFF',
                strokeColor: selectedObject.strokeColor || '#000000',
                strokeWidth: selectedObject.strokeWidth || 4,
                shadowColor: selectedObject.shadowColor || '#000000',
                shadowBlur: selectedObject.shadowBlur || 10,
                shadowOffsetX: selectedObject.shadowOffsetX || 2,
                shadowOffsetY: selectedObject.shadowOffsetY || 2
              }}
              onChange={handleTextStyleChange}
            />
          )}

          {activeTab === 'text' && !selectedObject && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">Select a text layer to edit its style</p>
              <button
                onClick={handleAddText}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Text Layer
              </button>
            </div>
          )}

          {activeTab === 'layers' && (
            <LayerManager
              layers={layers}
              selectedLayerId={selectedId}
              onLayerSelect={setSelectedId}
              onLayerVisibilityToggle={handleLayerVisibilityToggle}
              onLayerLockToggle={handleLayerLockToggle}
              onLayerDelete={handleLayerDelete}
              onLayerReorder={handleLayerReorder}
            />
          )}

          {activeTab === 'export' && (
            <ExportPanel
              onExport={handleExport}
              canvasWidth={CANVAS_WIDTH}
              canvasHeight={CANVAS_HEIGHT}
            />
          )}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleZoomFit}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Fit to Screen"
            >
              <Maximize2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="text-sm text-gray-600">
            Canvas: {CANVAS_WIDTH} × {CANVAS_HEIGHT}px (4K)
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-hidden bg-gray-200 flex items-center justify-center">
          <div className="bg-white shadow-lg">
            <Stage
              ref={stageRef}
              width={CANVAS_WIDTH * zoom}
              height={CANVAS_HEIGHT * zoom}
              scaleX={zoom}
              scaleY={zoom}
              draggable
              onMouseDown={(e) => {
                if (e.target === e.target.getStage()) {
                  setSelectedId(null);
                }
              }}
            >
              <Layer>
                {/* Background */}
                <KonvaImage
                  image={undefined}
                  width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                  fill="#1a1a1a"
                />

                {/* Render objects sorted by zIndex */}
                {objects
                  .sort((a, b) => a.zIndex - b.zIndex)
                  .map((obj) => {
                    if (!obj.visible) return null;

                    if (obj.type === 'image' && obj.imageData) {
                      const img = new window.Image();
                      img.src = obj.imageData;
                      return (
                        <KonvaImage
                          key={obj.id}
                          ref={(node) => {
                            if (node) imageRefs.current[obj.id] = node;
                          }}
                          image={img}
                          x={obj.x}
                          y={obj.y}
                          width={obj.width}
                          height={obj.height}
                          rotation={obj.rotation}
                          scaleX={obj.scaleX}
                          scaleY={obj.scaleY}
                          draggable={!obj.locked}
                          onClick={() => setSelectedId(obj.id)}
                          onTap={() => setSelectedId(obj.id)}
                        />
                      );
                    }

                    if (obj.type === 'text') {
                      return (
                        <KonvaText
                          key={obj.id}
                          ref={(node) => {
                            if (node) textRefs.current[obj.id] = node;
                          }}
                          text={obj.text}
                          x={obj.x}
                          y={obj.y}
                          rotation={obj.rotation}
                          scaleX={obj.scaleX}
                          scaleY={obj.scaleY}
                          fontFamily={obj.fontFamily}
                          fontSize={obj.fontSize}
                          fontStyle={`${obj.fontStyle} ${obj.fontWeight}`}
                          textDecoration={obj.textDecoration}
                          align={obj.textAlign}
                          fill={obj.color}
                          stroke={obj.strokeColor}
                          strokeWidth={obj.strokeWidth}
                          shadowColor={obj.shadowColor}
                          shadowBlur={obj.shadowBlur}
                          shadowOffsetX={obj.shadowOffsetX}
                          shadowOffsetY={obj.shadowOffsetY}
                          draggable={!obj.locked}
                          onClick={() => setSelectedId(obj.id)}
                          onTap={() => setSelectedId(obj.id)}
                        />
                      );
                    }

                    return null;
                  })}

                {/* Transformer */}
                <Transformer
                  ref={transformerRef}
                  boundBoxFunc={(oldBox, newBox) => {
                    // Limit resize
                    if (newBox.width < 50 || newBox.height < 50) {
                      return oldBox;
                    }
                    return newBox;
                  }}
                />
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </div>
  );
}