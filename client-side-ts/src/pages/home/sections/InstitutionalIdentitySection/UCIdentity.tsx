import { InsitutionalIdentityContent } from "./InsitutionalIdentityContent";
import type { UCData } from "@/data/sections-data";
import { motion } from "framer-motion";

interface Props {
  data: UCData;
}

export const UCIdentity = ({ data }: Props) => {
  return (
    <section className="bg-background relative overflow-hidden py-20 xl:py-28">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <InsitutionalIdentityContent
            title={data.subtitle} // "Mission & Vision" (renders small, colorful)
            subtitle={data.title} // "University of Cebu" (renders big, black)
            headerClassName="text-center flex flex-col-reverse gap-4"
          />
        </motion.div>

        <div className="grid items-stretch gap-12 md:grid-cols-12 lg:gap-20">
          {/* Left Column: Stats */}
          <div className="flex flex-col justify-center md:col-span-4 lg:col-span-3">
            <div className="border-primary/20 relative ml-4 space-y-12 border-l-[3px] py-4">
              {data.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="relative pl-8 md:pl-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  {/* Dot */}
                  <div className="bg-primary ring-background absolute top-[0.6rem] -left-[11.5px] h-[20px] w-[20px] rounded-full ring-4" />
                  <div className="flex flex-col gap-1">
                    <span className="text-foreground text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                      {stat.value}
                    </span>
                    <span className="text-muted-foreground text-lg font-medium tracking-wide uppercase">
                      {stat.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Content */}
          <motion.div
            className="md:col-span-8 lg:col-span-9"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex h-full flex-col justify-center rounded-[2.5rem] bg-sky-50/80 p-8 md:p-12 lg:p-16 dark:bg-sky-900/10">
              <InsitutionalIdentityContent
                mission={data.mission}
                vision={data.vision}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
