import { Star } from "lucide-react"
import StarRating from "@/components/StarRating"

interface Review {
  id: number
  rating: number
  comment?: string
  created_at: string
}

export default function RecentReviewsCard({ reviews }: { reviews: Review[] }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <h2 className="font-bold text-foreground text-lg mb-5">Recent Reviews</h2>
      {reviews.length === 0 ? (
        <div className="text-center py-10">
          <Star className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No reviews yet. Complete your profile to attract customers!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.slice(0, 5).map((review) => (
            <div key={review.id} className="border border-border rounded-xl p-4 hover:bg-muted/30 transition-colors">
              <StarRating rating={review.rating} size="sm" />
              {review.comment && <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{review.comment}</p>}
              <p className="text-[10px] text-muted-foreground/60 mt-2 uppercase tracking-wider font-medium">
                {new Date(review.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}