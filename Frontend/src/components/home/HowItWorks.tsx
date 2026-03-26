import { Search, Star, ThumbsUp } from "lucide-react"

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Search,
    title: "Search",
    description:
      "Tell us what you need and where. We'll find matching professionals near you instantly.",
  },
  {
    step: "02",
    icon: Star,
    title: "Browse",
    description:
      "Compare profiles, reviews, and ratings for top professionals in your area.",
  },
  {
    step: "03",
    icon: ThumbsUp,
    title: "Contact",
    description:
      "Get free quotes and contact professionals directly through the platform.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Simple Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            How LocalPro Works
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Get connected with the right professional in just 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          {HOW_IT_WORKS.map((item, index) => (
            <div
              key={item.step}
              className="relative flex flex-col items-center text-center p-8 bg-card rounded-2xl border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300"
            >
              <div className="absolute -top-3 left-6 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {item.step}
              </div>

              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 mt-2">
                <item.icon className="w-8 h-8 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">
                {index + 1}. {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}