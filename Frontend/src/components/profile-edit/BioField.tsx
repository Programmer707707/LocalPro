import { FileText } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface BioFieldProps {
  bio: string
  onChange: (val: string) => void
}

export default function BioField({ bio, onChange }: BioFieldProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="font-semibold text-foreground mb-5">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          About You
        </div>
      </h2>
      <Textarea
        value={bio}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your experience..."
        className="rounded-xl resize-none bg-muted/50 border-border/50"
        rows={5}
        maxLength={1000}
      />
      <p className="text-xs text-muted-foreground mt-2 text-right">
        {bio.length}/1000
      </p>
    </div>
  )
}