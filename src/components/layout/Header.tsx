import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Download, Save, Undo, Redo } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface HeaderProps {
  onUndo?: () => void
  onRedo?: () => void
  onSave?: () => void
  onExport?: () => void
}

export function Header({ onUndo, onRedo, onSave, onExport }: HeaderProps) {
  const { toast } = useToast()

  const handleUndo = () => {
    onUndo?.()
    toast({
      title: "Action undone",
      description: "Your last action has been undone.",
    })
  }

  const handleRedo = () => {
    onRedo?.()
    toast({
      title: "Action redone",
      description: "Your action has been redone.",
    })
  }

  const handleSave = () => {
    onSave?.()
    toast({
      title: "Project saved",
      description: "Your canvas has been saved successfully.",
    })
  }

  const handleExport = () => {
    onExport?.()
    toast({
      title: "Export started",
      description: "Your canvas is being exported as an image.",
    })
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">LivingRoom Canvas Editor</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleUndo}>
            <Undo className="h-4 w-4 mr-2" />
            Undo
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleRedo}>
            <Redo className="h-4 w-4 mr-2" />
            Redo
          </Button>
          
          <Separator orientation="vertical" className="h-6" />
          
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          
          <Button size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </header>
  )
}