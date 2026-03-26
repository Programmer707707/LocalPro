import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ReportReason } from "@/types"

const REPORT_REASONS: { value: ReportReason; label: string }[] = [
  { value: "spam", label: "Spam" },
  { value: "fake", label: "Fake Profile" },
  { value: "inappropriate", label: "Inappropriate Content" },
  { value: "offensive", label: "Offensive Behavior" },
  { value: "other", label: "Other" },
]

interface ReportModalProps {
  open: boolean
  title: string
  reason: ReportReason
  comment: string
  isPending: boolean
  onClose: () => void
  onReasonChange: (reason: ReportReason) => void
  onCommentChange: (comment: string) => void
  onSubmit: () => void
}

export default function ReportModal({
  open,
  title,
  reason,
  comment,
  isPending,
  onClose,
  onReasonChange,
  onCommentChange,
  onSubmit,
}: ReportModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-3xl border-border/60 p-0 overflow-hidden">
        <DialogHeader className="border-b border-border/60 px-6 py-5">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 px-6 py-5">
          <div>
            <Label className="mb-2 block text-sm font-medium">Reason</Label>
            <Select value={reason} onValueChange={(v) => onReasonChange(v as ReportReason)}>
              <SelectTrigger className="rounded-2xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REPORT_REASONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2 block text-sm font-medium">
              Additional details
            </Label>
            <Textarea
              placeholder="Describe the issue..."
              value={comment}
              onChange={(e) => onCommentChange(e.target.value)}
              className="min-h-[110px] resize-none rounded-2xl"
              rows={3}
              maxLength={500}
            />
          </div>
        </div>

        <DialogFooter className="border-t border-border/60 px-6 py-4">
          <Button variant="outline" onClick={onClose} className="rounded-2xl">
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isPending}
            className="rounded-2xl bg-destructive text-white hover:bg-destructive/90"
          >
            {isPending ? "Reporting..." : "Submit Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}