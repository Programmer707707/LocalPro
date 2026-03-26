import { Trash2, Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { PortfolioImage } from "@/types"

interface PortfolioGridProps {
  images: PortfolioImage[]
  max: number
  deletingId: number | null
  uploading: boolean
  onDelete: (id: number) => void
  onSelect: (url: string) => void
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PortfolioGrid({ images, max, deletingId, uploading, onDelete, onSelect, onUpload }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
      {images.map((image) => (
        <div key={image.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
          <img
            src={image.url}
            alt="Portfolio"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
            onClick={() => onSelect(image.url)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 pointer-events-none" />
          <button
            onClick={() => onDelete(image.id)}
            disabled={deletingId === image.id}
            className={cn(
              "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white shadow-md",
              deletingId === image.id && "opacity-100 cursor-not-allowed"
            )}
          >
            {deletingId === image.id ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
          </button>
          <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <p className="text-white text-[10px]">
              {new Date(image.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}

      {images.length < max && (
        <Label htmlFor="portfolio-upload-grid">
          <div className="aspect-square w-full rounded-2xl border-2 border-dashed border-border hover:border-primary/40 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
              <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors font-medium">Add More</p>
          </div>
          <Input id="portfolio-upload-grid" type="file" accept="image/*" multiple className="hidden" onChange={onUpload} disabled={uploading} />
        </Label>
      )}
    </div>
  )
}