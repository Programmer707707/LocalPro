import client from "@/api/client"
import type { Category } from "@/types"

export const getCategories = async (): Promise<Category[]> => {
  const response = await client.get<Category[]>("/categories/")
  return response.data
}