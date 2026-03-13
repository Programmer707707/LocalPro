import { ThemeToggle } from "@/components/ThemeToggle"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold text-foreground mb-4">
        Home Page
      </h1>
      <div className="bg-card text-card-foreground p-4 rounded-lg shadow mb-4">
        This is a card
      </div>
      <ThemeToggle />
    </div>
  )
}