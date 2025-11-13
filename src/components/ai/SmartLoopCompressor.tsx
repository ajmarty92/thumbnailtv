'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Zap, 
  Download,
  Archive
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { formatFileSize } from '@/lib/utils'

interface SmartLoopCompressorProps {
  canvas: any
  selectedObject: any
}

export default function SmartLoopCompressor({ canvas, selectedObject }: SmartLoopCompressorProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [compressionLevel, setCompressionLevel] = useState(70)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [compressedImage, setCompressedImage] = useState<string | null>(null)
  const { toast } = useToast()

  const analyzeImage = () => {
    if (!selectedObject) {
      toast({
        title: "No image selected",
        description: "Please select an image to compress.",
        variant: "destructive",
      })
      return
    }

    // Estimate original size (this is a rough estimate)
    const imageData = selectedObject.toDataURL('image/png')
    const base64Length = imageData.length - 'data:image/png;base64,'.length
    const fileSize = base64Length * 0.75 // Rough estimate of actual file size
    setOriginalSize(fileSize)
  }

  const compressImage = async () => {
    if (!selectedObject) {
      toast({
        title: "No image selected",
        description: "Please select an image to compress.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setProgress(0)

    try {
      // Get the selected image data
      const imageData = selectedObject.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1,
      })

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 15
        })
      }, 300)

      // Call the compression API
      const response = await fetch('/api/ai/compress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData,
          quality: compressionLevel / 100,
        }),
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error('Compression failed')
      }

      const result = await response.json()
      setCompressedImage(result.compressedImageUrl)
      setCompressedSize(result.compressedSize)
      setProgress(100)

      // Update the canvas with the compressed image
      if (canvas && result.compressedImageUrl) {
        const imgElement = new Image()
        imgElement.onload = () => {
          const fabricImg = new (window as any).fabric.Image(imgElement, {
            left: selectedObject.left,
            top: selectedObject.top,
            scaleX: selectedObject.scaleX,
            scaleY: selectedObject.scaleY,
          })
          
          canvas.remove(selectedObject)
          canvas.add(fabricImg)
          canvas.setActiveObject(fabricImg)
          canvas.renderAll()
        }
        imgElement.src = result.compressedImageUrl
      }

      const compressionRatio = ((originalSize - result.compressedSize) / originalSize * 100).toFixed(1)
      toast({
        title: "Compression complete",
        description: `Image compressed by ${compressionRatio}% - from ${formatFileSize(originalSize)} to ${formatFileSize(result.compressedSize)}`,
      })
    } catch (error) {
      console.error('Compression error:', error)
      toast({
        title: "Compression failed",
        description: "There was an error compressing your image.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadCompressed = () => {
    if (!compressedImage) return

    const link = document.createElement('a')
    link.href = compressedImage
    link.download = 'compressed-image.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Archive className="h-4 w-4" />
          Smart Loop Compressor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>Efficient image compression with smart optimization</p>
          <p className="mt-1">• Reduces file size</p>
          <p>• Maintains quality</p>
          <p>• Fast processing</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Compression Quality</label>
          <div className="space-y-1">
            <input
              type="range"
              min="10"
              max="100"
              value={compressionLevel}
              onChange={(e) => setCompressionLevel(Number(e.target.value))}
              className="w-full"
              disabled={isProcessing}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>High compression</span>
              <span>{compressionLevel}%</span>
              <span>High quality</span>
            </div>
          </div>
        </div>

        {selectedObject && (
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={analyzeImage}
              className="w-full"
              disabled={isProcessing}
            >
              <Zap className="h-4 w-4 mr-2" />
              Analyze Image Size
            </Button>
            
            {originalSize > 0 && (
              <div className="p-3 bg-muted rounded-lg text-sm">
                <p className="font-medium">Estimated Size:</p>
                <p className="text-muted-foreground">{formatFileSize(originalSize)}</p>
              </div>
            )}
          </div>
        )}

        {compressedImage && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-muted rounded">
                <p className="text-muted-foreground">Original</p>
                <p className="font-medium">{formatFileSize(originalSize)}</p>
              </div>
              <div className="p-2 bg-muted rounded">
                <p className="text-muted-foreground">Compressed</p>
                <p className="font-medium">{formatFileSize(compressedSize)}</p>
              </div>
            </div>
            
            <img 
              src={compressedImage} 
              alt="Compressed result" 
              className="w-full rounded-lg border border-border"
            />
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadCompressed}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Compressed
            </Button>
          </div>
        )}

        <Button 
          onClick={compressImage}
          disabled={isProcessing || !selectedObject}
          className="w-full"
        >
          <Archive className="h-4 w-4 mr-2" />
          {isProcessing ? 'Compressing...' : 'Compress Image'}
        </Button>

        {isProcessing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Compressing</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}