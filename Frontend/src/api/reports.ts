import client from "@/api/client"
import type { ReportProfileCreate, ReportReviewCreate, ReportOut } from "@/types"


export const reportProfile = async (
  reportedUserId: number,
  data: ReportProfileCreate
): Promise<ReportOut> => {
  const response = await client.post<ReportOut>(
    `/reports/profile/${reportedUserId}`,
    data
  )
  return response.data
}

export const reportReview = async (
  reviewId: number,
  data: ReportReviewCreate
): Promise<ReportOut> => {
  const response = await client.post<ReportOut>(
    `/reports/review/${reviewId}`,
    data
  )
  return response.data
}