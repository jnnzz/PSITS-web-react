import { Check } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Vision {
  intro: string;
  points: string[];
}

interface Props {
  title?: string;
  subtitle?: string;
  mission?: string;
  vision?: Vision | string;
  headerClassName?: string;
}

export const InsitutionalIdentityContent = ({
  title,
  subtitle,
  mission,
  vision,
  headerClassName,
}: Props) => {
  return (
    <div className="flex w-full flex-1 flex-col gap-6 md:gap-10">
      {/* Header */}
      {(title || subtitle) && (
        <CardHeader className={cn("space-y-4 p-0", headerClassName)}>
          {title && (
            <CardTitle className="text-primary text-sm font-bold tracking-[0.2em] uppercase md:text-base">
              {title}
            </CardTitle>
          )}
          {subtitle && (
            <CardDescription className="text-foreground text-3xl leading-[0.9] font-black tracking-tighter uppercase md:text-4xl lg:text-5xl">
              {subtitle}
            </CardDescription>
          )}
        </CardHeader>
      )}
      {/* Mission */}
      {mission && (
        <div className="space-y-3">
          <h3 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
            Mission
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
            {mission}
          </p>
        </div>
      )}

      {/* Vision */}
      {vision && (
        <div className="space-y-3">
          <h3 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
            Vision
          </h3>
          <div className="space-y-3">
            {typeof vision === "string" ? (
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                {vision}
              </p>
            ) : (
              <>
                <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                  {vision.intro}
                </p>
                <ul className="space-y-2">
                  {vision.points.map((point, i) => (
                    <li
                      key={i}
                      className="text-muted-foreground flex items-start gap-3 text-sm leading-relaxed md:text-base"
                    >
                      <Check className="text-primary mt-1 h-4 w-4 shrink-0 md:h-5 md:w-5" />
                      <span className="flex-1">{point}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
