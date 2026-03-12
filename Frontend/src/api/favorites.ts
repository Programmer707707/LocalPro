import client from "@/api/client"
import type{ Favorite } from "@/types"

export const getFavorites = async (): Promise<Favorite[]> => {
  const response = await client.get<Favorite[]>("/favorites")
  return response.data
}

export const addFavorite = async (professionalUserId: number): Promise<void> => {
  await client.post(`/favorites/${professionalUserId}`)
}

export const removeFavorite = async (
  professionalUserId: number
): Promise<void> => {
  await client.delete(`/favorites/${professionalUserId}`)
}

export const checkFavorite = async (
  professionalUserId: number
): Promise<{ is_favorited: boolean }> => {
  const response = await client.get<{ is_favorited: boolean }>(
    `/favorites/${professionalUserId}/check`
  )
  return response.data
}