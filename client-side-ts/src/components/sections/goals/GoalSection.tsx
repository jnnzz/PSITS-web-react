
import { goalSectionData } from "@/data/sections-data"
import { motion } from "framer-motion"

export default function GoalSection() {
    return (
        <section className="py-20 xl:py-28 relative overflow-hidden bg-background">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-primary/30 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div 
                    className="text-center space-y-2 mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
                        {goalSectionData.title}
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg">
                        {goalSectionData.subtitle}
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto">
                    {goalSectionData.goals.map((goal, index) => (
                        <motion.div 
                            key={index} 
                            className="flex items-start gap-4 md:gap-17"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            {/* Left side - Title */}
                            <motion.div 
                                className="flex-1 text-right "
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                            >
                                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
                                    {goal.title}
                                </h3>
                            </motion.div>

                            {/* Center - Timeline */}
                            <div className="flex flex-col items-center">
                                {/* Dot */}
                                <motion.div 
                                    className={`w-4 h-4 rounded-full shrink-0   ${index === 0 ? 'bg-primary ' : 'bg-muted-foreground/40'}`}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.15 + 0.1, type: "spring", stiffness: 300 }}
                                />
                                {/* Line */}
                                {index < goalSectionData.goals.length - 1 && (
                                    <motion.div 
                                        className="w-0.5 bg-primary/30 origin-top"
                                        initial={{ scaleY: 0, height: 96 }}
                                        whileInView={{ scaleY: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                                        style={{ height: 112 }}
                                    />
                                )}
                            </div>

                            {/* Right side - Description */}
                            <motion.div 
                                className="flex-1 "
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                            >
                                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                    {goal.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}