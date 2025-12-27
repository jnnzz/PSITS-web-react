import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import { coreValuesData } from '@/data/sections-data';

export const CoreValuesSection = () => {
  return (
    <section className="py-20 xl:py-28 bg-background">
      <Card className="container px-4 md:px-6 border-none shadow-none bg-transparent">
        {/* Header - Matching UCIdentity Typography */}
        <CardHeader className="text-center mb-16 md:mb-24 space-y-4">
          <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.9] text-foreground">
            Core Values
          </CardTitle>
          <CardDescription className="text-primary font-bold uppercase tracking-[0.2em] text-sm md:text-base">
            Our Guiding Principles
          </CardDescription>
        </CardHeader>

        {/* Values Grid - Centered Layout */}
        <CardContent className="flex flex-wrap justify-center gap-x-8 gap-y-12 md:gap-x-12 md:gap-y-16">
          {coreValuesData.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="flex-1 min-w-[280px] max-w-[350px] flex flex-col items-center text-center group"
              >
                {/* Icon */}
                <div className="mb-6 relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-3xl bg-primary/5 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Icon
                      className="w-8 h-8 md:w-10 md:h-10"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Content */}
                <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
                  {value.title}
                </CardTitle>

                {/* Keywords */}
                <CardDescription className="text-sm font-medium uppercase tracking-wider text-muted-foreground/80 mb-4">
                  {value.keywords}
                </CardDescription>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
};
