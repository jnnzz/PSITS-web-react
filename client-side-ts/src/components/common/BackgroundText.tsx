import { Card, CardDescription } from "../ui/card";
import { cn } from "@/lib/utils";

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
        "pointer-events-none relative overflow-hidden border-none bg-transparent shadow-none select-none",
        parentStyle
      )}
    >
      <CardDescription
        className={cn(
          "inline-block text-[8rem] leading-none font-black tracking-[0.2em] whitespace-nowrap uppercase opacity-10 transition-all duration-500 sm:text-[12rem] md:text-[16rem] lg:text-[22rem] xl:text-[28rem]",
          childStyle
        )}
      >
        {text}
      </CardDescription>
    </Card>
  );
};
