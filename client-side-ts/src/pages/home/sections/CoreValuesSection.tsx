import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { coreValuesData } from "@/data/sections-data";

export const CoreValuesSection = () => {
  return (
    <section className="bg-background py-20 xl:py-28">
      <Card className="container border-none bg-transparent px-4 shadow-none md:px-6">
        {/* Header - Matching UCIdentity Typography */}
        <CardHeader className="mb-16 space-y-4 text-center md:mb-24">
          <CardTitle className="text-foreground text-3xl leading-[0.9] font-black tracking-tighter uppercase md:text-4xl lg:text-5xl">
            Core Values
          </CardTitle>
          <CardDescription className="text-primary text-sm font-bold tracking-[0.2em] uppercase md:text-base">
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
                className="group flex max-w-[350px] min-w-[280px] flex-1 flex-col items-center text-center"
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="bg-primary/5 text-primary flex h-16 w-16 items-center justify-center rounded-3xl transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                    <Icon
                      className="h-8 w-8 md:h-10 md:w-10"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Content */}
                <CardTitle className="text-foreground mb-3 text-2xl font-bold tracking-tight md:text-3xl">
                  {value.title}
                </CardTitle>

                {/* Keywords */}
                <CardDescription className="text-muted-foreground/80 mb-4 text-sm font-medium tracking-wider uppercase">
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
