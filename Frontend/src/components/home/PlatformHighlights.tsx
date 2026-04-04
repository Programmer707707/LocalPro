import { Search, ShieldCheck, UserCheck, Zap } from "lucide-react"

const CORE_PILLARS = [
  { 
    icon: Search, 
    title: "Advanced Search", 
    description: "Find experts using specialized filters for categories and service types." 
  },
  { 
    icon: UserCheck, 
    title: "Verified Profiles", 
    description: "Access detailed professional profiles with validated skills and experience." 
  },
  { 
    icon: ShieldCheck, 
    title: "Secure Access", 
    description: "Protected user accounts ensuring your data and interactions remain private." 
  },
  { 
    icon: Zap, 
    title: "Direct Contact", 
    description: "Seamlessly bridge the gap between service seekers and local professionals." 
  },
]

export default function PlatformHighlights() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Reliable Professional Discovery
          </h2>
          <p className="mt-6 text-xl text-white/80 leading-relaxed">
            LocalPro is a dedicated platform designed to simplify how you find 
            and evaluate local expertise through a structured, verified directory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CORE_PILLARS.map((pillar) => (
            <div 
              key={pillar.title} 
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-white text-primary flex items-center justify-center mb-6 shadow-lg">
                <pillar.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}