import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import announcement from '@/assets/announcement.png';

interface GetInvolvedCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export const GetInvolvedCard = ({
  title,
  description,
  icon: Icon,
  className,
}: GetInvolvedCardProps) => (
  <Card
    className={cn(
      'group relative overflow-hidden border-none shadow-none bg-transparent p-0 transition-all duration-500 hover:-translate-y-2 flex flex-col min-h-[300px] rounded-[2rem]',
      className
    )}
  >
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <img
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        src={announcement}
        alt=""
      />
      <div className="absolute inset-0 bg-black/80 group-hover:bg-black/70 transition-colors duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
    </div>

    <div className="relative z-10 flex flex-col h-full p-8">
      <div className="space-y-3 flex-1">
        <div className="mb-4 inline-flex p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white w-fit group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/20 group-hover:text-primary transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-300 leading-relaxed text-sm md:text-base">
          {description}
        </CardDescription>
      </div>

      <div className="pt-6">
        <button className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white transition-all hover:gap-3 group-hover:text-primary">
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  </Card>
);
