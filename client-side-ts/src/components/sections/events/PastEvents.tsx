import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pastEventsData } from '@/data/sections-data';
import { OptimizedImage } from '@/components/common/OptimizedImage';

export const PastEvents = () => {
  const { header, events } = pastEventsData;

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            {header.title}
          </h2>
          <p className="text-2xl font-bold text-primary mt-2">{header.year}</p>
        </div>
        <Button
          variant="outline"
          className="rounded-full flex items-center gap-2 text-muted-foreground bg-gray-100/40 border-gray-200 px-6 py-6 font-semibold"
        >
          Select a Year <ChevronDown className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-20">
        {events.map(event => (
          <div
            key={event.id}
            className="flex flex-col md:flex-row gap-8 md:gap-12 group"
          >
            {/* Date column */}
            <div className="flex flex-col items-start md:items-center justify-start min-w-[120px] shrink-0">
              <span className="text-base font-bold text-muted-foreground/80 uppercase tracking-widest mb-1">
                {event.date.month}
              </span>
              <span className="text-6xl md:text-7xl font-black text-foreground leading-[0.8]">
                {event.date.day}
              </span>
            </div>

            {/* Image column */}
            <div className="w-full md:w-[420px] aspect-[16/10] overflow-hidden rounded-[2.5rem] shrink-0 shadow-sm border-none">
              <OptimizedImage
                src={event.image}
                alt={event.title}
                containerClassName="h-full w-full"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Content column */}
            <div className="flex-1 flex flex-col justify-start pt-2">
              <h3 className="text-3xl md:text-4xl font-black text-foreground mb-3 leading-[1.1] group-hover:text-primary transition-colors duration-300">
                {event.title}
              </h3>

              <div className="flex items-center gap-2 text-muted-foreground/70 mb-5">
                <MapPin className="w-4 h-4 shrink-0 text-primary/60" />
                <span className="text-base font-semibold">
                  {event.location}
                </span>
              </div>

              <div className="text-muted-foreground text-base md:text-lg leading-[1.6]">
                <p className="line-clamp-3 md:line-clamp-4">
                  {event.description}
                </p>
                <button className="text-primary font-extrabold hover:underline mt-2 inline-flex items-center transition-all cursor-pointer">
                  See more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
