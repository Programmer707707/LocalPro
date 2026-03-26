import { Search, MapPin, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { SortOption } from "@/types"

const SORT_OPTIONS = [
  { value: "rating_desc", label: "Highest Rated" },
  { value: "reviews_desc", label: "Most Reviewed" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
]

type Props = {
  keyword: string
  city: string
  sort: SortOption
  showFilters: boolean
  activeFilterCount: number
  onKeywordChange: (value: string) => void
  onCityChange: (value: string) => void
  onSortChange: (value: SortOption) => void
  onToggleFilters: () => void
  onSubmit: (e: React.FormEvent) => void
}

export default function SearchTopBar({
  keyword,
  city,
  sort,
  showFilters,
  activeFilterCount,
  onKeywordChange,
  onCityChange,
  onSortChange,
  onToggleFilters,
  onSubmit,
}: Props) {
  return (
    <div className="sticky top-16 z-30 border-b border-border bg-background/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit}>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search professionals..."
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
                className="h-10 rounded-xl border-border/50 bg-muted/50 pl-9 text-sm"
              />
            </div>

            <div className="relative hidden w-44 sm:block">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="City..."
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                className="h-10 rounded-xl border-border/50 bg-muted/50 pl-9 text-sm"
              />
            </div>

            <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
              <SelectTrigger className="hidden h-10 w-44 rounded-xl border-border/50 bg-muted/50 text-sm sm:flex">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              type="button"
              variant="outline"
              onClick={onToggleFilters}
              className={cn(
                "h-10 gap-2 rounded-xl border-border/50 px-4 text-sm",
                showFilters && "border-primary bg-primary/5 text-primary"
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <Badge className="flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-xs text-white">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>

            <Button
              type="submit"
              className="h-10 shrink-0 rounded-xl bg-primary px-5 text-sm text-white hover:bg-primary/90"
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}