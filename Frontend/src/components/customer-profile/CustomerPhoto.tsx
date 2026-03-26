import { Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface CustomerPhotoProps {
  profileImageUrl?: string | null
  fullName: string
  initials: string
  uploadingImage: boolean
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function CustomerPhoto({
  profileImageUrl,
  fullName,
  initials,
  uploadingImage,
  onImageUpload,
}: CustomerPhotoProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
      <div className="h-28 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
      <div className="px-6 pb-6">
        <div className="-mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt={fullName}
                  className="h-24 w-24 rounded-3xl border-4 border-card object-cover shadow-lg"
                />
              ) : (
                <Avatar className="h-24 w-24 rounded-3xl border-4 border-card shadow-lg">
                  <AvatarImage src="" />
                  <AvatarFallback className="rounded-3xl bg-primary/10 text-2xl font-bold text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              )}
              {uploadingImage && (
                <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/45 backdrop-blur-sm">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">{fullName}</h2>
              <p className="mt-1 text-sm text-muted-foreground text-pretty">
                Keep your profile details up to date for a better experience.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <Label htmlFor="image-upload" className="block">
              <div className={cn(
                "inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted/50 sm:w-auto",
                uploadingImage && "pointer-events-none opacity-70"
              )}>
                <Camera className="h-4 w-4" />
                {uploadingImage ? "Uploading..." : "Change Photo"}
              </div>
            </Label>
            <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={onImageUpload} disabled={uploadingImage} />
          </div>
        </div>
      </div>
    </div>
  )
}