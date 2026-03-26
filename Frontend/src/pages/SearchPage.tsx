import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/api/categories"
import { searchProfessionals } from "@/api/professionals"
import type { Category, ProfessionalPublicOut, SortOption } from "@/types"
import SearchTopBar from "@/components/search/SearchTopBar"
import SearchFiltersSidebar from "@/components/search/SearchFiltersSidebar"
import SearchResultsHeader from "@/components/search/SearchResultsHeader"
import SearchResultsGrid from "@/components/search/SearchResultsGrid"
import SearchPagination from "@/components/search/SearchPagination"

const PAGE_SIZE = 12

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "")
  const [city, setCity] = useState(searchParams.get("city") ?? "")
  const [categorySlug, setCategorySlug] = useState(searchParams.get("category_slug") ?? "")
  const [minPrice, setMinPrice] = useState(searchParams.get("min_price") ?? "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") ?? "")
  const [minRating, setMinRating] = useState(searchParams.get("min_rating") ?? "")
  const [sort, setSort] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) ?? "rating_desc"
  )
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1))
  const [showFilters, setShowFilters] = useState(false)
  const [debouncedCity, setDebouncedCity] = useState(city)
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword)

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
    placeholderData: (previousData) => previousData,
  })

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedCity(city), 300)
    return () => clearTimeout(timer)
  }, [city])

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(keyword), 300)
    return () => clearTimeout(timer)
  }, [keyword])

  const queryParams = {
    keyword: debouncedKeyword || undefined,
    city: debouncedCity || undefined,
    category_slug: categorySlug || undefined,
    min_price: minPrice ? Number(minPrice) : undefined,
    max_price: maxPrice ? Number(maxPrice) : undefined,
    min_rating: minRating ? Number(minRating) : undefined,
    sort: sort || undefined,
    page,
    page_size: PAGE_SIZE,
  }

  const { data: professionals = [], isLoading, isFetching } = useQuery<ProfessionalPublicOut[]>({
    queryKey: ["professionals", queryParams],
    queryFn: () => searchProfessionals(queryParams),
    staleTime: 1000 * 60 * 2,
  })

  useEffect(() => {
    const params: Record<string, string> = {}
    if (debouncedKeyword) params.keyword = debouncedKeyword
    if (debouncedCity) params.city = debouncedCity
    if (categorySlug) params.category_slug = categorySlug
    if (minPrice) params.min_price = minPrice
    if (maxPrice) params.max_price = maxPrice
    if (minRating) params.min_rating = minRating
    if (sort) params.sort = sort
    if (page > 1) params.page = String(page)
    setSearchParams(params)
  }, [
    debouncedKeyword,
    debouncedCity,
    categorySlug,
    minPrice,
    maxPrice,
    minRating,
    sort,
    page,
    setSearchParams,
  ])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
  }

  const handleClearFilters = () => {
    setKeyword("")
    setCity("")
    setCategorySlug("")
    setMinPrice("")
    setMaxPrice("")
    setMinRating("")
    setSort("rating_desc")
    setPage(1)
  }

  const handleCategoryClick = (slug: string) => {
    setCategorySlug(slug === categorySlug ? "" : slug)
    setPage(1)
  }

  const activeFilterCount = [
    categorySlug,
    city,
    minPrice,
    maxPrice,
    minRating,
  ].filter(Boolean).length

  const selectedCategory = categories.find((c) => c.slug === categorySlug)

  return (
    <div className="min-h-screen bg-background">
      <SearchTopBar
        keyword={keyword}
        city={city}
        sort={sort}
        showFilters={showFilters}
        activeFilterCount={activeFilterCount}
        onKeywordChange={setKeyword}
        onCityChange={(value) => {
          setCity(value)
          setPage(1)
        }}
        onSortChange={(value) => {
          setSort(value)
          setPage(1)
        }}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onSubmit={handleSearch}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          <SearchFiltersSidebar
            categories={categories}
            categorySlug={categorySlug}
            city={city}
            minPrice={minPrice}
            maxPrice={maxPrice}
            minRating={minRating}
            activeFilterCount={activeFilterCount}
            showFilters={showFilters}
            onClearFilters={handleClearFilters}
            onCategoryClick={handleCategoryClick}
            onCityChange={(value) => {
              setCity(value)
              setPage(1)
            }}
            onMinPriceChange={(value) => {
              setMinPrice(value)
              setPage(1)
            }}
            onMaxPriceChange={(value) => {
              setMaxPrice(value)
              setPage(1)
            }}
            onMinRatingChange={(value) => {
              setMinRating(value)
              setPage(1)
            }}
          />

          <div className="min-w-0 flex-1">
            <SearchResultsHeader
              selectedCategory={selectedCategory}
              categorySlug={categorySlug}
              city={city}
              minRating={minRating}
              resultCount={professionals.length}
              isLoading={isLoading}
              onClearCategory={() => setCategorySlug("")}
              onClearCity={() => setCity("")}
              onClearRating={() => setMinRating("")}
            />

            <SearchResultsGrid
              professionals={professionals}
              isLoading={isLoading}
              isFetching={isFetching}
              pageSize={PAGE_SIZE}
              onClearFilters={handleClearFilters}
            />

            <SearchPagination
              page={page}
              pageSize={PAGE_SIZE}
              resultCount={professionals.length}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}