import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import StarRating from "@/components/StarRating"

interface ReviewModalProps {
  open: boolean
  onClose: () => void
  rating: number
  comment: string
  isPending: boolean
  onRatingChange: (rating: number) => void
  onCommentChange: (comment: string) => void
  onSubmit: () => void
}

export default function ReviewModal({
  open,
  onClose,
  rating,
  comment,
  isPending,
  onRatingChange,
  onCommentChange,
  onSubmit,
}: ReviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-3xl border-border/60 p-0 overflow-hidden">
        <DialogHeader className="border-b border-border/60 px-6 py-5">
          <DialogTitle className="text-lg font-semibold">Write a Review</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 px-6 py-5">
          <div>
            <Label className="mb-3 block text-sm font-medium">Your Rating</Label>
            <StarRating rating={rating} interactive size="lg" onRate={onRatingChange} />
            {rating === 0 && (
              <p className="mt-2 text-xs text-destructive">Please select a rating</p>
            )}
          </div>
          <div>
            <Label htmlFor="comment" className="mb-2 block text-sm font-medium">
              Comment
            </Label>
            <Textarea
              id="comment"
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => onCommentChange(e.target.value)}
              className="min-h-[120px] resize-none rounded-2xl"
              rows={4}
              maxLength={1000}
            />
            <p className="mt-2 text-right text-xs text-muted-foreground">
              {comment.length}/1000
            </p>
          </div>
        </div>

        <DialogFooter className="border-t border-border/60 px-6 py-4">
          <Button variant="outline" onClick={onClose} className="rounded-2xl">
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={rating === 0 || isPending}
            className="rounded-2xl"
          >
            {isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}