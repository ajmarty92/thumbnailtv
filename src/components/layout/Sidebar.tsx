import { cn } from '@/lib/utils'
import { 
  Palette, 
  Type, 
  Image, 
  Layout, 
  Sparkles, 
  Settings,
  Tv
} from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const sidebarItems = [
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'images', label: 'Images', icon: Image },
  { id: 'layout', label: 'Layout', icon: Layout },
  { id: 'tv', label: 'TV Preview', icon: Tv },
  { id: 'ai', label: 'AI Tools', icon: Sparkles },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-16 bg-card border-r border-border flex flex-col">
      <div className="flex-1 py-4">
        <nav className="space-y-2 px-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center justify-center h-12 rounded-lg transition-colors",
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
                title={item.label}
              >
                <Icon className="h-5 w-5" />
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}