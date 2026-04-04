import { Search, MapPin, SlidersHorizontal, ChevronDown } from "lucide-react"
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
import { Separator } from "@/components/ui/separator"
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
    <div className="sticky top-16 z-30 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="relative flex flex-col gap-4 md:flex-row md:items-center">
          
          <div className="group flex flex-1 items-center gap-0 rounded-2xl border border-border/50 bg-muted/30 p-1 shadow-sm transition-all focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/5 hover:border-border/80">
            <div className="relative flex flex-[2] items-center">
              <Search className="absolute left-4 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                type="text"
                placeholder="What service do you need?"
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
                className="h-10 border-0 bg-transparent pl-11 text-sm shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/70"
              />
            </div>

            <Separator orientation="vertical" className="hidden h-6 bg-border/60 sm:block" />

            <div className="relative hidden flex-1 items-center sm:flex">
              <MapPin className="absolute left-4 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Location..."
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                className="h-10 border-0 bg-transparent pl-11 text-sm shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/70"
              />
            </div>

            <Button
              type="submit"
              size="sm"
              className="hidden h-10 gap-2 rounded-xl bg-primary px-6 font-medium text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 active:scale-95 sm:flex"
            >
              Search
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
              <SelectTrigger className="h-11 w-[160px] rounded-2xl border-border/50 bg-muted/30 text-xs font-medium transition-all hover:bg-muted/50 focus:ring-primary/10">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground font-normal text-[10px] uppercase tracking-wider">Sort:</span>
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent align="end" className="rounded-xl">
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className="text-sm">
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
                "relative h-11 gap-2 rounded-2xl border-border/50 bg-muted/30 px-4 text-xs font-medium transition-all hover:bg-muted/50",
                showFilters && "border-primary/50 bg-primary/5 text-primary"
              )}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 animate-in zoom-in items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-md ring-2 ring-background">
                  {activeFilterCount}
                </div>
              )}
            </Button>

            <Button
              type="submit"
              className="flex h-11 w-full flex-1 rounded-2xl bg-primary text-white sm:hidden"
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}