'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Upload, 
  Wand2, 
  Download,
  Settings
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface ClaiDUpscalerProps {
  canvas: any
  selectedObject: any
}

export function ClaiDUpscaler({ canvas, selectedObject }: ClaiDUpscalerProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null)
  const { toast } = useToast()

  const upscaleImage = async () => {
    if (!selectedObject) {
      toast({
        title: "No image selected",
        description: "Please select an image to upscale.",
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
          return prev + 10
        })
      }, 500)

      // Call the upscaling API
      const response = await fetch('/api/ai/upscale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData,
          upscaleFactor: 2,
        }),
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error('Upscaling failed')
      }

      const result = await response.json()
      setEnhancedImage(result.enhancedImageUrl)
      setProgress(100)

      // Update the canvas with the enhanced image
      if (canvas && result.enhancedImageUrl) {
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
        imgElement.src = result.enhancedImageUrl
      }

      toast({
        title: "Image enhanced",
        description: "Your image has been successfully upscaled.",
      })
    } catch (error) {
      console.error('Upscaling error:', error)
      toast({
        title: "Enhancement failed",
        description: "There was an error upscaling your image.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadEnhanced = () => {
    if (!enhancedImage) return

    const link = document.createElement('a')
    link.href = enhancedImage
    link.download = 'enhanced-image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Wand2 className="h-4 w-4" />
          Claid.ai Upscaler
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>AI-powered image upscaling using Claid.ai API</p>
          <p className="mt-1">• 2x upscaling factor</p>
          <p>• Preserves quality</p>
          <p>• Fast processing</p>
        </div>

        {selectedObject && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium">Selected Object:</p>
            <p className="text-xs text-muted-foreground mt-1">
              Type: {selectedObject.type}
            </p>
          </div>
        )}

        {enhancedImage && (
          <div className="space-y-2">
            <img 
              src={enhancedImage} 
              alt="Enhanced result" 
              className="w-full rounded-lg border border-border"
            />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadEnhanced}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Enhanced
            </Button>
          </div>
        )}

        <Button 
          onClick={upscaleImage}
          disabled={isProcessing || !selectedObject}
          className="w-full"
        >
          <Wand2 className="h-4 w-4 mr-2" />
          {isProcessing ? 'Enhancing...' : 'Enhance Image'}
        </Button>

        {isProcessing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}