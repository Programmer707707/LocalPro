import client from "@/api/client"
import type { Review, ReviewCreate, RatingSummary } from "@/types"

export const createReview = async (professionalUserId: number, data: ReviewCreate): Promise<Review> => {
  const response = await client.post<Review>(
    `/professionals/${professionalUserId}/reviews`,
    data
  )
  return response.data
}

export const getReviews = async (
  professionalUserId: number
): Promise<Review[]> => {
  const response = await client.get<Review[]>(
    `/professionals/${professionalUserId}/reviews`
  )
  return response.data
}

export const getRating = async (
  professionalUserId: number
): Promise<RatingSummary> => {
  const response = await client.get<RatingSummary>(
    `/professionals/${professionalUserId}/rating`
  )
  return response.data
}