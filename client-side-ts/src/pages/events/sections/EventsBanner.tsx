import { BackgroundText } from "@/components/common/BackgroundText";

export const EventsBanner = () => {
  return (
    <section className="from-primary/5 relative isolate flex min-h-[30vh] items-center justify-center overflow-hidden bg-gradient-to-b to-transparent sm:min-h-[40vh] md:min-h-[50vh]">
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
      <div className="relative z-10 container flex flex-col items-center text-center">
        <h1 className="text-foreground text-5xl font-black tracking-tighter uppercase sm:text-7xl md:text-8xl lg:text-9xl">
          Events
        </h1>
        <div className="bg-primary mt-4 h-2 w-24 rounded-full" />
      </div>
    </section>
  );
};
