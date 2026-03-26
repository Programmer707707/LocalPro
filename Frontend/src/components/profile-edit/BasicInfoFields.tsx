import { MapPin, Phone, Globe, Briefcase, DollarSign, CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BasicInfoProps {
  formData: any
  setFormData: (key: string, value: any) => void
}

export default function BasicInfoFields({ formData, setFormData }: BasicInfoProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="font-semibold text-foreground mb-5">Basic Information</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">First Name</Label>
            <Input
              value={formData.firstName}
              onChange={(e) => setFormData("firstName", e.target.value)}
              placeholder="First name"
              autoComplete="given-name"
              className="h-11 rounded-xl bg-muted/50 border-border/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Last Name</Label>
            <Input
              value={formData.lastName}
              onChange={(e) => setFormData("lastName", e.target.value)}
              placeholder="Last name"
              autoComplete="family-name"
              className="h-11 rounded-xl bg-muted/50 border-border/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" />City</div>
          </Label>
          <Input
            value={formData.city}
            onChange={(e) => setFormData("city", e.target.value)}
            placeholder="Enter your city"
            autoComplete="address-level2"
            className="h-11 rounded-xl bg-muted/50 border-border/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-primary" />Phone Number</div>
          </Label>
          <Input
            value={formData.phone}
            onChange={(e) => setFormData("phone", e.target.value)}
            placeholder="Enter your phone number"
            autoComplete="tel"
            className="h-11 rounded-xl bg-muted/50 border-border/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            <div className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-primary" />Service Areas</div>
          </Label>
          <Input
            value={formData.serviceAreas}
            onChange={(e) => setFormData("serviceAreas", e.target.value)}
            placeholder="e.g. Austin, Round Rock"
            className="h-11 rounded-xl bg-muted/50 border-border/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              <div className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-primary" />Experience (Years)</div>
            </Label>
            <Input
              type="number"
              value={formData.yearsExperience}
              onChange={(e) => setFormData("yearsExperience", Number(e.target.value))}
              className="h-11 rounded-xl bg-muted/50 border-border/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              <div className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-primary" />Starting Price (HUF/hr)</div>
            </Label>
            <Input
              type="number"
              value={formData.startingPrice}
              onChange={(e) => setFormData("startingPrice", e.target.value)}
              className="h-11 rounded-xl bg-muted/50 border-border/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              <div className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5 text-primary" />Revolut Tag</div>
            </Label>
            <Input
              value={formData.revolutTag}
              onChange={(e) => setFormData("revolutTag", e.target.value)}
              placeholder="tag"
              className="h-11 rounded-xl bg-muted/50 border-border/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              <div className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5 text-primary" />Wise Tag</div>
            </Label>
            <Input
              value={formData.wiseTag}
              onChange={(e) => setFormData("wiseTag", e.target.value)}
              placeholder="tag"
              className="h-11 rounded-xl bg-muted/50 border-border/50"
            />
          </div>
        </div>
      </div>
    </div>
  )
}