import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import LoginPage from "@/pages/LoginPage"

const mockNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return { ...actual, useNavigate: () => mockNavigate }
})

const mockLogin = vi.fn()
vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ login: mockLogin }),
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
})

const renderWithProviders = (ui: React.ReactElement, { route = "/login" } = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("navigates based on user role after successful login", async () => {
    mockLogin.mockResolvedValueOnce({ role: "professional" })
    renderWithProviders(<LoginPage />)
    
    await userEvent.type(screen.getByPlaceholderText(/you@example.com/i), "pro@test.com")
    await userEvent.type(screen.getByPlaceholderText(/password/i), "Pass@123")
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }))
    
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/dashboard"))
  })

  it("displays error message on failed login", async () => {
    mockLogin.mockRejectedValueOnce({
      response: { data: { detail: "Invalid credentials" } }
    })
    
    renderWithProviders(<LoginPage />)
    await userEvent.type(screen.getByPlaceholderText(/you@example.com/i), "wrong@test.com")
    await userEvent.type(screen.getByPlaceholderText(/password/i), "wrong")
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })

  it("handles account blocked state via query params", () => {
    renderWithProviders(<LoginPage />, { route: "/login?blocked=true" })
    expect(screen.getByText(/account has been disabled/i)).toBeInTheDocument()
  })
})