import { Shield } from "lucide-react"

export default function RegisterInfo() {
  const benefits = [
    "Find verified local professionals instantly",
    "Compare ratings and reviews",
    "Contact professionals directly",
    "Free to join as a customer or professional",
  ]

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/90 to-primary flex-col items-center justify-center p-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10 text-center text-white">
        <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Join LocalPro</h1>
        <p className="text-lg text-white/80 max-w-sm leading-relaxed">
          Connect with thousands of trusted local professionals or grow your business by joining our platform.
        </p>

        <div className="mt-12 space-y-4 text-left">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-sm text-white/80">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}