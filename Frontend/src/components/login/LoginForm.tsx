import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { Shield, Eye, EyeOff, LogIn } from "lucide-react"


export default function LoginForm(){
      const navigate = useNavigate()
      const { login } = useAuth()
      const [searchParams] = useSearchParams()
      const isBlocked = searchParams.get("blocked") === "true"

      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [showPassword, setShowPassword] = useState(false)
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState<string | null>(null)

      const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault()
          setError(null)
          setLoading(true)
      
          try {
            const user = await login({ email, password })
            if (user.role === "professional") {
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
              setError(data.detail ?? "Login failed. Please try again.")
            } else {
              setError("Login failed. Please try again.")
            }
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

              {isBlocked && (
                <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm dark:text-white bg-red-500">
                  Your account has been disabled by an administrator.
                  Please contact support if you think this is a mistake.
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground tracking-tight">
                  Sign in
                </h2>
                <p className="text-muted-foreground mt-2">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary font-medium hover:underline"
                  >
                    Create one free
                  </Link>
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 rounded-xl bg-muted/50 border-border/50 focus:bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Link
                      to="#"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
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
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl mt-2"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Sign in
                    </div>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-8">
                By signing in you agree to our{" "}
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
      )
    }

