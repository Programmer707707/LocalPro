import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "@/components/LoadingSpinner"
import ProfileCard from "@/components/profile/ProfileCard"
import DetailsCard from "@/components/profile/DetailsCard"
import PortfolioGrid from "@/components/profile/PortfolioGrid"
import ReviewsList from "@/components/profile/ReviewsList"
import ReviewModal from "@/components/profile/ReviewModal"
import ReportModal from "@/components/profile/ReportModal"
import ImageLightbox from "@/components/profile/ImageLightbox"
import { getPublicProfile } from "@/api/professionals"
import { getReviews, createReview } from "@/api/reviews"
import { addFavorite, removeFavorite, checkFavorite } from "@/api/favorites"
import { reportProfile, reportReview } from "@/api/reports"
import { useAuth } from "@/context/AuthContext"
import type { Review, ReviewCreate, ReportReason } from "@/types"
import { toast } from "sonner"

export default function ProfessionalProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const professionalId = Number(id)

  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showReportProfileModal, setShowReportProfileModal] = useState(false)
  const [showReportReviewModal, setShowReportReviewModal] = useState(false)
  const [reportingReviewId, setReportingReviewId] = useState<number | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState("")
  const [reportReason, setReportReason] = useState<ReportReason>("spam")
  const [reportComment, setReportComment] = useState("")

  const { data: professional, isLoading } = useQuery({
    queryKey: ["professional", professionalId],
    queryFn: () => getPublicProfile(professionalId),
    enabled: !!professionalId,
  })

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ["reviews", professionalId],
    queryFn: () => getReviews(professionalId),
    enabled: !!professionalId,
  })

  const { data: favoriteData } = useQuery({
    queryKey: ["favorite-check", professionalId],
    queryFn: () => checkFavorite(professionalId),
    enabled: !!user && user.role === "customer",
  })

  const isFavorited = favoriteData?.is_favorited ?? false
  const isOwnProfile = user?.id === professionalId;


  const favoriteMutation = useMutation({
    mutationFn: () =>
      isFavorited ? removeFavorite(professionalId) : addFavorite(professionalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite-check", professionalId] })
    },
  })

  const reviewMutation = useMutation({
    mutationFn: (data: ReviewCreate) => createReview(professionalId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", professionalId] })
      queryClient.invalidateQueries({ queryKey: ["professional", professionalId] })
      setShowReviewModal(false)
      setReviewRating(0)
      setReviewComment("")
      toast.success("Review submitted successfully!")
    },
    onError: (error: unknown) => {
      setShowReviewModal(false)
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response
      ) {
        const data = error.response.data as { detail?: string }
        if (data.detail === "already_reviewed") {
          toast.error("You have already reviewed this professional.")
        } else {
          toast.error("Failed to submit review. Please try again.")
        }
      }
    },
  })

  const reportProfileMutation = useMutation({
    mutationFn: () =>
      reportProfile(professionalId, { reason: reportReason, comment: reportComment }),
    onSuccess: () => {
      setShowReportProfileModal(false)
      setReportComment("")
      setReportReason("spam")
      toast.success("Report submitted successfully!")
    },
  })

  const reportReviewMutation = useMutation({
    mutationFn: () =>
      reportReview(reportingReviewId!, { reason: reportReason, comment: reportComment }),
    onSuccess: () => {
      setShowReportReviewModal(false)
      setReportComment("")
      setReportReason("spam")
      setReportingReviewId(null)
      toast.success("Review reported successfully!")
    },
  })

  const handleReportReview = (reviewId: number) => {
    setReportingReviewId(reviewId)
    setShowReportReviewModal(true)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    )
  }

  if (!professional) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4">
        <p className="text-lg text-muted-foreground">Professional not found.</p>
        <Button onClick={() => navigate("/search")} variant="outline" className="rounded-full">
          Back to Search
        </Button>
      </div>
    )
  }

  const serviceAreas = professional.service_areas
    ? professional.service_areas.split(",").map((s) => s.trim()).filter(Boolean)
    : []

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-1">
            <ProfileCard
              professional={professional}
              isFavorited={isFavorited}
              favoritePending={favoriteMutation.isPending}
              onFavorite={() => favoriteMutation.mutate()}
              onReview={() => setShowReviewModal(true)}
              onReport={!isOwnProfile ? () => setShowReportProfileModal(true) : undefined}
            />
            <DetailsCard
              professional={professional}
              serviceAreas={serviceAreas}
            />
          </div>

          <div className="space-y-6 lg:col-span-2">
            {professional.bio && (
              <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-bold tracking-tight text-foreground">About</h2>
                <p className="text-sm leading-7 text-muted-foreground">{professional.bio}</p>
              </div>
            )}

            <PortfolioGrid
              images={professional.portfolio_images ?? []}
              onImageClick={setSelectedImage}
            />

            <ReviewsList
              reviews={reviews}
              onAddReview={() => setShowReviewModal(true)}
              onReportReview={handleReportReview}
            />
          </div>
        </div>
      </div>

      <ImageLightbox url={selectedImage} onClose={() => setSelectedImage(null)} />

      <ReviewModal
        open={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        rating={reviewRating}
        comment={reviewComment}
        isPending={reviewMutation.isPending}
        onRatingChange={setReviewRating}
        onCommentChange={setReviewComment}
        onSubmit={() => {
          if (reviewRating === 0) return
          reviewMutation.mutate({ rating: reviewRating, comment: reviewComment || null })
        }}
      />

      <ReportModal
        open={showReportProfileModal}
        title="Report Profile"
        reason={reportReason}
        comment={reportComment}
        isPending={reportProfileMutation.isPending}
        professionalId = {id || ""}
        onClose={() => setShowReportProfileModal(false)}
        onReasonChange={setReportReason}
        onCommentChange={setReportComment}
        onSubmit={() => reportProfileMutation.mutate()}
      />
    </div>
  )
}