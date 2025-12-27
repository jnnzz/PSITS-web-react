import { InsitutionalIdentityContent } from './InsitutionalIdentityContent';
import type { UCData } from '@/data/sections-data';

interface Props {
  data: UCData;
}

export const UCIdentity = ({ data }: Props) => {
  return (
    <section className="relative py-20 xl:py-28 bg-background overflow-hidden">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <InsitutionalIdentityContent
            title={data.subtitle} // "Mission & Vision" (renders small, colorful)
            subtitle={data.title} // "University of Cebu" (renders big, black)
            headerClassName="text-center flex flex-col-reverse gap-4"
          />
        </div>

        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          {/* Left Column: Stats */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col justify-center">
            <div className="relative border-l-[3px] border-primary/20 space-y-12 ml-4 py-4">
              {data.stats.map((stat, i) => (
                <div key={i} className="relative pl-8 md:pl-10">
                  {/* Dot */}
                  <div className="absolute -left-[11.5px] top-[0.6rem] w-[20px] h-[20px] rounded-full bg-primary ring-4 ring-background" />
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-muted-foreground font-medium text-lg uppercase tracking-wide">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className="bg-sky-50/80 dark:bg-sky-900/10 rounded-[2.5rem] p-8 md:p-12 lg:p-16 h-full flex flex-col justify-center">
              <InsitutionalIdentityContent
                mission={data.mission}
                vision={data.vision}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
