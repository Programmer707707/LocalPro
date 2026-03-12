import client from "./client"
import type { LoginIn, RegisterIn, TokenOut, User } from "../types"

export const register = async (data: RegisterIn): Promise<User> => {
  const response = await client.post<User>("/auth/register", data)
  return response.data
}

export const login = async (data: LoginIn): Promise<TokenOut> => {
  const response = await client.post<TokenOut>("/auth/login", data)
  return response.data
}

export const logout = async (): Promise<void> => {
  await client.post("/auth/logout")
}

export const getMe = async (): Promise<User> => {
  const response = await client.get<User>("/users/me")
  return response.data
}