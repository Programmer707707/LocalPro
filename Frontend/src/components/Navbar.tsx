import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  Shield,
  LogOut,
  User,
  LayoutDashboard,
  ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useAuth } from "@/context/AuthContext"
import { getCategories } from "@/api/categories"
import type { Category } from "@/types"
import { getCustomerProfile, getProfessionalProfile } from "@/api/profile"

const CATEGORY_ICONS: Record<string, string> = {
  "construction-repair": "🔨",
  "auto-services": "🚗",
  "appliance-repair": "🔧",
  "household-services": "🏠",
  "education-courses": "📚",
  "marketing-advertising": "📣",
  "legal-finance": "⚖️",
  "beauty-health": "💄",
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [keyword, setKeyword] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Personal!!! useQuery caches results — categories only fetched once. And staleTime means don't refetch for 10 minutes
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
  })

    const { data: customerProfile } = useQuery({
      queryKey: ["customer-profile"],
      queryFn: getCustomerProfile,
      enabled: !!user && user.role === "customer",
      staleTime: 1000 * 60 * 5,
    })

    const { data: professionalProfile } = useQuery({
      queryKey: ["professional-profile"],
      queryFn: getProfessionalProfile,
      enabled: !!user && user.role === "professional",
      staleTime: 1000 * 60 * 5,
    })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`)
      setKeyword("")
    }
  }


  const initials = user
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : ""

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">


          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              Local<span className="text-primary">Pro</span>
            </span>
          </Link>


          <div className="hidden md:flex items-center gap-3 flex-1 max-w-2xl">


            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center gap-1.5 font-medium text-foreground/80 hover:text-foreground px-3"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                onBlur={() => setTimeout(() => setCategoriesOpen(false), 150)}
              >
                Categories
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    categoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {categoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-popover border border-border rounded-xl shadow-xl p-2 z-50">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                    Browse Services
                  </p>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        navigate(`/search?category_slug=${cat.slug}`)
                        setCategoriesOpen(false)
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-sm text-foreground transition-colors text-left"
                    >
                      <span className="text-lg">
                        {CATEGORY_ICONS[cat.slug] ?? "🔹"}
                      </span>
                      <div>
                        <p className="font-medium">{cat.name}</p>
                        {cat.suggestions[0] && (
                          <p className="text-xs text-muted-foreground">
                            {cat.suggestions.slice(0, 2).join(", ")}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>


            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for any service..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="pl-9 pr-4 h-9 bg-muted/50 border-border/50 focus:bg-background rounded-full text-sm"
              />
            </form>
          </div>


          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />

            {user ? (
              <>

                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex items-center gap-1.5 text-foreground/80 hover:text-foreground"
                  onClick={() => navigate("/favorites")}
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">Favorites</span>
                </Button>


                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                      {user.role == 'customer' ? 
                        (<Avatar className="h-9 w-9 border-2 border-primary/20">
                        <AvatarImage src={customerProfile?.profile_image_url ?? ""} alt={user.first_name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                          {initials}
                        </AvatarFallback>
                      </Avatar>) :
                      <Avatar className="h-9 w-9 border-2 border-primary/20">
                        <AvatarImage src={professionalProfile?.profile_image_url ?? ""} alt={user.first_name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                          {initials}
                        </AvatarFallback>
                      </Avatar> }
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-1">

                    <div className="px-3 py-2 border-b border-border">
                      <p className="font-semibold text-sm text-foreground">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>

                    {user.role === "customer" && (
                      <>
                        <DropdownMenuItem onClick={() => navigate("/profile")}>
                          <User className="mr-2 h-4 w-4" />
                          My Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/favorites")}>
                          <Heart className="mr-2 h-4 w-4" />
                          Favorites
                        </DropdownMenuItem>
                      </>
                    )}

                    {user.role === "professional" && (
                      <>
                        <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/profile/edit")}>
                          <User className="mr-2 h-4 w-4" />
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/portfolio")}>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Portfolio
                        </DropdownMenuItem>
                      </>
                    )}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="hidden sm:flex font-medium"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/register")}
                  className="hidden sm:flex bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-5 shadow-sm"
                >
                  Join LocalPro
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">

            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for any service..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="pl-9 bg-muted/50 rounded-full"
              />
            </form>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => navigate(`/search?category_slug=${cat.slug}`)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent text-sm text-foreground transition-colors text-left"
                  >
                    <span>{CATEGORY_ICONS[cat.slug] ?? "🔹"}</span>
                    <span className="font-medium">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {user ? (
              <div className="space-y-1 pt-2 border-t border-border">
                <button
                  onClick={() => navigate("/favorites")}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent text-sm font-medium"
                >
                  <Heart className="w-4 h-4" /> Favorites
                </button>
                {user.role === "professional" && (
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent text-sm font-medium"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </button>
                )}
                {user.role === "customer" && (
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent text-sm font-medium"
                  >
                    <User className="w-4 h-4" /> My Profile
                  </button>
                )}
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-destructive/10 text-destructive text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2 pt-2 border-t border-border">
                <Button variant="outline" className="flex-1" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button className="flex-1 bg-primary text-white" onClick={() => navigate("/register")}>
                  Join LocalPro
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}