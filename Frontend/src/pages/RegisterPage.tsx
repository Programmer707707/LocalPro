import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Shield, Eye, EyeOff, UserPlus, User, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { cn } from "@/lib/utils"

type Role = "customer" | "professional"

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<Role>("customer")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role,
      })
      if (role === "professional") {
        navigate("/dashboard")
      } else {
        navigate("/")
      }
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response
      ) {
        const data = err.response.data as { detail?: string }
        setError(data.detail ?? "Registration failed. Please try again.")
      } else {
        setError("Registration failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

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
            Join LocalPro
          </h1>
          <p className="text-lg text-white/80 max-w-sm leading-relaxed">
            Connect with thousands of trusted local professionals or grow your business by joining our platform.
          </p>

          <div className="mt-12 space-y-4 text-left">
            {[
              "Find verified local professionals instantly",
              "Compare ratings and reviews",
              "Contact professionals directly",
              "Free to join as a customer or professional",
            ].map((benefit) => (
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


      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">


          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Local<span className="text-primary">Pro</span>
            </span>
          </div>


          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Create account
            </h2>
            <p className="text-muted-foreground mt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>


          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole("customer")}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                role === "customer"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              )}
            >
              <User className={cn(
                "w-6 h-6",
                role === "customer" ? "text-primary" : "text-muted-foreground"
              )} />
              <div className="text-center">
                <p className="font-semibold text-sm">Customer</p>
                <p className="text-xs opacity-70 mt-0.5">Find professionals</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRole("professional")}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                role === "professional"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              )}
            >
              <Briefcase className={cn(
                "w-6 h-6",
                role === "professional" ? "text-primary" : "text-muted-foreground"
              )} />
              <div className="text-center">
                <p className="font-semibold text-sm">Professional</p>
                <p className="text-xs opacity-70 mt-0.5">Offer services</p>
              </div>
            </button>
          </div>


          {error && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit} className="space-y-4">


            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  minLength={2}
                  className="h-11 rounded-xl bg-muted/50 border-border/50 focus:bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Smith"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  minLength={2}
                  className="h-11 rounded-xl bg-muted/50 border-border/50 focus:bg-background"
                />
              </div>
            </div>


            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-xl bg-muted/50 border-border/50 focus:bg-background"
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="h-11 rounded-xl bg-muted/50 border-border/50 focus:bg-background pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors duration-300",
                      password.length === 0 && "bg-muted",
                      password.length > 0 && password.length < 6 && level === 1 && "bg-red-500",
                      password.length >= 6 && password.length < 8 && level <= 2 && "bg-yellow-500",
                      password.length >= 8 && password.length < 12 && level <= 3 && "bg-blue-500",
                      password.length >= 12 && level <= 4 && "bg-primary",
                      password.length > 0 && password.length < 6 && level > 1 && "bg-muted",
                      password.length >= 6 && password.length < 8 && level > 2 && "bg-muted",
                      password.length >= 8 && password.length < 12 && level > 3 && "bg-muted",
                    )}
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl mt-2"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Create account
                </div>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-8">
            By creating an account you agree to our{" "}
            <Link to="#" className="hover:text-primary underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="#" className="hover:text-primary underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}