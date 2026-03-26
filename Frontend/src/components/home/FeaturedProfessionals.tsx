import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import ProfessionalCard from "@/components/ProfessionalCard"
import SkeletonCard from "@/components/SkeletonCard"
import type { ProfessionalPublicOut } from "@/types"

type Props = {
  professionals: ProfessionalPublicOut[]
  loading: boolean
}

export default function FeaturedProfessionals({
  professionals,
  loading,
}: Props) {
  const navigate = useNavigate()

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Top Rated
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Featured Professionals
            </h2>
            <p className="text-muted-foreground mt-2">
              Highly rated professionals ready to help you today
            </p>
          </div>

          <Button
            variant="ghost"
            onClick={() => navigate("/search")}
            className="hidden sm:flex items-center gap-1 text-primary hover:text-primary"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : professionals.map((pro) => (
                <ProfessionalCard key={pro.user_id} professional={pro} />
              ))}
        </div>

        {professionals.length === 0 && !loading && (
          <div className="text-center py-16 text-muted-foreground">
            <p>No professionals found yet. Be the first to join!</p>
            <Button
              className="mt-4 bg-primary text-white"
              onClick={() => navigate("/register")}
            >
              Join as Professional
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}