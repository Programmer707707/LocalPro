import { Link } from "react-router-dom"
import { Shield } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const CATEGORY_LINKS = [
  { label: "Construction & Repair", slug: "construction-repair" },
  { label: "Auto Services", slug: "auto-services" },
  { label: "Appliance Repair", slug: "appliance-repair" },
  { label: "Household Services", slug: "household-services" },
  { label: "Education & Courses", slug: "education-courses" },
  { label: "Marketing & Advertising", slug: "marketing-advertising" },
  { label: "Legal & Finance", slug: "legal-finance" },
  { label: "Beauty & Health", slug: "beauty-health" },
  { label: "Events & Photos", slug: "events-photos" },
  { label: "IT & Design", slug: "it-design" },
  { label: "Cleaning", slug: "cleaning" },
  { label: "Pet Care", slug: "pet-care" },
]

const EXPLORE_LINKS = [
  { label: "Find Professionals", href: "/search" },
  { label: "How It Works", href: "/#how-it-works" },
]

const PROFESSIONAL_LINKS = [
  { label: "Join as a Pro", href: "/register" },
  { label: "Pro Dashboard", href: "/dashboard" },
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            
            <div className="lg:col-span-3">
              <Link to="/" className="inline-flex items-center gap-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-lg font-bold tracking-tight text-foreground">
                    Local<span className="text-primary">Pro</span>
                  </span>
                </div>
              </Link>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Connecting customers with verified local experts across dozens of categories.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-9">
              <div className="space-y-8">
                <div>
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/90">Explore</h3>
                  <ul className="space-y-2.5">
                    {EXPLORE_LINKS.map((link) => (
                      <li key={link.label}>
                        <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/90">Professionals</h3>
                  <ul className="space-y-2.5">
                    {PROFESSIONAL_LINKS.map((link) => (
                      <li key={link.label}>
                        <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="sm:col-span-2">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/90">
                  Popular Services
                </h3>
                <ul className="grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
                  {CATEGORY_LINKS.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        to={`/search?category_slug=${cat.slug}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary block truncate"
                      >
                        {cat.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-border/60" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground m-auto">
              © {new Date().getFullYear()} LocalPro.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}