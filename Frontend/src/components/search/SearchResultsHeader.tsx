import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { Category } from "@/types"

type Props = {
  selectedCategory?: Category
  categorySlug: string
  city: string
  minRating: string
  resultCount: number
  isLoading: boolean
  onClearCategory: () => void
  onClearCity: () => void
  onClearRating: () => void
}

export default function SearchResultsHeader({
  selectedCategory,
  categorySlug,
  city,
  minRating,
  resultCount,
  isLoading,
  onClearCategory,
  onClearCity,
  onClearRating,
}: Props) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {selectedCategory ? selectedCategory.name : "All Professionals"}
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {isLoading ? "Searching..." : `${resultCount} professionals found`}
          </p>
        </div>

        <div className="hidden flex-wrap gap-2 sm:flex">
          {categorySlug && (
            <Badge
              variant="secondary"
              className="cursor-pointer gap-1"
              onClick={onClearCategory}
            >
              {selectedCategory?.name}
              <X className="h-3 w-3" />
            </Badge>
          )}

          {city && (
            <Badge
              variant="secondary"
              className="cursor-pointer gap-1"
              onClick={onClearCity}
            >
              {city}
              <X className="h-3 w-3" />
            </Badge>
          )}

          {minRating && (
            <Badge
              variant="secondary"
              className="cursor-pointer gap-1"
              onClick={onClearRating}
            >
              ★ {minRating}+
              <X className="h-3 w-3" />
            </Badge>
          )}
        </div>
      </div>
    </>
  )
}