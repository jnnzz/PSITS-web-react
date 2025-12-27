import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import dean from '@/assets/dean.png';
import { deansMessageData } from '@/data/sections-data';
import { OptimizedImage } from '@/components/common/OptimizedImage';

export const DeansMessageSection = () => {
  return (
    <section className="relative py-10 md:py-16 xl:py-24 bg-background overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Left Column: Image Placeholder */}
          <div className="relative flex items-center justify-center overflow-hidden">
            <div className="bg-primary/50 absolute -bottom-6 md:-bottom-16 w-60 h-60 md:w-92 md:h-80 rounded-full" />
            <OptimizedImage
              src={dean}
              containerClassName="z-10"
              className="w-60 md:w-80 h-auto object-cover"
              alt="Dean of UC Main CSS"
            />
          </div>
          {/* Right Column: Content */}
          <Card className="border-none shadow-none bg-transparent p-0 gap-4 md:gap-6">
            <CardHeader className="p-0 space-y-2">
              <CardDescription className="text-primary font-bold uppercase tracking-[0.15em] text-xs md:text-sm">
                {deansMessageData.header.subtitle}
              </CardDescription>
              <CardTitle className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tighter leading-[0.9] text-foreground text-wrap">
                {deansMessageData.header.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 space-y-3 text-muted-foreground leading-relaxed text-sm md:text-base">
              {deansMessageData.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </CardContent>

            <CardFooter className="p-0 pt-3 border-t border-border/50 flex flex-col items-start gap-0.5">
              <h4 className="text-lg md:text-xl font-bold text-foreground tracking-tight">
                {deansMessageData.signature.name}
              </h4>
              <p className="text-primary font-medium uppercase tracking-wider text-xs md:text-sm">
                {deansMessageData.signature.role}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};
