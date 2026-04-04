import { Heart, Flag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import StarRating from "@/components/StarRating"
import { useAuth } from "@/context/AuthContext"
import type { ProfessionalPublicOut } from "@/types"
import { cn } from "@/lib/utils"

interface ProfileCardProps {
  professional: ProfessionalPublicOut
  isFavorited: boolean
  favoritePending: boolean
  onFavorite: () => void
  onReview: () => void
  onReport: (() => void) | undefined
}

export default function ProfileCard({
  professional,
  isFavorited,
  favoritePending,
  onFavorite,
  onReview,
  onReport,
}: ProfileCardProps) {
  const { user } = useAuth()
  const fullName = `${professional.user.first_name} ${professional.user.last_name}`
  const initials = `${professional.user.first_name[0]}${professional.user.last_name[0]}`.toUpperCase()

  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
      <div className="h-28 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
      <div className="px-6 pb-6">
        <div className="-mt-12 mb-4">
          {professional.profile_image_url ? (
            <img
              src={professional.profile_image_url}
              alt={fullName}
              className="h-24 w-24 rounded-3xl border-4 border-card object-cover shadow-lg"
            />
          ) : (
            <Avatar className="h-24 w-24 rounded-3xl border-4 border-card shadow-lg">
              <AvatarImage src="" />
              <AvatarFallback className="rounded-3xl bg-primary/10 text-2xl font-bold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {fullName}
            </h1>
            <div className="mt-2">
              <StarRating
                rating={professional.rating.average_rating}
                showValue
                reviewCount={professional.rating.review_count}
                size="sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {professional.categories.map((cat) => (
              <Badge
                key={cat.id}
                variant="secondary"
                className="rounded-full border border-border/50 bg-muted/60 px-3 py-1 text-xs font-medium"
              >
                {cat.name}
              </Badge>
            ))}
          </div>

          <div className="space-y-2 pt-1">
            {user?.role === "customer" && (
              <>
                <Button
                  onClick={onReview}
                  className="h-11 w-full rounded-2xl gap-2 shadow-sm"
                >
                  <Star className="h-4 w-4" />
                  Write a Review
                </Button>
                <Button
                  variant="outline"
                  onClick={onFavorite}
                  disabled={favoritePending}
                  className={cn(
                    "h-11 w-full rounded-2xl gap-2 border-border/60 bg-background shadow-sm",
                    isFavorited && "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400"
                  )}
                >
                  <Heart className={cn("h-4 w-4", isFavorited && "fill-red-500 text-red-500")} />
                  {isFavorited ? "Saved" : "Save Professional"}
                </Button>
              </>
            )}
            {user && onReport && (
              <Button
                variant="ghost"
                onClick={onReport}
                className="h-10 w-full rounded-2xl gap-2 text-muted-foreground hover:text-destructive"
              >
                <Flag className="h-3.5 w-3.5" />
                Report Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}