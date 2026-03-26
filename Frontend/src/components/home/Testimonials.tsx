import { Star } from "lucide-react"

const TESTIMONIALS = [
  {
    id: 1,
    name: "Jessica Thompson",
    role: "Homeowner in Austin, TX",
    text: "Found an amazing plumber within 20 minutes of posting my leak. The vetting process really gave me peace of mind.",
    rating: 5,
    avatar: "JT",
  },
  {
    id: 2,
    name: "Robert Vance",
    role: "Professional in Chicago, IL",
    text: "LocalPro has been a game changer for my small law firm. We've connected with more local clients than ever before.",
    rating: 5,
    avatar: "RV",
  },
  {
    id: 3,
    name: "Maria Santos",
    role: "Customer in Miami, FL",
    text: "I needed a tutor for my daughter and found the perfect match in under an hour. Absolutely love this platform.",
    rating: 5,
    avatar: "MS",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Trusted by thousands of neighbors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}