import { Button } from "@/components/ui/button"
import ProfessionalCard from "@/components/ProfessionalCard"
import SkeletonCard from "@/components/SkeletonCard"
import type { ProfessionalPublicOut } from "@/types"

type Props = {
  professionals: ProfessionalPublicOut[]
  isLoading: boolean
  isFetching: boolean
  pageSize: number
  onClearFilters: () => void
}

export default function SearchResultsGrid({
  professionals,
  isLoading,
  isFetching,
  pageSize,
  onClearFilters,
}: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: pageSize }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (professionals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4 text-6xl">🔍</div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          No professionals found
        </h3>
        <p className="mb-6 max-w-sm text-muted-foreground">
          Try adjusting your filters or search with different keywords.
        </p>
        <Button onClick={onClearFilters} variant="outline" className="rounded-xl">
          Clear all filters
        </Button>
      </div>
    )
  }

  return (
    <>
      {isFetching && (
        <p className="mb-4 text-sm text-muted-foreground">Updating results...</p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {professionals.map((pro) => (
          <ProfessionalCard key={pro.user_id} professional={pro} />
        ))}
      </div>
    </>
  )
}