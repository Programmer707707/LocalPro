import client from "@/api/client"
import type { CustomerProfile, CustomerProfileUpdate, ProfessionalProfile, ProfessionalProfileUpdate, ImageKitAuth, User } from "@/types"

export const updateUser = async (data: {first_name?: string, last_name?: string}): Promise<User> => {
  const response = await client.put<User>("/users/me", data)
  return response.data
}

export const getCustomerProfile = async (): Promise<CustomerProfile> => {
  const response = await client.get<CustomerProfile>("/customers/me")
  return response.data
}

export const updateCustomerProfile = async (
  data: CustomerProfileUpdate
): Promise<CustomerProfile> => {
  const response = await client.put<CustomerProfile>("/customers/me", data)
  return response.data
}

export const updateCustomerProfileImage = async (
  url: string
): Promise<CustomerProfile> => {
  const response = await client.patch<CustomerProfile>(
    "/customers/me/profile_image",
    { profile_image_url: url }
  )
  return response.data
}


export const getProfessionalProfile = async (): Promise<ProfessionalProfile> => {
  const response = await client.get<ProfessionalProfile>("/professionals/me")
  return response.data
}

export const updateProfessionalProfile = async (
  data: ProfessionalProfileUpdate
): Promise<ProfessionalProfile> => {
  const response = await client.put<ProfessionalProfile>(
    "/professionals/me",
    data
  )
  return response.data
}

export const updateProfessionalProfileImage = async (
  url: string
): Promise<ProfessionalProfile> => {
  const response = await client.patch<ProfessionalProfile>(
    "/professionals/me/profile-image",
    { profile_image_url: url }
  )
  return response.data
}


export const addPortfolioImage = async (url: string): Promise<void> => {
  await client.post("/professionals/me/portfolio", { url })
}


interface CompletenessResult {
  percentage: number
  completed: string[]
  missing: string[]
  is_complete: boolean
}

export const getProfileCompleteness =
  async (): Promise<CompletenessResult> => {
    const response =
      await client.get<CompletenessResult>("/professionals/me/completeness")
    return response.data
  }


export const getImageKitAuth = async (): Promise<ImageKitAuth> => {
  const response = await client.get<ImageKitAuth>("/uploads/imagekit-auth")
  return response.data
}

export const deletePortfolioImage = async (imageId: number): Promise<void> => {
  await client.delete(`/professionals/me/portfolio/${imageId}`)
}