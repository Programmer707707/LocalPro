import { useEffect, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import LoadingSpinner from "@/components/LoadingSpinner"
import { getCustomerProfile, updateCustomerProfile, getImageKitAuth, updateUser } from "@/api/profile" // Ensure updateUser is imported
import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner"

import CustomerHeader from "@/components/customer-profile/CustomerHeader"
import CustomerPhoto from "@/components/customer-profile/CustomerPhoto"
import CustomerPersonalInfo from "@/components/customer-profile/CustomerPersonalInfo"
import CustomerAccountInfo from "@/components/customer-profile/CustomerAccountInfo"

export default function CustomerProfilePage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const { data: profile, isLoading } = useQuery({
    queryKey: ["customer-profile"],
    queryFn: getCustomerProfile,
  })

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name ?? "")
      setLastName(user.last_name ?? "")
    }
  }, [user])

  useEffect(() => {
    if (profile) {
      setCity(profile.city ?? "")
      setPhone(profile.phone ?? "")
    }
  }, [profile])

  const updateMutation = useMutation({
    mutationFn: updateCustomerProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-profile"] })
      queryClient.invalidateQueries({ queryKey: ["me"] }) // Invalidate user data too
    }
  })

  const handleSave = async () => {
    try {
      await Promise.all([
        updateMutation.mutateAsync({ city, phone }),
        updateUser({ first_name: firstName, last_name: lastName })
      ])
      setIsEditing(false)
      toast.success("Profile updated successfully!")
    } catch {
      toast.error("Failed to update profile.")
    }
  }

  const handleCancel = () => {
    setFirstName(user?.first_name ?? "")
    setLastName(user?.last_name ?? "")
    setCity(profile?.city ?? "")
    setPhone(profile?.phone ?? "")
    setIsEditing(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    try {
      const auth = await getImageKitAuth()
      const formData = new FormData()
      formData.append("file", file)
      formData.append("publicKey", auth.publicKey)
      formData.append("signature", auth.signature)
      formData.append("expire", String(auth.expire))
      formData.append("token", auth.token)
      formData.append("fileName", `customer_${user?.id}`)

      const res = await fetch(import.meta.env.VITE_IMAGEKIT_UPLOAD_URL, { method: "POST", body: formData })
      const data = await res.json()

      if (data.url) {
        await updateCustomerProfile({ profile_image_url: data.url })
        queryClient.invalidateQueries({ queryKey: ["customer-profile"] })
        toast.success("Profile photo updated.")
      }
    } catch {
      toast.error("Upload failed.")
    } finally {
      setUploadingImage(false)
    }
  }

  if (isLoading) return <div className="flex min-h-screen items-center justify-center"><LoadingSpinner size="lg" /></div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <CustomerHeader role={user?.role} />
        <div className="space-y-6">
          <CustomerPhoto
            profileImageUrl={profile?.profile_image_url}
            fullName={`${firstName} ${lastName}`}
            initials={`${firstName?.[0]}${lastName?.[0]}`.toUpperCase()}
            uploadingImage={uploadingImage}
            onImageUpload={handleImageUpload}
          />
          <CustomerPersonalInfo
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            city={city}
            setCity={setCity}
            phone={phone}
            setPhone={setPhone}
            onSave={handleSave}
            onCancel={handleCancel}
            isPending={updateMutation.isPending}
          />
          <CustomerAccountInfo email={user?.email} role={user?.role} />
        </div>
      </div>
    </div>
  )
}