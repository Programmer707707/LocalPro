import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { BrowserRouter } from "react-router-dom"
import NotFoundPage from "@/pages/NotFoundPage"

const mockNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return { ...actual, useNavigate: () => mockNavigate }
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe("NotFoundPage", () => {
  it("renders 404 information", () => {
    render(<NotFoundPage />, { wrapper })
    expect(screen.getByText("404")).toBeInTheDocument()
    expect(screen.getByText(/page not found/i)).toBeInTheDocument()
  })

  it("handles navigation buttons correctly", async () => {
    render(<NotFoundPage />, { wrapper })
    
    await userEvent.click(screen.getByRole("button", { name: /go home/i }))
    expect(mockNavigate).toHaveBeenCalledWith("/")

    await userEvent.click(screen.getByRole("button", { name: /go back/i }))
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})