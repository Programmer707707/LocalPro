import { Badge } from "@/components/ui/badge"
import type { PortfolioImage } from "@/types"

interface PortfolioGridProps {
  images: PortfolioImage[]
  onImageClick: (url: string) => void
}

export default function PortfolioGrid({ images, onImageClick }: PortfolioGridProps) {
  if (images.length === 0) return null

  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Portfolio</h2>
        <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
          {images.length} item{images.length !== 1 ? "s" : ""}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => onImageClick(image.url)}
            className="group aspect-square overflow-hidden rounded-2xl border border-border/40 bg-muted shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <img
              src={image.url}
              alt="Portfolio"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
    </div>
  )
}