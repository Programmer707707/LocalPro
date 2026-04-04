import { Shield, UserCheck, Search, Award } from "lucide-react"

const HIGHLIGHTS = [
  { icon: Search, label: "Advanced Search" },
  { icon: UserCheck, label: "Verified Pros" },
  { icon: Award, label: "Quality Ratings" },
]

export default function LoginInfo() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/95 to-primary flex-col items-center justify-center p-12 relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03]" />
      </div>

      <div className="relative z-10 text-center text-white">
        <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-[2rem] flex items-center justify-center mx-auto mb-10 backdrop-blur-xl shadow-2xl transition-transform hover:scale-105 duration-500">
          <Shield className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
          Local<span className="text-white/70">Pro</span>
        </h1>
        
        <p className="text-xl text-white/80 max-w-md mx-auto leading-relaxed mb-16">
          The most reliable way to discover and connect with local service professionals.
        </p>

        <div className="grid grid-cols-3 gap-4 w-full max-w-lg mx-auto">
          {HIGHLIGHTS.map((item) => (
            <div 
              key={item.label} 
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <div className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-[10px] font-bold text-white/90 tracking-widest uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="inline-flex items-center gap-2 text-xs font-medium text-white/60 tracking-wide uppercase">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Verified Directory Access
          </div>
        </div>
      </div>
    </div>
  )
}