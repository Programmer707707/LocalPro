import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Heart, Search } from "lucide-react"
import { useQuery as useReactQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import ProfessionalCard from "@/components/ProfessionalCard"
import SkeletonCard from "@/components/SkeletonCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import { getFavorites } from "@/api/favorites"
import { getPublicProfile } from "@/api/professionals"
import type { Favorite, ProfessionalPublicOut } from "@/types"

export default function FavoritesPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: favorites = [], isLoading } = useQuery<Favorite[]>({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  })

  const handleFavoriteChange = (professionalId: number, isFavorited: boolean) => {
    if (!isFavorited) {
      queryClient.setQueryData<Favorite[]>(["favorites"], (old) =>
        old?.filter((f) => f.professional_user_id !== professionalId) ?? []
      )
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading favorites..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Saved Professionals
            </h1>
          </div>
          <p className="text-muted-foreground">
            {favorites.length === 0
              ? "You haven't saved any professionals yet"
              : `${favorites.length} saved professional${favorites.length > 1 ? "s" : ""}`
            }
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Heart className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No favorites yet
            </h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              Browse professionals and tap the heart icon to save them here for
              quick access later.
            </p>
            <Button
              onClick={() => navigate("/search")}
              className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2"
            >
              <Search className="w-4 h-4" />
              Find Professionals
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {favorites.map((favorite) => (
              <FavoriteCard
                key={favorite.professional_user_id}
                professionalUserId={favorite.professional_user_id}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface FavoriteCardProps {
  professionalUserId: number
  onFavoriteChange: (id: number, isFavorited: boolean) => void
}

function FavoriteCard({ professionalUserId, onFavoriteChange }: FavoriteCardProps) {
  const { data: professional, isLoading } = useReactQuery<ProfessionalPublicOut>({
    queryKey: ["professional", professionalUserId],
    queryFn: () => getPublicProfile(professionalUserId),
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) return <SkeletonCard />
  if (!professional) return null

  return (
    <ProfessionalCard
      professional={professional}
      isFavorited={true}
      onFavoriteChange={onFavoriteChange}
    />
  )
}