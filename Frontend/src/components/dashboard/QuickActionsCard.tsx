import { ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Action { 
  label: string; 
  icon: LucideIcon; 
  href: string 
}

interface QuickActionsCardProps {
  actions: Action[]
}

export default function QuickActionsCard({ actions }: QuickActionsCardProps) {
  const navigate = useNavigate()
  
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
      <h2 className="font-bold text-foreground mb-4">Quick Actions</h2>
      <div className="space-y-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.href)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-muted transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <action.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {action.label}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        ))}
      </div>
    </div>
  )
}