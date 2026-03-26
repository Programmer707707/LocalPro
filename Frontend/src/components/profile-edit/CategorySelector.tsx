import { cn } from "@/lib/utils"
import type { Category } from "@/types"

interface CategorySelectorProps {
  categories: Category[]
  selectedIds: number[]
  onToggle: (id: number) => void
}

export default function CategorySelector({ categories, selectedIds, onToggle }: CategorySelectorProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="font-semibold text-foreground mb-2">Service Categories</h2>
      <p className="text-sm text-muted-foreground mb-5">Select all categories that apply</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isSelected = selectedIds.includes(cat.id)
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onToggle(cat.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200",
                isSelected
                  ? "bg-primary text-white border-primary"
                  : "bg-muted/50 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              )}
            >
              {cat.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}