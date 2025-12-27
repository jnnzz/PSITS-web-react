import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { goalSectionData } from '@/data/sections-data';

export const GoalSection = () => {
  return (
    <section className="py-20 xl:py-28 relative overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-primary/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-500/30 rounded-full blur-[100px]" />
      </div>

      <Card className="container mx-auto px-4 md:px-6 border-none shadow-none bg-transparent">
        <CardHeader className="text-center space-y-4 mb-12">
          <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.9] text-foreground">
            {goalSectionData.title}
          </CardTitle>
          <CardDescription className="text-primary font-bold uppercase tracking-[0.2em] text-sm md:text-base max-w-2xl mx-auto">
            {goalSectionData.subtitle}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {/* Full Width Roadmap Line */}
          <div className="w-full relative h-[150px] md:h-[300px] flex items-center justify-center">
            {/* SVG Curve Path */}
            <svg
              className="w-full h-full pointer-events-none"
              viewBox="0 0 1440 300"
              preserveAspectRatio="none"
            >
              {/* Defs for Gradient */}
              <defs>
                <linearGradient
                  id="roadmapGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="var(--color-primary-300)" />
                  <stop offset="50%" stopColor="var(--color-primary-500)" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>

              {/* The Wave Path - Adjusted for 1440 width */}
              <path
                d="M 0,150 C 200,50 400,50 550,150 C 700,250 850,250 1000,150 C 1150,50 1300,50 1440,150"
                fill="none"
                stroke="url(#roadmapGradient)"
                strokeWidth="4"
                strokeDasharray="10 5"
                className="opacity-60"
              />
              {/* Solid path overlay */}
              <path
                d="M 0,150 C 200,50 400,50 550,150 C 700,250 850,250 1000,150 C 1150,50 1300,50 1440,150"
                fill="none"
                stroke="url(#roadmapGradient)"
                strokeWidth="2"
                className="drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]"
              />
            </svg>

            {/* Optional central glowing node merely for effect? User said ONLY THE LINE. I'll omit nodes to be safe. */}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
