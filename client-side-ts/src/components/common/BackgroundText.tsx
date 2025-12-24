import { Card, CardDescription } from '../ui/card';
import { cn } from '@/lib/utils';

interface BackgroundTextProps {
  text: string;
  parentStyle?: string;
  childStyle?: string;
}

export const BackgroundText = ({
  text,
  parentStyle,
  childStyle,
}: BackgroundTextProps) => {
  return (
    <Card
      className={cn(
        'border-none shadow-none bg-transparent relative overflow-hidden pointer-events-none select-none',
        parentStyle
      )}
    >
      <CardDescription
        className={cn(
          'font-black uppercase tracking-[0.2em] text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[22rem] xl:text-[28rem] leading-none whitespace-nowrap opacity-10 inline-block transition-all duration-500',
          childStyle
        )}
      >
        {text}
      </CardDescription>
    </Card>
  );
};
