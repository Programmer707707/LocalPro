import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/api/categories"
import { searchProfessionals } from "@/api/professionals"
import type { Category, ProfessionalPublicOut } from "@/types"
import Hero from "@/components/home/Hero"
import Categories from "@/components/home/Categories"
import HowItWorks from "@/components/home/HowItWorks"
import FeaturedProfessionals from "@/components/home/FeaturedProfessionals"
import PlatformHighlights from "@/components/home/PlatformHighlights"
import Testimonials from "@/components/home/Testimonials"
import CTA from "@/components/home/CTA"

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

  const handleCategoryNavigate = (slug: string) => {
    navigate(`/search?category_slug=${slug}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero
        categories={categories}
        keyword={keyword}
        city={city}
        onKeywordChange={setKeyword}
        onCityChange={setCity}
        onCategoryChange={setCategorySlug}
        onSearch={handleSearch}
        onCategoryNavigate={handleCategoryNavigate}
      />

      <Categories categories={categories} />

      <HowItWorks />

      <FeaturedProfessionals
        professionals={topProfessionals}
        loading={loadingPros}
      />

      <PlatformHighlights />

      {/* <Testimonials /> */}

      <CTA />
    </div>
  )
}