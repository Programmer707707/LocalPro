import { X } from "lucide-react"

interface ImageLightboxProps {
  url: string | null
  onClose: () => void
}

export default function ImageLightbox({ url, onClose }: ImageLightboxProps) {
  if (!url) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </button>
      <img
        src={url}
        alt="Portfolio"
        className="max-h-[90vh] max-w-full rounded-3xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}