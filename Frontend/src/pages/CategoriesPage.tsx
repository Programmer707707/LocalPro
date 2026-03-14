import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import ServiceCard from "@/components/ServiceCard"
import { getCategories } from "@/api/categories"
import type { Category } from "@/types"

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "construction-repair": "Building, renovation, and structural repairs for residential and commercial projects.",
  "auto-services": "Vehicle maintenance, engine diagnostics, and specialized mechanical repairs.",
  "appliance-repair": "Expert fixing for kitchen, laundry equipment, and HVAC system maintenance.",
  "household-services": "Professional cleaning, gardening, landscaping, and complete home care solutions.",
  "education-courses": "Academic tutoring, language lessons, and specialized skill-building programs.",
  "marketing-advertising": "Digital strategy, creative content services, branding, and social media growth.",
  "legal-finance": "Consultation, professional legal aid, documentation, and contract reviews.",
  "beauty-health": "Personal care, hair styling, wellness services, and professional grooming.",
}

const CATEGORY_PRO_COUNTS: Record<string, number> = {
  "construction-repair": 420,
  "auto-services": 315,
  "appliance-repair": 280,
  "household-services": 550,
  "education-courses": 190,
  "marketing-advertising": 210,
  "legal-finance": 145,
  "beauty-health": 390,
}

const CATEGORY_ICONS: Record<string, string> = {
  "construction-repair": "🔨",
  "auto-services": "🚗",
  "appliance-repair": "🔧",
  "household-services": "🏠",
  "education-courses": "📚",
  "marketing-advertising": "📣",
  "legal-finance": "⚖️",
  "beauty-health": "💄",
}

export default function CategoriesPage() {
  const navigate = useNavigate()

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
  })

  return (
    <div className="min-h-screen bg-background">

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background pt-14 pb-16">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6 border border-primary/20">
            <span className="text-xs uppercase tracking-wider font-bold">
              Explore Expertise
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
                Service Categories
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Connect with over 2,500+ top-rated local professionals across
                8 specialized industries designed to help you get things done.
              </p>
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-medium rounded-xl px-6 shrink-0 flex items-center gap-2"
              onClick={() => navigate("/search")}
            >
              <Zap className="w-4 h-4" />
              Get Instant Quote
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border overflow-hidden">
                  <Skeleton className="h-48 w-full rounded-none" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {categories.map((category) => (
                <CategoryDetailCard
                  key={category.id}
                  category={category}
                  description={CATEGORY_DESCRIPTIONS[category.slug] ?? ""}
                  proCount={CATEGORY_PRO_COUNTS[category.slug] ?? 0}
                  icon={CATEGORY_ICONS[category.slug] ?? "🔹"}
                  onClick={() => navigate(`/search?category_slug=${category.slug}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-10 sm:p-14 relative overflow-hidden">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute right-10 top-1/2 -translate-y-1/2 text-white/10 text-9xl select-none hidden lg:block">
                🔧
              </div>
            </div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                Don't see what you're looking for?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Tell us about your project and we'll find the right expert for
                you in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold rounded-xl px-8"
                  onClick={() => navigate("/search")}
                >
                  Post a Request
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8"
                  onClick={() => navigate("/search")}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

interface CategoryDetailCardProps {
  category: Category
  description: string
  proCount: number
  icon: string
  onClick: () => void
}

function CategoryDetailCard({
  category,
  description,
  proCount,
  icon,
  onClick,
}: CategoryDetailCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col text-left bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 w-full"
    >
      <div className="relative h-44 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">

        <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">
          {icon}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

        <div className="absolute bottom-4 left-4 w-12 h-12 bg-card rounded-xl flex items-center justify-center text-2xl shadow-md border border-border/50">
          {icon}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors mb-2">
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-primary">
            {proCount} Pros
          </span>
          <ArrowRight className="w-4 h-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  )
}