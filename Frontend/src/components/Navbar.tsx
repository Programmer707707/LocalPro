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
import { CATEGORY_ICONS } from "./ServiceCard"


export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [keyword, setKeyword] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  const profileImageUrl = user?.role === "customer" 
    ? customerProfile?.profile_image_url 
    : professionalProfile?.profile_image_url

  const initials = user
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : ""

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "shadow-md py-1" : "py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
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
                className={`flex items-center gap-1.5 font-medium transition-colors ${categoriesOpen ? "bg-accent text-foreground" : "text-foreground/80 hover:text-foreground"}`}
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                onBlur={() => setTimeout(() => setCategoriesOpen(false), 200)}
              >
                Categories
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${categoriesOpen ? "rotate-180" : ""}`} />
              </Button>

              {categoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-3 border-b border-border/50 bg-muted/30">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2">
                      Browse Services
                    </p>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          navigate(`/search?category_slug=${cat.slug}`)
                          setCategoriesOpen(false)
                        }}
                        className="w-full flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-accent text-sm text-foreground transition-all text-left group"
                      >
                        <span className="text-xl shrink-0 bg-background w-10 h-10 flex items-center justify-center rounded-lg border border-border/50 shadow-sm group-hover:border-primary/30 transition-colors">
                          {CATEGORY_ICONS[cat.slug] ?? "🔹"}
                        </span>
                        <div className="flex flex-col">
                          <p className="font-semibold leading-tight group-hover:text-primary transition-colors">{cat.name}</p>
                          {cat.suggestions?.[0] && (
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {cat.suggestions.slice(0, 2).join(", ")}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSearch} className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="What service do you need today?"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="pl-10 pr-4 h-10 bg-muted/40 border-border/40 focus:bg-background focus:ring-primary/20 rounded-full text-sm transition-all"
              />
            </form>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden lg:flex items-center gap-1.5 text-foreground/80 hover:text-foreground hover:bg-primary/5 rounded-full"
                  onClick={() => navigate("/favorites")}
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">Favorites</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all focus-visible:ring-0 focus-visible:ring-offset-0"
                      data-testid="user-avatar"
                    >
                      <Avatar className="h-full w-full">
                        <AvatarImage src={profileImageUrl ?? ""} alt={user.first_name} className="object-cover" />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 mt-2 p-1 rounded-xl shadow-xl border-border/60">
                    <div className="px-3 py-3 mb-1 bg-muted/30 rounded-lg mx-1 mt-1">
                      <p className="font-bold text-sm text-foreground leading-none">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-1.5 font-medium">
                        {user.email}
                      </p>
                    </div>

                    {user.role === "customer" && (
                      <>
                        <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5" onClick={() => navigate("/profile")}>
                          <User className="mr-2 h-4 w-4 text-muted-foreground" />
                          My Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5" onClick={() => navigate("/favorites")}>
                          <Heart className="mr-2 h-4 w-4 text-muted-foreground" />
                          Favorites
                        </DropdownMenuItem>
                      </>
                    )}

                    {user.role === "professional" && (
                      <>
                        <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5 font-medium text-primary bg-primary/5" onClick={() => navigate("/dashboard")}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5" onClick={() => navigate("/profile/edit")}>
                          <User className="mr-2 h-4 w-4 text-muted-foreground" />
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5" onClick={() => navigate("/portfolio")}>
                          <ImageIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                          Portfolio
                        </DropdownMenuItem>
                      </>
                    )}

                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-red-500 focus:text-read-500 focus:bg-destructive/10 rounded-lg cursor-pointer py-2.5 font-medium"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="hidden sm:flex font-semibold text-foreground/80 hover:text-foreground"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/register")}
                  className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-6 shadow-md shadow-primary/20 transition-all active:scale-95"
                >
                  Join
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full hover:bg-muted"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border mt-2 py-6 space-y-6 animate-in slide-in-from-top duration-300">
            <form onSubmit={handleSearch} className="relative px-2">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search services..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="pl-11 bg-muted/50 rounded-2xl border-none h-11"
              />
            </form>

            <div className="px-2">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-3">
                Top Categories
              </p>
              <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => navigate(`/search?category_slug=${cat.slug}`)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl bg-muted/30 hover:bg-primary/10 text-sm text-foreground transition-all text-left"
                  >
                    <span className="text-lg">{CATEGORY_ICONS[cat.slug] ?? "🔹"}</span>
                    <span className="font-semibold line-clamp-1">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="px-2 pt-4 border-t border-border/50">
              {user ? (
                <div className="grid gap-2">
                  <Button variant="ghost" className="justify-start h-12 rounded-xl px-4" onClick={() => navigate("/favorites")}>
                    <Heart className="mr-3 h-5 w-5 text-muted-foreground" /> Favorites
                  </Button>
                  <Button variant="ghost" className="justify-start h-12 rounded-xl px-4" onClick={() => navigate(user.role === "professional" ? "/dashboard" : "/profile")}>
                    {user.role === "professional" ? <LayoutDashboard className="mr-3 h-5 w-5 text-muted-foreground" /> : <User className="mr-3 h-5 w-5 text-muted-foreground" />}
                    {user.role === "professional" ? "Dashboard" : "My Profile"}
                  </Button>
                  <Button variant="ghost" className="justify-start h-12 rounded-xl px-4 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={logout}>
                    <LogOut className="mr-3 h-5 w-5" /> Logout
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12 rounded-2xl font-bold" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button className="h-12 rounded-2xl bg-primary text-white font-bold" onClick={() => navigate("/register")}>
                    Join Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}