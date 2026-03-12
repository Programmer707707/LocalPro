import client from "@/api/client"
import type { ProfessionalPublicOut, SearchParams } from "@/types"

export const searchProfessionals = async (
  params: SearchParams
): Promise<ProfessionalPublicOut[]> => {
  const response = await client.get<ProfessionalPublicOut[]>(
    "/professionals/search",
    { params })
  return response.data
}

export const getPublicProfile = async (
  userId: number
): Promise<ProfessionalPublicOut> => {
  const response = await client.get<ProfessionalPublicOut>(
    `/professionals/public/${userId}`
  )
  return response.data
}

export const getAllProfessionals = async (): Promise<ProfessionalPublicOut[]> => {
  const response = await client.get<ProfessionalPublicOut[]>("/professionals/")
  return response.data
}