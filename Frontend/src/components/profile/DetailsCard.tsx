import { MapPin, Phone, Briefcase, Eye, Wallet } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { ProfessionalPublicOut } from "@/types"
import PaymentLink from "./PaymentLink"

interface DetailsCardProps {
  professional: ProfessionalPublicOut
  serviceAreas: string[]
}

export default function DetailsCard({ professional, serviceAreas }: DetailsCardProps) {
  const revolutUrl = professional.revolut_tag
    ? `https://revolut.me/${professional.revolut_tag}`
    : null

  const wiseUrl = professional.wise_tag
    ? `https://wise.com/pay/me/${professional.wise_tag}`
    : null

  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
      <h3 className="text-base font-semibold text-foreground">Professional Details</h3>
      <Separator className="my-4" />

      <div className="space-y-4">
        <DetailItem icon={<MapPin className="h-4 w-4" />} text={professional.city} />

        {professional.phone && (
          <DetailItem icon={<Phone className="h-4 w-4" />} text={professional.phone} />
        )}

        <DetailItem
          icon={<Briefcase className="h-4 w-4" />}
          text={`${professional.years_experience} years of experience`}
        />

        <DetailItem
          icon={<Eye className="h-4 w-4" />}
          text={`${professional.view_count} profile views`}
        />

        {professional.starting_price && (
          <DetailItem
            icon={<Wallet className="h-4 w-4" />}
            text={`From ${professional.starting_price} HUF/hr`}
          />
        )}
      </div>

      {(professional.revolut_tag || professional.wise_tag) && (
        <div className="rounded-3xl mt-4 border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="text-base font-semibold text-foreground">Payment Options</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Open the professional's preferred payment profile.
          </p>
          <div className="mt-4 space-y-3">
            {professional.revolut_tag && (
              <PaymentLink
                href={revolutUrl ?? "#"}
                label="Pay via Revolut"
                tag={professional.revolut_tag}
              />
            )}
            {professional.wise_tag && (
              <PaymentLink
                href={wiseUrl ?? "#"}
                label="Pay via Wise"
                tag={professional.wise_tag}
              />
            )}
          </div>
        </div>
      )}

      {serviceAreas.length > 0 && (
        <>
          <Separator className="my-5" />
          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">Service Areas</p>
            <div className="flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <Badge key={area} variant="outline" className="rounded-full px-3 py-1 text-xs">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function DetailItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <span className="text-muted-foreground">{text}</span>
    </div>
  )
}
