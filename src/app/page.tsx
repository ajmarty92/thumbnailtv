'use client'

import { useState } from 'react'
import { CanvasEditor } from '@/components/canvas/CanvasEditor'
import { AIEditorPanel } from '@/components/ai/AIEditorPanel'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  const [canvas, setCanvas] = useState<any>(null)
  const [selectedObject, setSelectedObject] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('design')

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Editor Area */}
        <div className="flex-1 flex">
          {/* Canvas Container */}
          <div className="flex-1 p-6">
            <CanvasEditor
              onCanvasReady={setCanvas}
              onSelectionChange={setSelectedObject}
            />
          </div>
          
          {/* AI Panel */}
          <div className="w-80 border-l border-border bg-card">
            <AIEditorPanel
              canvas={canvas}
              selectedObject={selectedObject}
            />
          </div>
        </div>
      </div>
    </div>
  )
}