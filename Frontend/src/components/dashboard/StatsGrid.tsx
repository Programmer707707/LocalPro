import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatItem {
  label: string
  value: string | number
  icon: LucideIcon
  color: string
  bg: string
}

export default function StatsGrid({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.bg)}>
            <stat.icon className={cn("w-5 h-5", stat.color)} />
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}