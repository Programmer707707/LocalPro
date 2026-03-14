import { Link } from "react-router-dom"
import { Shield, Github, Twitter, Instagram, ArrowRight } from "lucide-react"
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
]

const EXPLORE_LINKS = [
  { label: "Find Professionals", href: "/search" },
  { label: "Browse Categories", href: "/categories" },
  { label: "How It Works", href: "/#how-it-works" },
]

const SUPPORT_LINKS = [
  { label: "Help Center", href: "#" },
  { label: "Safety", href: "#" },
  { label: "Trust & Quality", href: "#" },
  { label: "Contact Us", href: "#" },
]

const PROFESSIONAL_LINKS = [
  { label: "Join as a Pro", href: "/register" },
  { label: "Pro Dashboard", href: "/dashboard" },
  { label: "Success Guide", href: "#" },
  { label: "Pro Resources", href: "#" },
]

const SOCIAL_LINKS = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <Link to="/" className="inline-flex items-center gap-3 group">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-105">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xl font-bold tracking-tight text-foreground">
                    Local<span className="text-primary">Pro</span>
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    Trusted local services marketplace
                  </span>
                </div>
              </Link>

              <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                Find trusted local professionals for home, repair, learning,
                beauty, finance, and more. LocalPro helps customers discover,
                compare, and connect with service providers quickly and
                confidently.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-muted/50 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary hover:text-primary-foreground hover:shadow-md"
                  >
                    <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-border/60 bg-muted/40 p-4 shadow-sm backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Ready to find your next professional?
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Browse categories, compare ratings, and connect with the
                      right expert near you.
                    </p>
                    <Link
                      to="/search"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Start exploring
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-8">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/90">
                  Explore
                </h3>
                <ul className="space-y-3">
                  {EXPLORE_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/90">
                  Support
                </h3>
                <ul className="space-y-3">
                  {SUPPORT_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/90">
                  Professionals
                </h3>
                <ul className="space-y-3">
                  {PROFESSIONAL_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/90">
                  Services
                </h3>
                <ul className="space-y-3">
                  {CATEGORY_LINKS.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        to={`/search?category_slug=${cat.slug}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
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
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} LocalPro. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <Link
                to="#"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}