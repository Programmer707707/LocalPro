import ServiceCard from "@/components/ServiceCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Category } from "@/types"

type Props = {
  categories: Category[]
}

export default function Categories({ categories }: Props) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Our Services
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Explore Categories
            </h2>
            <p className="text-muted-foreground mt-2">
              Popular services requested in your area this week
            </p>
          </div>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 mt-1">
              {categories.map((cat) => (
                <CarouselItem
                  key={cat.id}
                  className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <ServiceCard category={cat} variant="simple" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-background border border-border shadow-md hover:bg-muted" />
            <CarouselNext className="right-0 bg-background border border-border shadow-md hover:bg-muted" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}