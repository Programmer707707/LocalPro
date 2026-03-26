import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

interface CompletenessProps {
  percentage: number
  completed: string[]
  missing: string[]
}

export default function CompletenessCard({ percentage, completed, missing }: CompletenessProps) {
  const navigate = useNavigate()
  const isDone = percentage === 100

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-foreground text-lg">Profile Completeness</h2>
        <span className={cn("text-sm font-semibold", isDone ? "text-primary" : "text-yellow-500")}>
          {percentage}%
        </span>
      </div>

      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-5">
        <div 
          className={cn("h-full rounded-full transition-all duration-500", isDone ? "bg-primary" : "bg-yellow-500")} 
          style={{ width: `${percentage}%` }} 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {completed.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
            <span className="capitalize">{item}</span>
          </div>
        ))}
        {missing.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0" />
            <span className="capitalize">{item}</span>
          </div>
        ))}
      </div>

      {missing.length > 0 && (
        <Button size="sm" onClick={() => navigate("/profile/edit")} className="mt-5 w-full sm:w-auto bg-primary text-white rounded-xl gap-2">
          Complete Profile <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      )}
    </div>
  )
}