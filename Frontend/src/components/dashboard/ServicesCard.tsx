import { Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"

interface Category {
  id: number
  name: string
}

interface ServicesCardProps {
  categories?: Category[]
  startingPrice?: number | string | null
}

export default function ServicesCard({ categories, startingPrice }: ServicesCardProps) {
  const navigate = useNavigate()
  const hasCategories = categories && categories.length > 0

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-foreground">Your Services</h2>
        <button
          onClick={() => navigate("/profile/edit")}
          className="text-xs text-primary hover:underline font-medium"
        >
          Edit
        </button>
      </div>

      {hasCategories ? (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant="secondary"
              className="rounded-full text-[11px] px-2.5 py-0.5 bg-secondary/50"
            >
              {cat.name}
            </Badge>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 border border-dashed border-border rounded-xl bg-muted/20">
          <Briefcase className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
          <p className="text-xs text-muted-foreground mb-3">
            No services added yet
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("/profile/edit")}
            className="rounded-xl text-xs h-8"
          >
            Add Services
          </Button>
        </div>
      )}

      {startingPrice && (
        <>
          <Separator className="my-4" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Starting price</span>
            <span className="font-semibold text-foreground">
              {startingPrice} HUF/hr
            </span>
          </div>
        </>
      )}
    </div>
  )
}