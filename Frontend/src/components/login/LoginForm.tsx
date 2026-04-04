/*
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { Shield, Eye, EyeOff, LogIn, KeyRound } from "lucide-react"
import * as authApi from "@/api/auth"

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

      const [otpStep, setOtpStep] = useState(false)
      const [otp, setOtp] = useState("")
      const [resendCooldown, setResendCooldown] = useState(0)

      const startCooldown = () => {
        setResendCooldown(60)
        const interval = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) { clearInterval(interval); return 0 }
            return prev - 1
          })
        }, 1000)
      }

      const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault()
          setError(null)
          setLoading(true)
      
          try {
            await login({ email, password })

            await authApi.requestOtp(email)
            setOtpStep(true)
            startCooldown()
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

      const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
          const tokenData = await authApi.verifyOtp(email, otp)
          localStorage.setItem("token", tokenData.access_token)
          const userData = await authApi.getMe()
          if (userData.role === "professional") {
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
            setError(data.detail ?? "Invalid or expired code.")
          } else {
            setError("Invalid or expired code.")
          }
        } finally {
          setLoading(false)
        }
      }

      const handleResend = async () => {
        if (resendCooldown > 0) return
        setError(null)
        try {
          await authApi.requestOtp(email)
          startCooldown()
        } catch {
          setError("Failed to resend code.")
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
                  {otpStep ? "Check your email" : "Sign in"}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {otpStep
                    ? <>We sent a 6-digit code to <span className="font-medium text-foreground">{email}</span></>
                    : <>Don't have an account?{" "}
                        <Link to="/register" className="text-primary font-medium hover:underline">
                          Create one free
                        </Link>
                      </>
                  }
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              {!otpStep && (
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
                      <Link to="#" className="text-xs text-primary hover:underline">
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
              )}

              {otpStep && (
                <form onSubmit={handleOtpSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm font-medium">
                      Verification code
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      required
                      autoFocus
                      className="h-11 rounded-xl bg-muted/50 border-border/50 focus:bg-background text-center text-xl tracking-widest"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl mt-2"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Verifying...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <KeyRound className="w-4 h-4" />
                        Verify & Sign in
                      </div>
                    )}
                  </Button>

                  <div className="flex items-center justify-between text-sm">
                    <button
                      type="button"
                      onClick={() => { setOtpStep(false); setOtp(""); setError(null) }}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendCooldown > 0 || loading}
                      className="text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
                    </button>
                  </div>
                </form>
              )}

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
*/


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { Shield, Eye, EyeOff, LogIn } from "lucide-react"
// import * as authApi from "@/api/auth" // Optional: keep for getMe if needed

export default function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [searchParams] = useSearchParams()
  const isBlocked = searchParams.get("blocked") === "true"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // OTP State disabled for now
  const [otpStep] = useState(false) 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // 1. Perform standard login
      const userData = await login({ email, password })

      // 2. Direct Redirect (Bypassing OTP request)
      if (userData?.role === "professional") {
        navigate("/dashboard")
      } else {
        navigate("/")
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.detail ?? "Login failed. Please try again."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md">
        {/* Mobile Logo */}
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Local<span className="text-primary">Pro</span>
          </span>
        </div>

        {isBlocked && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
            Your account has been disabled by an administrator.
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Sign in
          </h2>
          <p className="text-muted-foreground mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
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
              <Link to="#" className="text-xs text-primary hover:underline">
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
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl mt-2 transition-all active:scale-[0.98]"
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
          <Link to="#" className="hover:text-primary underline">Terms of Service</Link> and{" "}
          <Link to="#" className="hover:text-primary underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}