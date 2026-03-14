import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Search, MapPin, ArrowRight, Star, Shield, Clock, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ServiceCard from "@/components/ServiceCard"
import ProfessionalCard from "@/components/ProfessionalCard"
import SkeletonCard from "@/components/SkeletonCard"
import { getCategories } from "@/api/categories"
import { searchProfessionals } from "@/api/professionals"
import type { Category, ProfessionalPublicOut } from "@/types"

const TESTIMONIALS = [
  {
    id: 1,
    name: "Jessica Thompson",
    role: "Homeowner in Austin, TX",
    text: "Found an amazing plumber within 20 minutes of posting my leak. The vetting process really gave me peace of mind.",
    rating: 5,
    avatar: "JT",
  },
  {
    id: 2,
    name: "Robert Vance",
    role: "Professional in Chicago, IL",
    text: "LocalPro has been a game changer for my small law firm. We've connected with more local clients than ever before.",
    rating: 5,
    avatar: "RV",
  },
  {
    id: 3,
    name: "Maria Santos",
    role: "Customer in Miami, FL",
    text: "I needed a tutor for my daughter and found the perfect match in under an hour. Absolutely love this platform.",
    rating: 5,
    avatar: "MS",
  },
]

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Search,
    title: "Search",
    description: "Tell us what you need and where. We'll find matching professionals near you instantly.",
  },
  {
    step: "02",
    icon: Star,
    title: "Browse",
    description: "Compare profiles, reviews, and ratings for top professionals in your area.",
  },
  {
    step: "03",
    icon: ThumbsUp,
    title: "Contact",
    description: "Get free quotes and contact professionals directly through the platform.",
  },
]

export default function HomePage() {
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState("")
  const [city, setCity] = useState("")
  const [categorySlug, setCategorySlug] = useState("")

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
  })

  const { data: topProfessionals = [], isLoading: loadingPros } = useQuery<ProfessionalPublicOut[]>({
    queryKey: ["top-professionals"],
    queryFn: () => searchProfessionals({ sort: "rating_desc", page_size: 4 }),
    staleTime: 1000 * 60 * 5,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword.trim()) params.set("keyword", keyword.trim())
    if (city.trim()) params.set("city", city.trim())
    if (categorySlug) params.set("category_slug", categorySlug)
    navigate(`/search?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-background">

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
              Trusted by 50,000+ customers nationwide
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
              onSubmit={handleSearch}
              className="bg-card border border-border rounded-2xl p-2 shadow-lg max-w-3xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-2">

                <Select onValueChange={setCategorySlug}>
                  <SelectTrigger className="sm:w-44 h-11 border-0 bg-muted/50 rounded-xl focus:ring-0 text-sm">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.slug}>
                        {cat.name}
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
                    onChange={(e) => setCity(e.target.value)}
                    className="pl-9 h-11 border-0 bg-muted/50 rounded-xl focus-visible:ring-0 text-sm"
                  />
                </div>

                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search keyword..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
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
                  onClick={() => navigate(`/search?category_slug=${cat.slug}`)}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                Our Services
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                Explore Categories
              </h2>
              <p className="text-muted-foreground mt-2">
                Popular services requested in your area this week
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/categories")}
              className="hidden sm:flex items-center gap-1 text-primary hover:text-primary"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <ServiceCard key={cat.id} category={cat} variant="simple" />
            ))}
          </div>

          <div className="flex justify-center mt-6 sm:hidden">
            <Button
              variant="outline"
              onClick={() => navigate("/categories")}
              className="flex items-center gap-1"
            >
              View All Categories
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Simple Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              How LocalPro Works
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Get connected with the right professional in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {HOW_IT_WORKS.map((item, index) => (
              <div
                key={item.step}
                className="relative flex flex-col items-center text-center p-8 bg-card rounded-2xl border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute -top-3 left-6 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {item.step}
                </div>

                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 mt-2">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {index + 1}. {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                Top Rated
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                Featured Professionals
              </h2>
              <p className="text-muted-foreground mt-2">
                Highly rated professionals ready to help you today
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/search")}
              className="hidden sm:flex items-center gap-1 text-primary hover:text-primary"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadingPros
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : topProfessionals.map((pro) => (
                  <ProfessionalCard key={pro.user_id} professional={pro} />
                ))
            }
          </div>

          {topProfessionals.length === 0 && !loadingPros && (
            <div className="text-center py-16 text-muted-foreground">
              <p>No professionals found yet. Be the first to join!</p>
              <Button
                className="mt-4 bg-primary text-white"
                onClick={() => navigate("/register")}
              >
                Join as Professional
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "50k+", label: "Verified Professionals" },
              { value: "4.9/5", label: "Average Rating" },
              { value: "2M+", label: "Completed Services" },
              { value: "24/7", label: "Customer Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-white/70 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Trusted by thousands of neighbors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-12">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join thousands of satisfied customers who found their perfect professional on LocalPro.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-medium rounded-xl px-8"
                onClick={() => navigate("/search")}
              >
                Find a Professional
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl px-8 border-primary/30 text-primary hover:bg-primary/5"
                onClick={() => navigate("/register")}
              >
                Join as Professional
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}