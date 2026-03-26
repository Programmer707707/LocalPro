import { Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProfilePhotoProps {
  profileImageUrl?: string | null
  fullName: string
  initials: string
  uploadingImage: boolean
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ProfilePhoto({ 
  profileImageUrl, 
  fullName, 
  initials, 
  uploadingImage, 
  onImageUpload 
}: ProfilePhotoProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="font-semibold text-foreground mb-5">Profile Photo</h2>
      <div className="flex items-center gap-6">
        <div className="relative shrink-0">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={fullName}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-border"
            />
          ) : (
            <Avatar className="w-20 h-20 rounded-2xl">
              <AvatarImage src="" />
              <AvatarFallback className="text-xl font-bold text-primary bg-primary/10 rounded-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
          )}
          {uploadingImage && (
            <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground mb-1">{fullName}</p>
          <p className="text-xs text-muted-foreground mb-3">JPG, PNG or WebP. Max 5MB.</p>
          <Label htmlFor="image-upload">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground text-sm font-medium rounded-xl cursor-pointer transition-colors border border-border">
              <Camera className="w-4 h-4" />
              {uploadingImage ? "Uploading..." : "Change Photo"}
            </div>
          </Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
            disabled={uploadingImage}
          />
        </div>
      </div>
    </div>
  )
}