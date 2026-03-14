import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxStars?: number
  interactive?: boolean
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  reviewCount?: number
  onRate?: (rating: number) => void
  className?: string
}

const STAR_SIZE_MAP = {
  sm: "h-3.5 w-3.5",
  md: "h-4.5 w-4.5",
  lg: "h-5.5 w-5.5",
}

const TEXT_SIZE_MAP = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
}

export default function StarRating({
  rating,
  maxStars = 5,
  interactive = false,
  size = "md",
  showValue = false,
  reviewCount,
  onRate,
  className,
}: StarRatingProps) {
  const stars = Array.from({ length: maxStars }, (_, index) => index + 1)

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div className="flex items-center gap-1">
        {stars.map((star) => {
          const fillPercentage = Math.max(0, Math.min(100, (rating - (star - 1)) * 100))

          return (
            <button
              key={star}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRate?.(star)}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              className={cn(
                "relative rounded-sm transition-all duration-200",
                interactive
                  ? "cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  : "cursor-default"
              )}
            >
              <Star
                className={cn(
                  STAR_SIZE_MAP[size],
                  "text-muted-foreground/20"
                )}
              />

              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <Star
                  className={cn(
                    STAR_SIZE_MAP[size],
                    "fill-amber-400 text-amber-400 drop-shadow-[0_1px_2px_rgba(251,191,36,0.25)]"
                  )}
                />
              </div>
            </button>
          )
        })}
      </div>

      {(showValue || reviewCount !== undefined) && (
        <div className="flex items-center gap-1.5">
          {showValue && (
            <span
              className={cn(
                "font-semibold tracking-tight text-foreground",
                TEXT_SIZE_MAP[size]
              )}
            >
              {rating.toFixed(1)}
            </span>
          )}

          {reviewCount !== undefined && (
            <span
              className={cn(
                "text-muted-foreground",
                TEXT_SIZE_MAP[size]
              )}
            >
              {reviewCount} review{reviewCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      )}
    </div>
  )
}