import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MapPin, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import StarRating from "@/components/StarRating"
import { useAuth } from "@/context/AuthContext"
import { addFavorite, removeFavorite } from "@/api/favorites"
import type { ProfessionalPublicOut } from "@/types"
import { cn } from "@/lib/utils"

interface ProfessionalCardProps {
  professional: ProfessionalPublicOut
  isFavorited?: boolean
  onFavoriteChange?: (professionalId: number, isFavorited: boolean) => void
}

export default function ProfessionalCard({
  professional,
  isFavorited = false,
  onFavoriteChange,
}: ProfessionalCardProps) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [favorited, setFavorited] = useState(isFavorited)
  const [loadingFavorite, setLoadingFavorite] = useState(false)

  const fullName = `${professional.user.first_name} ${professional.user.last_name}`
  const initials = `${professional.user.first_name[0]}${professional.user.last_name[0]}`.toUpperCase()

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) {
      navigate("/login")
      return
    }

    setLoadingFavorite(true)
    try {
      if (favorited) {
        await removeFavorite(professional.user_id)
        setFavorited(false)
        onFavoriteChange?.(professional.user_id, false)
      } else {
        await addFavorite(professional.user_id)
        setFavorited(true)
        onFavoriteChange?.(professional.user_id, true)
      }
    } catch (error) {
      console.error("Failed to update favorite", error)
    } finally {
      setLoadingFavorite(false)
    }
  }

  const handleCardClick = () => {
    navigate(`/professionals/${professional.user_id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-card border border-border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20"
    >
      <div className="relative h-48 bg-muted overflow-hidden">
        {professional.profile_image_url ? (
          <img
            src={professional.profile_image_url}
            alt={fullName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <Avatar className="w-20 h-20">
              <AvatarImage src="" alt={fullName} />
              <AvatarFallback className="text-2xl font-bold text-primary bg-primary/10">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        {user?.role === "customer" && (
          <button
            onClick={handleFavorite}
            disabled={loadingFavorite}
            className={cn(
              "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm",
              favorited
                ? "bg-red-500 text-white"
                : "bg-white/90 text-gray-500 hover:bg-white hover:text-red-500",
              loadingFavorite && "opacity-50 cursor-not-allowed"
            )}
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-all",
                favorited && "fill-white"
              )}
            />
          </button>
        )}

        {professional.starting_price && (
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            From ${professional.starting_price}/hr
          </div>
        )}
      </div>

      <div className="p-4">

        <h3 className="font-semibold text-foreground text-base group-hover:text-primary transition-colors truncate">
          {fullName}
        </h3>

        <div className="flex items-center gap-1 mt-1 mb-2">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="text-xs text-muted-foreground truncate">
            {professional.city}
          </span>
        </div>

        {professional.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {professional.categories.slice(0, 2).map((cat) => (
              <Badge
                key={cat.id}
                variant="secondary"
                className="text-xs px-2 py-0.5 rounded-full"
              >
                {cat.name}
              </Badge>
            ))}
            {professional.categories.length > 2 && (
              <Badge
                variant="outline"
                className="text-xs px-2 py-0.5 rounded-full"
              >
                +{professional.categories.length - 2}
              </Badge>
            )}
          </div>
        )}

        <div className="mb-4">
          <StarRating
            rating={professional.rating.average_rating}
            showValue
            reviewCount={professional.rating.review_count}
            size="sm"
          />
        </div>

        <Button
          size="sm"
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl font-medium"
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/professionals/${professional.user_id}`)
          }}
        >
          View Profile
        </Button>
      </div>
    </div>
  )
}