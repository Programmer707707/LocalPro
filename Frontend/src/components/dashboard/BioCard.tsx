interface BioCardProps {
  bio: string
}

export default function BioCard({ bio }: BioCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
      <h2 className="font-bold text-foreground mb-3">Bio</h2>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-6">
        {bio}
      </p>
    </div>
  )
}