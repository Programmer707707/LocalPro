import { cn } from "@/lib/utils"
import type { Category } from "@/types"
import { Check } from "lucide-react"
import { CATEGORY_ICONS } from "../ServiceCard"

interface CategorySelectorProps {
  categories: Category[]
  selectedIds: number[]
  onToggle: (id: number) => void
}

export default function CategorySelector({ categories, selectedIds, onToggle }: CategorySelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-lg font-bold text-foreground tracking-tight">Service Categories</h2>
          <p className="text-sm text-muted-foreground">Select the areas where you offer expertise</p>
        </div>
        {selectedIds.length > 0 && (
          <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full animate-in zoom-in">
            {selectedIds.length} Selected
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {categories.map((cat) => {
          const isSelected = selectedIds.includes(cat.id)
          const icon = CATEGORY_ICONS[cat.slug] ?? "🔹"

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onToggle(cat.id)}
              className={cn(
                "relative group flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 text-center gap-2 outline-none",
                isSelected
                  ? "bg-primary/5 border-primary shadow-sm shadow-primary/10"
                  : "bg-card border-border/50 hover:border-primary/30 hover:bg-muted/30"
              )}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5 animate-in fade-in zoom-in duration-300">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}

              <span className={cn(
                "text-3xl transition-transform duration-300 group-hover:scale-110",
                isSelected ? "scale-110" : "grayscale-[0.5] group-hover:grayscale-0"
              )}>
                {icon}
              </span>

              <span className={cn(
                "text-xs font-bold leading-tight transition-colors",
                isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {cat.name}
              </span>
            </button>
          )
        })}
      </div>
      
      {selectedIds.length === 0 && (
        <p className="text-[11px] text-center text-muted-foreground/60 italic pt-2">
          At least one category is required to be visible in search results.
        </p>
      )}
    </div>
  )
}