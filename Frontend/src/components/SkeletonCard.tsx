import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">

      <Skeleton className="h-48 w-full rounded-none" />

      <div className="p-4 space-y-3">

        <Skeleton className="h-4 w-3/4" />

        <Skeleton className="h-3 w-1/2" />

        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        <Skeleton className="h-4 w-28" />

        <Skeleton className="h-9 w-full rounded-xl" />
      </div>
    </div>
  )
}