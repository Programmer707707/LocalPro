import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import StarRating from "@/components/StarRating"

describe("StarRating", () => {
  it("renders correct number of stars and metadata", () => {
    render(<StarRating rating={4.5} maxStars={5} showValue reviewCount={120} />)
    
    const stars = screen.getAllByRole("button")
    expect(stars).toHaveLength(5)
    expect(screen.getByText("4.5")).toBeInTheDocument()
    expect(screen.getByText(/120/)).toBeInTheDocument()
  })

  it("handles interactive rating correctly", async () => {
    const onRate = vi.fn()
    render(<StarRating rating={0} interactive onRate={onRate} />)
    
    const stars = screen.getAllByRole("button")
    await userEvent.click(stars[2])
    
    expect(onRate).toHaveBeenCalledWith(3)
  })

  it("does not call onRate when not in interactive mode", async () => {
    const onRate = vi.fn()
    render(<StarRating rating={3} onRate={onRate} />)
    
    const stars = screen.getAllByRole("button")
    await userEvent.click(stars[0])
    
    expect(onRate).not.toHaveBeenCalled()
  })
})