export type UserRole = "customer" | "professional" | "admin"
export type ReportReason = "spam" | "fake" | "inappropriate" | "offensive" | "other"
export type ReportStatus = "pending" | "reviewed" | "dismissed"
export type SortOption = "rating_desc" | "price_asc" | "price_desc" | "newest"

export interface RegisterIn{
    email: string
    first_name: string 
    last_name: string 
    password: string 
    role?: UserRole
}

export interface LoginIn{
    email: string 
    password: string
}

export interface TokenOut{
    access_token: string 
    token_type: string
}

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role: UserRole
}

export interface UserUpdate {
  email?: string | null
  first_name?: string | null
  last_name?: string | null
}

export interface UserPublicOut {
  first_name: string
  last_name: string
  email: string
}

export interface Category {
  id: number
  name: string
  slug: string
  suggestions: string[] 
}

export interface CategoryCreate {
  name: string
}

// Customer profile
export interface CustomerProfile {
  city: string | null
  phone: string | null
  profile_image_url: string | null
}

export interface CustomerProfileUpdate {
  city?: string | null
  phone?: string | null
  profile_image_url?: string | null
}

export interface ProfessionalProfile {
  city: string
  service_areas: string
  years_experience: number
  bio: string | null
  starting_price: number | null
  phone: string | null
  profile_image_url: string | null
  categories: Category[]
}

export interface ProfessionalProfileUpdate {
  city?: string | null
  service_areas?: string | null
  years_experience?: number | null
  bio?: string | null
  starting_price?: number | null
  phone?: string | null
  profile_image_url?: string | null
  category_ids?: number[] | null
}

export interface RatingSummary {
  average_rating: number
  review_count: number
}

export interface PortfolioImage {
  id: number
  url: string
  created_at: string
}

export interface ProfessionalPublicOut {
  user_id: number
  user: UserPublicOut
  city: string
  service_areas: string
  years_experience: number
  bio: string | null
  starting_price: number | null
  phone: string | null
  profile_image_url: string | null
  categories: Category[]
  rating: RatingSummary
  portfolio: PortfolioImage[]
  view_count: number
}


export interface ReviewCreate {
  rating: number   // 1-5
  comment?: string | null
}

export interface Review {
  id: number
  rating: number
  comment: string
  created_at: string
}

export interface Favorite {
  professional_user_id: number
  professional: UserPublicOut
  created_at: string
}

export interface ReportProfileCreate {
  reason: ReportReason
  comment?: string | null
}

export interface ReportReviewCreate {
  reason: ReportReason
  comment?: string | null
}

export interface ReportOut {
  id: number
  reason: ReportReason
  status: ReportStatus
  comment: string | null
  created_at: string
}

export interface SearchParams {
  city?: string
  category_slug?: string
  keyword?: string
  min_price?: number
  max_price?: number
  sort?: SortOption
  page?: number
  page_size?: number
}

export interface ProfileImageUpdate {
  profile_image_url: string
}

export interface ImageKitAuth {
  token: string
  expire: number
  signature: string
  publicKey: string
  urlEndpoint: string
}