import { Badge } from "@/components/ui/badge"

interface CustomerHeaderProps {
  role?: string
}

export default function CustomerHeader({ role }: CustomerHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal details and account information.
        </p>
      </div>

      <Badge
        variant="secondary"
        className="w-fit rounded-full border border-primary/10 bg-primary/10 px-3 py-1 text-primary capitalize"
      >
        {role}
      </Badge>
    </div>
  )
}