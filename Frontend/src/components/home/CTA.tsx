import { Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-12">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            Ready to get started?
          </h2>

          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Join thousands of satisfied customers who found their perfect professional on LocalPro.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-medium rounded-xl px-8"
              onClick={() => navigate("/search")}
            >
              Find a Professional
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl px-8 border-primary/30 text-primary hover:bg-primary/5"
              onClick={() => navigate("/register")}
            >
              Join as Professional
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}