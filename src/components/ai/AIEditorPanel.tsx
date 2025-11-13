'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Upload, 
  Wand2, 
  Download,
  Zap,
  Image as ImageIcon
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { ClaiDUpscaler } from './ClaiDUpscaler'
import StabilityAIGenerativeFill from './StabilityAIGenerativeFill'
import SmartLoopCompressor from './SmartLoopCompressor'

interface AIEditorPanelProps {
  canvas: any
  selectedObject: any
}

export function AIEditorPanel({ canvas, selectedObject }: AIEditorPanelProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const { toast } = useToast()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const imgUrl = e.target?.result as string
      
      if (canvas) {
        const imgElement = new Image()
        imgElement.onload = () => {
          const fabricImg = new (window as any).fabric.Image(imgElement, {
            left: 100,
            top: 100,
            scaleX: 0.5,
            scaleY: 0.5,
          })
          
          canvas.add(fabricImg)
          canvas.setActiveObject(fabricImg)
          canvas.renderAll()
          
          toast({
            title: "Image uploaded",
            description: "Your image has been added to the canvas.",
          })
        }
        imgElement.src = imgUrl
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold">AI Tools</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Enhance your designs with AI-powered features
        </p>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <Tabs defaultValue="enhance" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="enhance">Enhance</TabsTrigger>
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="compress">Compress</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="enhance" className="mt-4">
            <ClaiDUpscaler
              canvas={canvas}
              selectedObject={selectedObject}
            />
          </TabsContent>

          <TabsContent value="generate" className="mt-4">
            <StabilityAIGenerativeFill
              canvas={canvas}
              selectedObject={selectedObject}
            />
          </TabsContent>

          <TabsContent value="compress" className="mt-4">
            <SmartLoopCompressor
              canvas={canvas}
              selectedObject={selectedObject}
            />
          </TabsContent>

          <TabsContent value="tools" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload Image</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Upload images to canvas</p>
                    <p>• AI-powered enhancement</p>
                    <p>• Generative fill capabilities</p>
                    <p>• Smart compression</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {isProcessing && (
        <div className="p-4 border-t border-border">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing...</span>
              <span>{processingProgress}%</span>
            </div>
            <Progress value={processingProgress} className="h-2" />
          </div>
        </div>
      )}
    </div>
  )
}