import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import announcement from '@/assets/announcement.png';

interface GetInvolvedCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  className?: string;
}

export const GetInvolvedCard = ({
  title,
  description,
  icon: Icon,
  image,
  className,
}: GetInvolvedCardProps) => (
    <Card className={cn(
        "group relative overflow-hidden border-none shadow-lg p-0 transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 flex flex-col min-h-[280px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[400px] rounded-2xl sm:rounded-3xl w-full",
        className
    )}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={image || announcement}
                alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/30 transition-all duration-500" />
        </div>

        {/* Floating Icon - Top Right */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20">
            <div className="p-2.5 sm:p-3 md:p-3.5 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
        </div>

        {/* Title - Top Left */}
        {/* <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20 max-w-[70%]">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-300 drop-shadow-lg">
                {title}
            </CardTitle>
        </div> */}

        {/* Description & CTA - Absolute Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6 md:p-8">
            <div className="space-y-2 sm:space-y-3">
               <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-300 drop-shadow-lg">
                {title}
            </CardTitle>
                <CardDescription className="text-gray-300/90 leading-relaxed text-xs sm:text-sm md:text-base max-w-[90%]">
                    {description}
                </CardDescription>
                
                {/* CTA Button */}
                {/* <div className="pt-2 md:pt-3 flex">
                    <button className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-white/90 group-hover:text-primary transition-all duration-300">
                        <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                            Learn More
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div> */}
            </div>
        </div>
    </Card>
);