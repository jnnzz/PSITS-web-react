import { BackgroundText } from '@/components/common/BackgroundText';

export const EventsBanner = () => {
  return (
    <section className="relative isolate min-h-[30vh] sm:min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
      {/* Background Stylistic Text */}
      <BackgroundText
        text="Events"
        parentStyle="absolute inset-0 flex items-center justify-center -z-10"
        childStyle="
          tracking-tighter
          text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[24rem] xl:text-[30rem]
          text-primary/10
          opacity-100
          pointer-events-none
          select-none

          /* Modern browsers stroke */
          [-webkit-text-stroke:1px_var(--color-primary)]

          /* Firefox fallback shadow */
          [text-shadow:
            1px_1px_0_var(--color-primary),
           -1px_1px_0_var(--color-primary),
            1px_-1px_0_var(--color-primary),
           -1px_-1px_0_var(--color-primary)]
        "
      />

      {/* Foreground Main Title */}
      <div className="container relative z-10 flex flex-col items-center text-center">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground uppercase">
          Events
        </h1>
        <div className="h-2 w-24 bg-primary mt-4 rounded-full" />
      </div>
    </section>
  );
};
