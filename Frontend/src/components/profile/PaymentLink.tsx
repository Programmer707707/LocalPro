import { ArrowUpRight, CreditCard } from "lucide-react"

type Props = {
  href: string
  label: string
  tag: string
}

export default function PaymentLink({ href, label, tag }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-2xl border border-border/60 bg-background px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-muted/40 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <CreditCard className="h-4 w-4" />
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">@{tag}</p>
        </div>
      </div>

      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
    </a>
  )
}