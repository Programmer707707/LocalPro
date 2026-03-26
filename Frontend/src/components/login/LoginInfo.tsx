import { Shield } from "lucide-react"

export default function LoginInfo(){
  return (
     <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/90 to-primary flex-col items-center justify-center p-12 relative overflow-hidden">

        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative z-10 text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-lg text-white/80 max-w-sm leading-relaxed">
            Sign in to connect with trusted local professionals in your area.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-12">
            {[
              { value: "100+", label: "Professionals" },
              { value: "4.9", label: "Avg Rating" },
              { value: "50+", label: "Services Done" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}
