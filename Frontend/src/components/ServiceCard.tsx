import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import type { Category } from "@/types"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  category: Category
  variant?: "simple" | "detailed"
  className?: string
}

export const CATEGORY_ICONS: Record<string, string> = {
  "construction-repair": "🔨",
  "auto-services": "🚗",
  "appliance-repair": "🔧",
  "household-services": "🏠",
  "education-courses": "📚",
  "marketing-advertising": "📣",
  "legal-finance": "⚖️",
  "beauty-health": "💄",
  "it-tech-support": "💻",
  "photography-videography": "📷",
  "events-entertainment": "🎉",
  "pet-services": "🐾",
  "delivery-logistics": "🚚",
  "design-architecture": "🏛️",
  "childcare-elderly-care": "👶",
  "food-catering": "🍽️",
  "fitness-wellness": "💪",
  "translation-interpretation": "🌐",
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  "construction-repair": "from-orange-500/10 to-orange-500/5 hover:from-orange-500/20 hover:to-orange-500/10",
  "auto-services": "from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10",
  "appliance-repair": "from-purple-500/10 to-purple-500/5 hover:from-purple-500/20 hover:to-purple-500/10",
  "household-services": "from-green-500/10 to-green-500/5 hover:from-green-500/20 hover:to-green-500/10",
  "education-courses": "from-yellow-500/10 to-yellow-500/5 hover:from-yellow-500/20 hover:to-yellow-500/10",
  "marketing-advertising": "from-pink-500/10 to-pink-500/5 hover:from-pink-500/20 hover:to-pink-500/10",
  "legal-finance": "from-indigo-500/10 to-indigo-500/5 hover:from-indigo-500/20 hover:to-indigo-500/10",
  "beauty-health": "from-rose-500/10 to-rose-500/5 hover:from-rose-500/20 hover:to-rose-500/10",
  "it-tech-support": "from-orange-500/10 to-orange-500/5 hover:from-orange-500/20 hover:to-orange-500/10",
  "photography-videography": "from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10",
  "events-entertainment": "from-green-500/10 to-green-500/5 hover:from-green-500/20 hover:to-green-500/10",
  "pet-services": "from-indigo-500/10 to-indigo-500/5 hover:from-indigo-500/20 hover:to-indigo-500/10",
  "delivery-logistics": "from-pink-500/10 to-pink-500/5 hover:from-pink-500/20 hover:to-pink-500/10",
  "design-architecture": "from-green-500/10 to-green-500/5 hover:from-green-500/20 hover:to-green-500/10",
  "childcare-elderly-care": "from-yellow-500/10 to-yellow-500/5 hover:from-yellow-500/20 hover:to-yellow-500/10",
  "food-catering": "from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10",
  "fitness-wellness": "from-purple-500/10 to-purple-500/5 hover:from-purple-500/20 hover:to-purple-500/10",
  "translation-interpretation": "from-orange-500/10 to-orange-500/5 hover:from-orange-500/20 hover:to-orange-500/10",
}

const CATEGORY_ICON_BG: Record<string, string> = {
  "construction-repair": "bg-orange-500/15 text-orange-600",
  "auto-services": "bg-blue-500/15 text-blue-600",
  "appliance-repair": "bg-purple-500/15 text-purple-600",
  "household-services": "bg-green-500/15 text-green-600",
  "education-courses": "bg-yellow-500/15 text-yellow-600",
  "marketing-advertising": "bg-pink-500/15 text-pink-600",
  "legal-finance": "bg-indigo-500/15 text-indigo-600",
  "beauty-health": "bg-rose-500/15 text-rose-600",
  "it-tech-support": "bg-orange-500/15 text-orange-600",
  "photography-videography": "bg-blue-500/15 text-blue-600",
  "events-entertainment": "bg-purple-500/15 text-purple-600",
  "pet-services": "bg-green-500/15 text-green-600",
  "delivery-logistics": "bg-yellow-500/15 text-yellow-600",
  "design-architecture": "bg-pink-500/15 text-pink-600",
  "childcare-elderly-care": "bg-indigo-500/15 text-indigo-600",
  "food-catering": "bg-rose-500/15 text-rose-600",
}

export default function ServiceCard({
  category,
  variant = "simple",
  className,
}: ServiceCardProps) {
  const navigate = useNavigate()

  const icon = CATEGORY_ICONS[category.slug] ?? "🔹"
  const gradient = CATEGORY_GRADIENTS[category.slug] ?? "from-primary/10 to-primary/5"
  const iconBg = CATEGORY_ICON_BG[category.slug] ?? "bg-primary/15 text-primary"

  const handleClick = () => {
    navigate(`/search?category_slug=${category.slug}`)
  }

  if (variant === "simple") {
    return (
    <button
      onClick={handleClick}
      className={cn(
        "group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card",
        "hover:border-primary/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1",
        "text-center w-full h-full",
        className
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0",
        "transition-transform duration-300 group-hover:scale-110",
        iconBg
      )}>
        {icon}
      </div>

      <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
        {category.name}
      </p>
    </button>
  )
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group relative flex flex-col gap-4 p-6 rounded-2xl border border-border bg-gradient-to-br",
        "hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
        "text-left w-full overflow-hidden",
        gradient,
        className
      )}
    >
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5 blur-2xl" />

      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl",
        "transition-transform duration-300 group-hover:scale-110 shadow-sm",
        iconBg
      )}>
        {icon}
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        {category.suggestions.length > 0 && (
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {category.suggestions.slice(0, 3).join(", ")}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-primary">
          Browse professionals
        </span>
        <ArrowRight className="w-4 h-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </button>
  )
}