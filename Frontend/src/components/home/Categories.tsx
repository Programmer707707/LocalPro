import { ChevronRight, Sparkles, ArrowRight, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import ServiceCard from "@/components/ServiceCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import type { Category } from "@/types"

type Props = {
  categories: Category[]
}

export default function Categories({ categories }: Props) {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute -top-[10%] -right-[5%] w-[30%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-primary/10 border border-primary/20 animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                  Premium Services
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
                Explore <span className="text-primary relative inline-block">
                  Categories
                </span>
              </h2>
              
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-medium opacity-80">
                Find top-rated professionals for everything from home repairs to creative digital solutions.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/search" className="hidden lg:block">
                <Button variant="link" className="group text-foreground font-bold text-base p-0 h-auto hover:text-primary transition-colors">
                  View all services
                  <ChevronRight className="ml-1 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <div className="flex items-center gap-2 bg-muted/30 p-1.5 rounded-2xl border border-border/50 backdrop-blur-sm">
                <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-xl border-none bg-background shadow-sm hover:bg-primary hover:text-white transition-all duration-300">
                   <ArrowLeft className="h-5 w-5" />
                </CarouselPrevious>
                <CarouselNext className="static translate-y-0 h-12 w-12 rounded-xl border-none bg-background shadow-sm hover:bg-primary hover:text-white transition-all duration-300">
                   <ArrowRight className="h-5 w-5" />
                </CarouselNext>
              </div>
            </div>
          </div>

          <div className="relative group/content">
            <CarouselContent className="-ml-6">
              {categories.map((cat) => (
                <CarouselItem
                  key={cat.id}
                  className="pl-6 basis-[88%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 py-5"
                >
                  <div className="h-full transform transition-all duration-500 hover:-translate-y-3 hover:rotate-1">
                    <ServiceCard 
                      category={cat} 
                      variant="simple" 
                      className="h-full border-border/40 bg-card/50 backdrop-blur-md shadow-lg shadow-black/[0.03] group-hover:border-primary/20 transition-all"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none hidden xl:block" />
          </div>
        </Carousel>

        <div className="mt-12 lg:hidden">
          <Button 
            variant="outline" 
            className="w-full h-14 rounded-2xl font-bold text-base border-2 hover:bg-primary hover:text-white transition-all shadow-sm"
            onClick={() => window.location.href='/search'}
          >
            Browse 20+ Categories
          </Button>
        </div>
      </div>
    </section>
  )
}