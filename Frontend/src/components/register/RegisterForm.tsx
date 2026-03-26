import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Shield, Eye, EyeOff, UserPlus, User, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { cn } from "@/lib/utils"

type Role = "customer" | "professional"

export default function RegisterForm() {
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
  const [errors, setErrors] = useState<string[]>([])

  const validatePassword = (pass: string) => {
    const new_errors = []
    if (pass.length < 8) new_errors.push("Password must be at least 8 characters long.")
    if (!/[A-Z]/.test(pass)) new_errors.push("Password must contain at least one uppercase letter.")
    if (!/[a-z]/.test(pass)) new_errors.push("Password must contain at least one lowercase letter.")
    if (!/\d/.test(pass)) new_errors.push("Password must contain at least one number.")
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) new_errors.push("Password must contain at least one special character.")
    setErrors(new_errors)
    return new_errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (validatePassword(password).length > 0) return

    setLoading(true)
    try {
      await register({ first_name: firstName, last_name: lastName, email, password, role })
      navigate(role === "professional" ? "/dashboard" : "/")
    } catch (err: any) {
      setError(err?.response?.data?.detail ?? "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
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
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Create account</h2>
          <p className="text-muted-foreground mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {(["customer", "professional"] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                role === r ? "border-primary bg-primary/5 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/40"
              )}
            >
              {r === "customer" ? <User className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
              <div className="text-center">
                <p className="font-semibold text-sm capitalize">{r}</p>
                <p className="text-xs opacity-70 mt-0.5">{r === "customer" ? "Find professionals" : "Offer services"}</p>
              </div>
            </button>
          ))}
        </div>

        {error && <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required autoComplete="given-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Smith" value={lastName} onChange={(e) => setLastName(e.target.value)} required autoComplete="family-name" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 characters"
                value={password}
                onChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value); }}
                required
                autoComplete="new-password"
                className="pr-11"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4].map((level) => (
                <div key={level} className={cn("h-1 flex-1 rounded-full bg-muted", password.length > 0 && level === 1 && "bg-red-500", password.length >= 8 && level <= 3 && "bg-blue-500", password.length >= 12 && level <= 4 && "bg-primary")} />
              ))}
            </div>
            {errors.map((e) => <p key={e} className="text-xs text-destructive">{e}</p>)}
          </div>

          <Button type="submit" disabled={loading} className="w-full h-11 mt-2">
            {loading ? "Creating account..." : <><UserPlus className="w-4 h-4 mr-2" /> Create account</>}
          </Button>
        </form>
      </div>
    </div>
  )
}