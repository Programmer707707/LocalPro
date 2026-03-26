const STATS = [
  { value: "100+", label: "Verified Professionals" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "50+", label: "Completed Services" },
  { value: "24/7", label: "Customer Support" },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-sm text-white/70 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}