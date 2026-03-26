import { MapPin, Settings, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"

interface DashboardHeaderProps {
  fullName: string
  initials: string
  city?: string
  profileImageUrl?: string | null
  userId?: number
}

export default function DashboardHeader({ fullName, initials, city, profileImageUrl, userId }: DashboardHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        {profileImageUrl ? (
          <img src={profileImageUrl} alt={fullName} className="w-16 h-16 rounded-2xl object-cover border-2 border-border" />
        ) : (
          <Avatar className="w-16 h-16 rounded-2xl">
            <AvatarImage src="" />
            <AvatarFallback className="text-lg font-bold text-primary bg-primary/10 rounded-2xl">{initials}</AvatarFallback>
          </Avatar>
        )}
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{fullName}</h1>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{city ?? "No city set"}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => navigate("/profile/edit")} className="rounded-xl gap-2">
          <Settings className="w-4 h-4" /> Edit Profile
        </Button>
        <Button onClick={() => navigate(`/professionals/${userId}`)} className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2">
          <Eye className="w-4 h-4" /> View Public Profile
        </Button>
      </div>
    </div>
  )
}