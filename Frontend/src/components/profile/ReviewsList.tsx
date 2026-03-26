import { Star, MessageCircle, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import StarRating from "@/components/StarRating"
import { useAuth } from "@/context/AuthContext"
import type { Review } from "@/types"

interface ReviewsListProps {
  reviews: Review[]
  onAddReview: () => void
  onReportReview: (reviewId: number) => void
}

export default function ReviewsList({
  reviews,
  onAddReview,
  onReportReview,
}: ReviewsListProps) {
  const { user } = useAuth()

  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Reviews ({reviews.length})
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            See what customers are saying about this professional.
          </p>
        </div>
        {user?.role === "customer" && (
          <Button
            size="sm"
            onClick={onAddReview}
            className="rounded-2xl gap-1.5 shadow-sm"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Add Review
          </Button>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 py-14 text-center">
          <Star className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">
            No reviews yet. Be the first to review this professional.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-border/60 bg-background/70 p-5 transition-colors hover:bg-muted/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <StarRating rating={review.rating} size="sm" />
                  {review.comment && (
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {review.comment}
                    </p>
                  )}
                  <p className="mt-3 text-xs text-muted-foreground/70">
                    {new Date(review.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {user && (
                  <button
                    onClick={() => onReportReview(review.id)}
                    className="shrink-0 rounded-full p-2 text-muted-foreground/50 transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Flag className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}