import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Save, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "@/components/LoadingSpinner"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"
import { 
  getProfessionalProfile, updateProfessionalProfile, 
  updateProfessionalProfileImage, getImageKitAuth, updateUser 
} from "@/api/profile"
import { getCategories } from "@/api/categories"
import ProfilePhoto from "@/components/profile-edit/ProfilePhoto"
import BasicInfoFields from "@/components/profile-edit/BasicInfoFields"
import BioField from "@/components/profile-edit/BioField"
import CategorySelector from "@/components/profile-edit/CategorySelector"

export default function ProfessionalProfileEdit() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", city: "", phone: "",
    revolutTag: "", wiseTag: "", bio: "", serviceAreas: "",
    yearsExperience: 0, startingPrice: ""
  })
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([])
  const [uploadingImage, setUploadingImage] = useState(false)

  const updateState = (key: string, value: any) => setFormData(prev => ({ ...prev, [key]: value }))

  const { data: profile, isLoading: loadingProfile } = useQuery({
    queryKey: ["professional-profile"],
    queryFn: getProfessionalProfile,
  })

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: user?.first_name ?? "",
        lastName: user?.last_name ?? "",
        city: profile.city ?? "",
        phone: profile.phone ?? "",
        revolutTag: profile.revolut_tag ?? "",
        wiseTag: profile.wise_tag ?? "",
        bio: profile.bio ?? "",
        serviceAreas: profile.service_areas ?? "",
        yearsExperience: profile.years_experience ?? 0,
        startingPrice: profile.starting_price ? String(profile.starting_price) : ""
      })
      setSelectedCategoryIds(profile.categories.map((c: any) => c.id))
    }
  }, [profile, user])

  const updateMutation = useMutation({
    mutationFn: (data: any) => updateProfessionalProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professional-profile"] })
      queryClient.invalidateQueries({ queryKey: ["me"] })
    }
  })

  const handleSave = async () => {
    try {
      await Promise.all([
        updateMutation.mutateAsync({
          city: formData.city,
          phone: formData.phone,
          bio: formData.bio,
          service_areas: formData.serviceAreas,
          years_experience: formData.yearsExperience,
          starting_price: formData.startingPrice ? Number(formData.startingPrice) : null,
          category_ids: selectedCategoryIds,
          revolut_tag: formData.revolutTag || null,
          wise_tag: formData.wiseTag || null,
        }),
        updateUser({ first_name: formData.firstName, last_name: formData.lastName }),
      ])
      toast.success("Profile Updated Successfully")
      navigate(`/professionals/${user?.id}`)
    } catch {
      toast.error("Failed to update profile.")
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    try {
      const auth = await getImageKitAuth()
      const fd = new FormData()
      fd.append("file", file)
      fd.append("fileName", `professional_${user?.id}`)
      fd.append("publicKey", auth.publicKey)
      fd.append("signature", auth.signature)
      fd.append("expire", String(auth.expire))
      fd.append("token", auth.token)

      const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", { method: "POST", body: fd })
      const data = await response.json()
      if (data.url) {
        await updateProfessionalProfileImage(data.url)
        queryClient.invalidateQueries({ queryKey: ["professional-profile"] })
        toast.success("Profile image updated!")
      }
    } catch {
      toast.error("Failed to upload image.")
    } finally {
      setUploadingImage(false)
    }
  }

  if (loadingProfile) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" />Back</button>
          <Button onClick={handleSave} disabled={updateMutation.isPending} className="rounded-xl gap-2"><Save className="w-4 h-4" />Save Changes</Button>
        </div>

        <div className="space-y-5">
          <ProfilePhoto 
            profileImageUrl={profile?.profile_image_url} 
            fullName={`${formData.firstName} ${formData.lastName}`} 
            initials={`${formData.firstName[0]}${formData.lastName[0]}`}
            uploadingImage={uploadingImage}
            onImageUpload={handleImageUpload}
          />
          <BasicInfoFields formData={formData} setFormData={updateState} />
          <BioField bio={formData.bio} onChange={(val) => updateState("bio", val)} />
          <CategorySelector 
            categories={categories} 
            selectedIds={selectedCategoryIds} 
            onToggle={(id) => setSelectedCategoryIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])} 
          />
        </div>
      </div>
    </div>
  )
}