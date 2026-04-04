import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ProfessionalCard from "@/components/ProfessionalCard"
import type { ProfessionalPublicOut } from "@/types"

const mockProfessional: ProfessionalPublicOut = {
  user_id: 1,
  user: {
    first_name: "John",
    last_name: "Doe",
    email: "john@test.com",
  },
  city: "Budapest",
  service_areas: "district v",
  years_experience: 5,
  bio: "Experienced plumber",
  starting_price: 5000,
  phone: "+36201234567",
  profile_image_url: null,
  categories: [
    { id: 1, name: "Construction & Repair", slug: "construction-repair", suggestions: []}
  ],
  rating: { average_rating: 4.5, review_count: 20 },
  portfolio_images: [],
  view_count: 100,
}

const mockUser = {
  id: 2,
  email: "customer@test.com",
  first_name: "Jane",
  last_name: "Smith",
  role: "customer" as const,
}

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ user: mockUser }),
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
)

describe("ProfessionalCard", () => {
  it("renders professional full name", () => {
    render(<ProfessionalCard professional={mockProfessional} />, { wrapper })
    expect(screen.getByText("John Doe")).toBeInTheDocument()
  })

  it("renders city", () => {
    render(<ProfessionalCard professional={mockProfessional} />, { wrapper })
    expect(screen.getByText("Budapest")).toBeInTheDocument()
  })

  it("renders category badge", () => {
    render(<ProfessionalCard professional={mockProfessional} />, { wrapper })
    expect(screen.getByText("Construction & Repair")).toBeInTheDocument()
  })

  it("renders starting price", () => {
    render(<ProfessionalCard professional={mockProfessional} />, { wrapper })
    expect(screen.getByText(/5000/)).toBeInTheDocument()
  })

  it("renders view profile button", () => {
    render(<ProfessionalCard professional={mockProfessional} />, { wrapper })
    expect(screen.getByText("View Profile")).toBeInTheDocument()
  })

  it("shows heart button for customer", () => {
    render(<ProfessionalCard professional={mockProfessional} />, { wrapper })
    const buttons = screen.getAllByRole("button")
    const heartButton = buttons.find(btn =>
        btn.querySelector(".lucide-heart")
        )
    expect(heartButton).toBeInTheDocument()
  })

  it("shows initials when no profile image", () => {
    render(<ProfessionalCard professional={mockProfessional} />, { wrapper })
    expect(screen.getByText("JD")).toBeInTheDocument()
  })

  it("renders rating", () => {
    render(<ProfessionalCard professional={mockProfessional} />, { wrapper })
    expect(screen.getByText("4.5")).toBeInTheDocument()
  })

  it("renders review count", () => {
    render(<ProfessionalCard professional={mockProfessional} />, { wrapper })
    expect(screen.getByText(/20/)).toBeInTheDocument()
  })
})