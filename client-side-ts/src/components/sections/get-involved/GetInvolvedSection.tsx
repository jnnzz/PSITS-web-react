import { cn } from '@/lib/utils';
// import { Bell, Code2, Users2 } from "lucide-react" // Icons are now in data file
import { getInvolvedData } from '@/data/sections-data';
import { GetInvolvedCard } from './GetInvolvedCard';

export const GetInvolvedSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-background">
      {/* Background Ornamentation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Header Area */}
          <div className="lg:col-span-5 space-y-8 sticky lg:top-32">
            <div className="space-y-4">
              <h2
                className={cn(
                  'text-primary font-bold uppercase tracking-[0.2em] text-sm md:text-base'
                )}
              >
                {getInvolvedData.header.subtitle}
              </h2>
              <h1
                className={cn(
                  'text-3xl md:text-4xl lg:text-5xl',
                  'font-black uppercase tracking-tighter leading-[0.9]',
                  'bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent'
                )}
              >
                {getInvolvedData.header.titlePrefix}{' '}
                <br className="hidden md:block" />{' '}
                {getInvolvedData.header.titleSuffix}
              </h1>
            </div>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              {getInvolvedData.header.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex -space-x-3 overflow-hidden">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-background bg-muted border border-border"
                  />
                ))}
              </div>
              <p className="flex items-center text-sm font-medium text-muted-foreground">
                <span className="text-foreground font-bold mr-1">
                  {getInvolvedData.header.memberCount}
                </span>{' '}
                IT Students already joined
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {getInvolvedData.cards.map((card, index) => (
              <GetInvolvedCard
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                className={card.className}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
