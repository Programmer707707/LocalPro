import { ArrowLeft, Upload } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PortfolioHeaderProps {
  count: number
  max: number
  uploading: boolean
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PortfolioHeader({ count, max, uploading, onUpload }: PortfolioHeaderProps) {
  const navigate = useNavigate()

  return (
    <>
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground mt-1">{count}/{max} images uploaded</p>
        </div>

        {count < max && (
          <div>
            <Label htmlFor="portfolio-upload">
              <div className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors",
                uploading ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary hover:bg-primary/90 text-white"
              )}>
                {uploading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Uploading...</>
                ) : (
                  <><Upload className="w-4 h-4" /> Upload Images</>
                )}
              </div>
            </Label>
            <Input id="portfolio-upload" type="file" accept="image/*" multiple className="hidden" onChange={onUpload} disabled={uploading} />
          </div>
        )}
      </div>
    </>
  )
}