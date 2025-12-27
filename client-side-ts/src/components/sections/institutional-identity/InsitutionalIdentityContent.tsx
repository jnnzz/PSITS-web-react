import { Check } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
    <div className="flex-1 w-full flex flex-col gap-6 md:gap-10">
      {/* Header */}
      {(title || subtitle) && (
        <CardHeader className={cn('p-0 space-y-4', headerClassName)}>
          {title && (
            <CardTitle className="text-primary font-bold uppercase tracking-[0.2em] text-sm md:text-base">
              {title}
            </CardTitle>
          )}
          {subtitle && (
            <CardDescription className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.9] text-foreground">
              {subtitle}
            </CardDescription>
          )}
        </CardHeader>
      )}
      {/* Mission */}
      {mission && (
        <div className="space-y-3">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Mission
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            {mission}
          </p>
        </div>
      )}

      {/* Vision */}
      {vision && (
        <div className="space-y-3">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Vision
          </h3>
          <div className="space-y-3">
            {typeof vision === 'string' ? (
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {vision}
              </p>
            ) : (
              <>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {vision.intro}
                </p>
                <ul className="space-y-2">
                  {vision.points.map((point, i) => (
                    <li
                      key={i}
                      className="text-muted-foreground leading-relaxed flex items-start gap-3 text-sm md:text-base"
                    >
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1 shrink-0" />
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
