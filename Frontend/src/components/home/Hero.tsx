import { Search, MapPin, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Category } from "@/types"

type Props = {
  categories: Category[]
  keyword: string
  city: string
  onKeywordChange: (value: string) => void
  onCityChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onSearch: (e: React.FormEvent) => void
  onCategoryNavigate: (slug: string) => void
}

export default function Hero({
  categories,
  keyword,
  city,
  onKeywordChange,
  onCityChange,
  onCategoryChange,
  onSearch,
  onCategoryNavigate,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background pt-16 pb-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6 border border-primary/20">
            <Shield className="w-4 h-4" />
            Trusted by 500+ customers nationwide
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight mb-6">
            Find Trusted Local{" "}
            <span className="text-primary relative">
              Professionals
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M1 9 C75 3, 150 3, 299 9"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-primary/40"
                />
              </svg>
            </span>{" "}
            Near You
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            From home repair to legal consulting, we connect you with the best
            in your neighborhood. Verified, rated, and ready to help.
          </p>

          <form
            onSubmit={onSearch}
            className="bg-card border border-border rounded-2xl p-2 shadow-lg max-w-3xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <Select onValueChange={onCategoryChange}>
                <SelectTrigger className="sm:w-45 min-h-10 px-4 m-auto rounded-xl bg-muted/50 border-border/50 text-sm focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.slug} className="py-2 px-2">
                      <span className="text-sm">{cat.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="City or area..."
                  value={city}
                  onChange={(e) => onCityChange(e.target.value)}
                  className="pl-9 h-11 border-0 bg-muted/50 rounded-xl focus-visible:ring-0 text-sm"
                />
              </div>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search keyword..."
                  value={keyword}
                  onChange={(e) => onKeywordChange(e.target.value)}
                  className="pl-9 h-11 border-0 bg-muted/50 rounded-xl focus-visible:ring-0 text-sm"
                />
              </div>

              <Button
                type="submit"
                className="h-11 px-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl shrink-0"
              >
                Search
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {categories.slice(0, 4).map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryNavigate(cat.slug)}
                className="text-sm text-primary hover:underline font-medium"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}