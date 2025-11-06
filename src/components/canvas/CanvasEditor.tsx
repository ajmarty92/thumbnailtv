'use client'

import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { 
  Square, 
  Circle, 
  Triangle, 
  Type, 
  Image as ImageIcon,
  Trash2,
  Download
} from 'lucide-react'
import { downloadImage } from '@/lib/utils'

interface CanvasEditorProps {
  onCanvasReady: (canvas: fabric.Canvas) => void
  onSelectionChange: (object: fabric.Object | null) => void
}

export function CanvasEditor({ onCanvasReady, onSelectionChange }: CanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!canvasRef.current) return

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
      selection: true,
    })

    // Handle selection changes
    fabricCanvas.on('selection:created', (e) => {
      onSelectionChange(e.selected?.[0] || null)
    })

    fabricCanvas.on('selection:updated', (e) => {
      onSelectionChange(e.selected?.[0] || null)
    })

    fabricCanvas.on('selection:cleared', () => {
      onSelectionChange(null)
    })

    setCanvas(fabricCanvas)
    onCanvasReady(fabricCanvas)
    setIsLoading(false)

    return () => {
      fabricCanvas.dispose()
    }
  }, [onCanvasReady, onSelectionChange])

  const addRectangle = () => {
    if (!canvas) return
    
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: '#3b82f6',
      strokeWidth: 2,
      stroke: '#1e40af',
    })
    
    canvas.add(rect)
    canvas.setActiveObject(rect)
    canvas.renderAll()
  }

  const addCircle = () => {
    if (!canvas) return
    
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: '#10b981',
      strokeWidth: 2,
      stroke: '#047857',
    })
    
    canvas.add(circle)
    canvas.setActiveObject(circle)
    canvas.renderAll()
  }

  const addTriangle = () => {
    if (!canvas) return
    
    const triangle = new fabric.Triangle({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: '#f59e0b',
      strokeWidth: 2,
      stroke: '#d97706',
    })
    
    canvas.add(triangle)
    canvas.setActiveObject(triangle)
    canvas.renderAll()
  }

  const addText = () => {
    if (!canvas) return
    
    const text = new fabric.IText('Click to edit', {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: '#000000',
      fontFamily: 'Arial',
    })
    
    canvas.add(text)
    canvas.setActiveObject(text)
    canvas.renderAll()
  }

  const deleteSelected = () => {
    if (!canvas) return
    
    const activeObjects = canvas.getActiveObjects()
    if (activeObjects.length > 0) {
      activeObjects.forEach(obj => canvas.remove(obj))
      canvas.discardActiveObject()
      canvas.renderAll()
    }
  }

  const exportCanvas = () => {
    if (!canvas) return
    
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2,
    })
    
    downloadImage(dataURL, 'canvas-export.png')
  }

  return (
    <div className="flex h-full gap-6">
      {/* Toolbar */}
      <Card className="w-20">
        <CardHeader className="p-4">
          <CardTitle className="text-sm text-center">Tools</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={addRectangle}
            className="w-full h-12 p-0"
          >
            <Square className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={addCircle}
            className="w-full h-12 p-0"
          >
            <Circle className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={addTriangle}
            className="w-full h-12 p-0"
          >
            <Triangle className="h-4 w-4" />
          </Button>
          
          <Separator />
          
          <Button
            variant="outline"
            size="sm"
            onClick={addText}
            className="w-full h-12 p-0"
          >
            <Type className="h-4 w-4" />
          </Button>
          
          <Separator />
          
          <Button
            variant="outline"
            size="sm"
            onClick={deleteSelected}
            className="w-full h-12 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={exportCanvas}
            className="w-full h-12 p-0"
          >
            <Download className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Canvas Container */}
      <Card className="flex-1">
        <CardContent className="p-6">
          <div className="canvas-container">
            {isLoading && (
              <div className="loading-overlay">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-sm text-muted-foreground">Loading canvas...</p>
                </div>
              </div>
            )}
            <div className="canvas-wrapper">
              <canvas ref={canvasRef} className="fabric-canvas" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}