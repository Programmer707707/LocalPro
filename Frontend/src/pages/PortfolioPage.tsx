import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import LoadingSpinner from "@/components/LoadingSpinner"
import { getProfessionalProfile, getImageKitAuth, deletePortfolioImage, addPortfolioImage } from "@/api/profile"
import { useAuth } from "@/context/AuthContext"

import PortfolioHeader from "@/components/portfolio/PortfolioHeader"
import PortfolioEmptyState from "@/components/portfolio/PortfolioEmptyState"
import PortfolioGrid from "@/components/portfolio/PortfolioGrid"

const MAX_IMAGES = 3

export default function PortfolioPage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [uploading, setUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const { data: profile, isLoading } = useQuery({
    queryKey: ["professional-profile"],
    queryFn: getProfessionalProfile,
  })

  const deleteMutation = useMutation({
    mutationFn: deletePortfolioImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professional-profile"] })
      toast.success("Image deleted!")
      setDeletingId(null)
    },
    onError: () => {
      toast.error("Failed to delete.")
      setDeletingId(null)
    }
  })

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const currentCount = profile?.portfolio_images?.length ?? 0
    if (currentCount + files.length > MAX_IMAGES) {
      return toast.error(`Maximum ${MAX_IMAGES} images allowed.`)
    }

    setUploading(true)
    try {
      const auth = await getImageKitAuth()
      for (const file of Array.from(files)) {
        const fd = new FormData()
        fd.append("file", file); fd.append("publicKey", auth.publicKey);
        fd.append("signature", auth.signature); fd.append("expire", String(auth.expire));
        fd.append("token", auth.token); fd.append("fileName", `portfolio_${user?.id}_${Date.now()}`)

        const res = await fetch(import.meta.env.VITE_IMAGEKIT_UPLOAD_URL, { method: "POST", body: fd })
        const data = await res.json()
        if (data.url) await addPortfolioImage(data.url)
      }
      queryClient.invalidateQueries({ queryKey: ["professional-profile"] })
      toast.success("Uploaded successfully!")
    } catch {
      toast.error("Upload failed.")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>

  const images = profile?.portfolio_images ?? []

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <PortfolioHeader count={images.length} max={MAX_IMAGES} uploading={uploading} onUpload={handleUpload} />

        {images.length === 0 ? (
          <PortfolioEmptyState uploading={uploading} onUpload={handleUpload} />
        ) : (
          <PortfolioGrid 
            images={images} 
            max={MAX_IMAGES} 
            deletingId={deletingId} 
            uploading={uploading} 
            onDelete={(id) => { setDeletingId(id); deleteMutation.mutate(id); }} 
            onSelect={setSelectedImage} 
            onUpload={handleUpload} 
          />
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Portfolio Large" className="max-w-full max-h-[90vh] rounded-2xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}