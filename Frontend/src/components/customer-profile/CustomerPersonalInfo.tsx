import { User, MapPin, Phone, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CustomerPersonalInfoProps {
  isEditing: boolean
  setIsEditing: (val: boolean) => void
  firstName: string
  setFirstName: (val: string) => void
  lastName: string
  setLastName: (val: string) => void
  city: string
  setCity: (val: string) => void
  phone: string
  setPhone: (val: string) => void
  onSave: () => void
  onCancel: () => void
  isPending: boolean
}

export default function CustomerPersonalInfo({
  isEditing,
  setIsEditing,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  city,
  setCity,
  phone,
  setPhone,
  onSave,
  onCancel,
  isPending,
}: CustomerPersonalInfoProps) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Update your contact and location details.
          </p>
        </div>
        {!isEditing ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="rounded-2xl gap-2"
          >
            <User className="h-3.5 w-3.5" /> Edit Profile
          </Button>
        ) : (
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onCancel}
              className="rounded-2xl"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={onSave}
              disabled={isPending}
              className="rounded-2xl gap-2 shadow-sm"
            >
              <Save className="h-3.5 w-3.5" />
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">First Name</Label>
            {isEditing ? (
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                autoComplete="given-name"
                className="h-12 rounded-2xl border-border/60 bg-background/70"
              />
            ) : (
              <div className="flex h-12 items-center rounded-2xl border border-border/60 bg-muted/30 px-4 text-sm text-foreground">
                {firstName || "Not provided"}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Last Name</Label>
            {isEditing ? (
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                autoComplete="family-name"
                className="h-12 rounded-2xl border-border/60 bg-background/70"
              />
            ) : (
              <div className="flex h-12 items-center rounded-2xl border border-border/60 bg-muted/30 px-4 text-sm text-foreground">
                {lastName || "Not provided"}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" /> City
          </Label>
          {isEditing ? (
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              autoComplete="address-level2"
              className="h-12 rounded-2xl border-border/60 bg-background/70"
            />
          ) : (
            <div className="flex h-12 items-center rounded-2xl border border-border/60 bg-muted/30 px-4 text-sm">
              <span className={city ? "text-foreground" : "text-muted-foreground"}>
                {city || "Not provided"}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-primary" /> Phone Number
          </Label>
          {isEditing ? (
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              autoComplete="tel"
              className="h-12 rounded-2xl border-border/60 bg-background/70"
            />
          ) : (
            <div className="flex h-12 items-center rounded-2xl border border-border/60 bg-muted/30 px-4 text-sm">
              <span className={phone ? "text-foreground" : "text-muted-foreground"}>
                {phone || "Not provided"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}