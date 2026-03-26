import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Eye, Star, MessageCircle, Settings, Images, TrendingUp } from "lucide-react"

import { getProfessionalProfile, getProfileCompleteness } from "@/api/profile"
import { getReviews } from "@/api/reviews"
import { useAuth } from "@/context/AuthContext"

import LoadingSpinner from "@/components/LoadingSpinner"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import StatsGrid from "@/components/dashboard/StatsGrid"
import CompletenessCard from "@/components/dashboard/CompletenessCard"
import RecentReviewsCard from "@/components/dashboard/RecentReviewsCard"
import QuickActionsCard from "@/components/dashboard/QuickActionsCard"
import ServicesCard from "@/components/dashboard/ServicesCard" 
import BioCard from "@/components/dashboard/BioCard"

export default function ProfessionalDashboard() {
  const { user } = useAuth()

  const { data: profile, isLoading: loadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfessionalProfile,
  })

  const { data: completeness } = useQuery({
    queryKey: ["profile-completeness"],
    queryFn: getProfileCompleteness,
  })

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", user?.id],
    queryFn: () => getReviews(user!.id),
    enabled: !!user?.id,
  })

  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    )
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  const STATS = [
    {
      label: "Profile Views",
      value: profile?.view_count ?? 0,
      icon: Eye,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Average Rating",
      value: averageRating.toFixed(1),
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Total Reviews",
      value: reviews.length,
      icon: MessageCircle,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Profile Complete",
      value: `${completeness?.percentage ?? 0}%`,
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ]

  const QUICK_ACTIONS = [
    { label: "Edit Profile", icon: Settings, href: "/profile/edit" },
    { label: "Manage Portfolio", icon: Images, href: "/portfolio" },
    { label: "View Public Profile", icon: Eye, href: `/professionals/${user?.id}` },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <DashboardHeader 
          fullName={`${user?.first_name} ${user?.last_name}`}
          initials={`${user?.first_name?.[0]}${user?.last_name?.[0]}`.toUpperCase()}
          city={profile?.city}
          profileImageUrl={profile?.profile_image_url}
          userId={user?.id}
        />

        <StatsGrid stats={STATS} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {completeness && (
              <CompletenessCard 
                percentage={completeness.percentage}
                completed={completeness.completed}
                missing={completeness.missing}
              />
            )}
            <RecentReviewsCard reviews={reviews} />
          </div>

          <div className="space-y-5">
            <QuickActionsCard actions={QUICK_ACTIONS} />
            
            <ServicesCard 
              categories={profile?.categories} 
              startingPrice={profile?.starting_price} 
            />

            {profile?.bio && <BioCard bio={profile.bio} />}
          </div>
        </div>
      </div>
    </div>
  )
}