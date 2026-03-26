import { MapPin, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { Category } from "@/types"

type Props = {
  categories: Category[]
  categorySlug: string
  city: string
  minPrice: string
  maxPrice: string
  minRating: string
  activeFilterCount: number
  showFilters: boolean
  onClearFilters: () => void
  onCategoryClick: (slug: string) => void
  onCityChange: (value: string) => void
  onMinPriceChange: (value: string) => void
  onMaxPriceChange: (value: string) => void
  onMinRatingChange: (value: string) => void
}

export default function SearchFiltersSidebar({
  categories,
  categorySlug,
  city,
  minPrice,
  maxPrice,
  minRating,
  activeFilterCount,
  showFilters,
  onClearFilters,
  onCategoryClick,
  onCityChange,
  onMinPriceChange,
  onMaxPriceChange,
  onMinRatingChange,
}: Props) {
  return (
    <aside
      className={cn(
        "hidden w-64 shrink-0 space-y-6 lg:block",
        showFilters && "!block"
      )}
    >
      <div className="sticky top-36 rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Filters</h3>
          {activeFilterCount > 0 && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <X className="h-3 w-3" />
              Clear all
            </button>
          )}
        </div>

        <Separator className="mb-4" />

        <div className="mb-5">
          <Label className="mb-3 block text-sm font-semibold text-foreground">
            Category
          </Label>
          <div className="space-y-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryClick(cat.slug)}
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  categorySlug === cat.slug
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <Separator className="mb-4" />

        <div className="mb-5">
          <Label className="mb-3 block text-sm font-semibold text-foreground">
            City
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter city..."
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              className="h-9 rounded-lg border-border/50 bg-muted/50 pl-8 text-sm"
            />
          </div>
        </div>

        <Separator className="mb-4" />

        <div className="mb-5">
          <Label className="mb-3 block text-sm font-semibold text-foreground">
            Price Range ($/hr)
          </Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="h-9 rounded-lg border-border/50 bg-muted/50 text-sm"
              min={0}
            />
            <span className="shrink-0 text-sm text-muted-foreground">to</span>
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="h-9 rounded-lg border-border/50 bg-muted/50 text-sm"
              min={0}
            />
          </div>
        </div>

        <Separator className="mb-4" />

        <div className="mb-2">
          <Label className="mb-3 block text-sm font-semibold text-foreground">
            Minimum Rating
          </Label>
          <div className="space-y-1.5">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <button
                key={rating}
                onClick={() =>
                  onMinRatingChange(minRating === String(rating) ? "" : String(rating))
                }
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  minRating === String(rating)
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span className="text-yellow-400">★</span>
                {rating}+ stars
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}