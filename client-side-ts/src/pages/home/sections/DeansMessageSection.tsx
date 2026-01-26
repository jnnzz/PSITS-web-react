import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dean from "@/assets/dean.png";
import { deansMessageData } from "@/data/sections-data";
import { OptimizedImage } from "@/components/common/OptimizedImage";

export const DeansMessageSection = () => {
  return (
    <section className="bg-background relative overflow-hidden py-10 md:py-16 xl:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
          {/* Left Column: Image Placeholder */}
          <div className="relative flex items-center justify-center overflow-hidden">
            <div className="bg-primary/50 absolute -bottom-6 h-60 w-60 rounded-full md:-bottom-16 md:h-80 md:w-92" />
            <OptimizedImage
              src={dean}
              containerClassName="z-10"
              className="h-auto w-60 object-cover md:w-80"
              alt="Dean of UC Main CSS"
            />
          </div>
          {/* Right Column: Content */}
          <Card className="gap-4 border-none bg-transparent p-0 shadow-none md:gap-6">
            <CardHeader className="space-y-2 p-0">
              <CardDescription className="text-primary text-xs font-bold tracking-[0.15em] uppercase md:text-sm">
                {deansMessageData.header.subtitle}
              </CardDescription>
              <CardTitle className="text-foreground text-xl leading-[0.9] font-black tracking-tighter text-wrap uppercase md:text-2xl lg:text-3xl">
                {deansMessageData.header.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-muted-foreground space-y-3 p-0 text-sm leading-relaxed md:text-base">
              {deansMessageData.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </CardContent>

            <CardFooter className="border-border/50 flex flex-col items-start gap-0.5 border-t p-0 pt-3">
              <h4 className="text-foreground text-lg font-bold tracking-tight md:text-xl">
                {deansMessageData.signature.name}
              </h4>
              <p className="text-primary text-xs font-medium tracking-wider uppercase md:text-sm">
                {deansMessageData.signature.role}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};
