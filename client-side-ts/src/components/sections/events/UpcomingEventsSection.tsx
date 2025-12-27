import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Calendar, MapPin } from 'lucide-react';
import { upcomingEventsData } from '@/data/sections-data';
import { OptimizedImage } from '@/components/common/OptimizedImage';

export const UpcomingEventsSection = () => {
  const { header, events } = upcomingEventsData;

  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col mb-8">
        <h2 className="text-3xl font-black text-foreground">{header.title}</h2>
        <p className="text-muted-foreground font-medium">{header.year}</p>
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {events.map(event => (
              <CarouselItem
                key={event.id}
                className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="group relative h-[320px] overflow-hidden rounded-2xl border-none shadow-md transition-all duration-300 hover:scale-[1.02] bg-black p-0">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <OptimizedImage
                      src={event.image}
                      alt={event.title}
                      containerClassName="h-full w-full"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>

                  <CardContent className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-lg font-bold mb-2 leading-tight group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-white/80">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/80">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
