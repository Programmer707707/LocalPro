import { Mail, Shield } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface CustomerAccountInfoProps {
  email?: string
  role?: string
}

export default function CustomerAccountInfo({ email, role }: CustomerAccountInfoProps) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">Account Information</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your account details are shown below.</p>
      </div>
      <div className="space-y-1">
        <div className="flex flex-col gap-4 rounded-2xl py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">{email}</p>
            </div>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col gap-4 rounded-2xl py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Account Type</p>
              <p className="text-sm font-medium capitalize text-foreground">{role}</p>
            </div>
          </div>
          <Badge variant="secondary" className="w-fit rounded-full border border-primary/10 bg-primary/10 px-3 py-1 text-primary capitalize">
            {role}
          </Badge>
        </div>
      </div>
    </div>
  )
}