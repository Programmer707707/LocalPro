import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  page: number
  pageSize: number
  resultCount: number
  onPageChange: (page: number) => void
}

export default function SearchPagination({
  page,
  pageSize,
  resultCount,
  onPageChange,
}: Props) {
  if (resultCount === 0) return null

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="gap-1 rounded-xl"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {[page - 1, page, page + 1]
          .filter((p) => p > 0)
          .map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={cn(
                "h-9 w-9 rounded-lg text-sm font-medium transition-colors",
                p === page
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {p}
            </button>
          ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={resultCount < pageSize}
        className="gap-1 rounded-xl"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}