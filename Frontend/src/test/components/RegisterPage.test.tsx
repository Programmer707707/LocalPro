import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import RegisterPage from "@/pages/RegisterPage"

const mockNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return { ...actual, useNavigate: () => mockNavigate }
})

const mockRegister = vi.fn()
vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ register: mockRegister }),
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
)

describe("RegisterPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  it("renders registration form correctly", () => {
    render(<RegisterPage />, { wrapper })
    expect(screen.getByPlaceholderText(/John/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument()
  })

  it("navigates to correct location after successful registration", async () => {
    const user = userEvent.setup()
    mockRegister.mockResolvedValue({})
    
    render(<RegisterPage />, { wrapper })
    
    await user.type(screen.getByPlaceholderText(/John/i), "John")
    await user.type(screen.getByPlaceholderText(/Smith/i), "Doe")
    await user.type(screen.getByPlaceholderText(/you@example.com/i), "john@test.com")
    await user.type(screen.getByPlaceholderText(/Min 8 characters/i), "Password123!")
    
    const submitBtn = screen.getByRole("button", { name: /create account/i })
    await user.click(submitBtn)
    
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith("/")
    }, { timeout: 2000 })
  })

  it("handles registration failure", async () => {
    const user = userEvent.setup()
    mockRegister.mockRejectedValue({
      response: { data: { detail: "Email already exists" } }
    })

    render(<RegisterPage />, { wrapper })
    
    await user.type(screen.getByPlaceholderText(/John/i), "John")
    await user.type(screen.getByPlaceholderText(/Smith/i), "Doe")
    await user.type(screen.getByPlaceholderText(/you@example.com/i), "error@test.com")
    await user.type(screen.getByPlaceholderText(/Min 8 characters/i), "Password123!")
    
    await user.click(screen.getByRole("button", { name: /create account/i }))
    
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalled()
    })
  })
})