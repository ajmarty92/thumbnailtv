'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Wand2, 
  Download,
  Paintbrush
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface StabilityAIGenerativeFillProps {
  canvas: any
  selectedObject: any
}

export function StabilityAIGenerativeFill({ canvas, selectedObject }: StabilityAIGenerativeFillProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [prompt, setPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const { toast } = useToast()

  const generateFill = async () => {
    if (!selectedObject) {
      toast({
        title: "No image selected",
        description: "Please select an image to apply generative fill.",
        variant: "destructive",
      })
      return
    }

    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please describe what you want to generate.",
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
          return prev + 8
        })
      }, 600)

      // Call the generative fill API
      const response = await fetch('/api/ai/generative-fill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData,
          prompt,
          maskArea: 'full', // Could be enhanced to support masking
        }),
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error('Generative fill failed')
      }

      const result = await response.json()
      setGeneratedImage(result.generatedImageUrl)
      setProgress(100)

      // Update the canvas with the generated image
      if (canvas && result.generatedImageUrl) {
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
        imgElement.src = result.generatedImageUrl
      }

      toast({
        title: "Generation complete",
        description: "Your image has been transformed with AI.",
      })
    } catch (error) {
      console.error('Generative fill error:', error)
      toast({
        title: "Generation failed",
        description: "There was an error generating your image.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadGenerated = () => {
    if (!generatedImage) return

    const link = document.createElement('a')
    link.href = generatedImage
    link.download = 'generated-image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Paintbrush className="h-4 w-4" />
          Stability AI Generative Fill
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>Transform images with AI-powered generation</p>
          <p className="mt-1">• Describe your vision</p>
          <p>• High-quality results</p>
          <p>• Creative transformations</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to generate..."
            className="w-full h-20 px-3 py-2 text-sm border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={isProcessing}
          />
        </div>

        {selectedObject && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium">Target Image:</p>
            <p className="text-xs text-muted-foreground mt-1">
              {selectedObject.type} • Ready for transformation
            </p>
          </div>
        )}

        {generatedImage && (
          <div className="space-y-2">
            <img 
              src={generatedImage} 
              alt="Generated result" 
              className="w-full rounded-lg border border-border"
            />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadGenerated}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Result
            </Button>
          </div>
        )}

        <Button 
          onClick={generateFill}
          disabled={isProcessing || !selectedObject || !prompt.trim()}
          className="w-full"
        >
          <Wand2 className="h-4 w-4 mr-2" />
          {isProcessing ? 'Generating...' : 'Generate'}
        </Button>

        {isProcessing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}