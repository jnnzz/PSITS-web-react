import type { CCSData } from "@/data/sections-data";
import imageLogo from "@/assets/ccsidentity.png";
import aiLab from "@/assets/aiLab.jpg";
import announcement from "@/assets/announcement.png";
import { InsitutionalIdentityContent } from "./InsitutionalIdentityContent";
import { Card } from "@/components/ui/card";
import { OptimizedImage } from "@/components/common/OptimizedImage";

interface Props {
  data: CCSData;
}

export const CCSIdentity = ({ data }: Props) => {
  return (
    <section className="bg-background relative z-20 flex min-h-[60vh] items-center md:min-h-175">
      {/* Background Image - Subtle & Faded */}
      <div className="pointer-events-none absolute inset-1 flex scale-115 items-center justify-center select-none">
        <OptimizedImage
          src={imageLogo}
          alt=""
          className="h-[130%] w-[130%] object-contain opacity-50 md:opacity-100"
          blur={false}
        />
      </div>

      <div className="relative z-10 container px-4 py-12 md:px-6 md:py-24">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-24">
          {/* Left Column: Title */}
          <Card className="w-full border-none bg-transparent shadow-none lg:w-3/5">
            <InsitutionalIdentityContent
              title={data.subtitle}
              subtitle={data.title}
              mission={data.mission}
              vision={data.vision}
              headerClassName="text-center lg:text-left"
            />
          </Card>

          {/* Right Column: Content */}
          <div className="relative h-100 w-full sm:h-125 lg:h-auto lg:w-2/5 lg:self-stretch">
            {/* Clipped Background Area */}
            <div className="absolute inset-0 z-10 h-full w-full overflow-hidden rounded-4xl lg:translate-x-0">
              <div
                className="relative h-full w-full"
                style={{
                  clipPath: `polygon(
                    /* Top Left vertical edge */
                    0% 0%, 
                    0% calc(20% - 2rem),
                    
                    /* Top-Left Rounded Corner (Transition to indentation) */
                    /* Center at (2rem, 20% - 2rem) is wrong geometry, 
                       Corner is 'Bottom-Left' of the top block.
                       Center at (2rem, 20% - 2rem) gives x=0 at y=Cy.
                    */
                    0.1rem calc(20% - 1.4rem),
                    0.27rem calc(20% - 1.0rem),
                    0.59rem calc(20% - 0.54rem),
                    1.0rem calc(20% - 0.27rem),
                    1.46rem calc(20% - 0.07rem),
                    2.0rem 20%,

                    /* Indentation Channel */
                    3.0rem 20%,
                    3.0rem 80%,
                    2.0rem 80%,

                    /* Bottom-Left Rounded Corner (Transition from indentation) */
                    /* Corner is 'Top-Left' of the bottom block.
                       Center at (2rem, 80% + 2rem).
                    */
                    1.46rem calc(80% + 0.07rem),
                    1.0rem calc(80% + 0.27rem),
                    0.59rem calc(80% + 0.54rem),
                    0.27rem calc(80% + 1.0rem),
                    0.1rem calc(80% + 1.4rem),
                    0rem calc(80% + 2rem),

                    /* Bottom Left vertical edge */
                    0% 100%, 
                    100% 100%, 
                    100% 0%
                  )`,
                }}
              >
                {/* Background Image */}
                <OptimizedImage
                  src={aiLab}
                  alt="AI Lab"
                  containerClassName="w-full h-full"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Floating Card */}
            <div className="outline-background absolute top-1/2 -left-5 z-20 h-[60%] w-[70%] -translate-y-1/2 overflow-hidden rounded-4xl border shadow-xl outline transition-all duration-300 sm:-left-10 lg:-left-25 lg:w-[60%]">
              {/* Inner Image */}
              <OptimizedImage
                src={announcement}
                alt="AI Lab"
                containerClassName="w-full h-full"
                className="relative z-40 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
