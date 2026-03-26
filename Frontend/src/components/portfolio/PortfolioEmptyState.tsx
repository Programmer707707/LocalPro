import { Images, Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface PortfolioEmptyStateProps {
  uploading: boolean
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PortfolioEmptyState({ uploading, onUpload }: PortfolioEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border rounded-2xl">
      <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-5">
        <Images className="w-10 h-10 text-muted-foreground/30" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">No portfolio images yet</h3>
      <p className="text-muted-foreground max-w-sm mb-6 text-sm">
        Upload photos of your work to attract more customers. High quality images significantly increase views.
      </p>
      <Label htmlFor="portfolio-upload-empty">
        <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-xl cursor-pointer transition-colors">
          <Plus className="w-4 h-4" /> Upload First Image
        </div>
      </Label>
      <Input id="portfolio-upload-empty" type="file" accept="image/*" multiple className="hidden" onChange={onUpload} disabled={uploading} />
    </div>
  )
}