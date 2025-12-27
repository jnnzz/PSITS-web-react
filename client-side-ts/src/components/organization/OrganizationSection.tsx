import { CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { organizationSectionData, type Member } from "@/data/sections-data"
import { OptimizedImage } from "@/components/common/OptimizedImage"

export default function OrganizationSection() {

    return (
        <section className="relative w-full py-20 md:py-32 lg:py-48 overflow-hidden bg-background">
            <div className="container relative z-10 px-4 md:px-6">
                <div className="space-y-12">
                    {/* Header Section */}
                    <div className="space-y-6 max-w-3xl">
                        <div className="space-y-4">
                            <span className="inline-block text-primary font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs lg:text-sm">
                                {organizationSectionData.header.subtitle}
                            </span>
                            <CardTitle className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9] text-foreground">
                                {organizationSectionData.header.title.normal} <span className="text-primary italic">{organizationSectionData.header.title.highlight}</span>
                            </CardTitle>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="w-full">
                        <Tabs defaultValue="officers" className="w-full">
                            <TabsList className="inline-flex h-auto p-1 bg-muted/30 backdrop-blur-sm border border-border/50 rounded-xl w-full sm:w-auto justify-start overflow-x-auto no-scrollbar flex-nowrap mb-12">
                                {[
                                    { id: 'advisors', label: 'Advisors' },
                                    { id: 'officers', label: 'Officers' },
                                    { id: 'developers', label: 'Developers' },
                                    { id: 'volunteers', label: 'Volunteers' }
                                ].map((tab) => (
                                    <TabsTrigger
                                        key={tab.id}
                                        value={tab.id}
                                        className="relative rounded-lg px-6 py-2.5 text-xs md:text-sm font-bold tracking-wider transition-all duration-300
                                                   data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20
                                                   hover:bg-muted/50 hover:text-foreground
                                                   flex items-center gap-2 whitespace-nowrap min-w-fit"
                                    >
                                        <span className="relative z-10 uppercase">{tab.label}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {/* Content for each Role Tab */}
                            {[
                                { id: 'advisors', label: 'Advisors' },
                                { id: 'officers', label: 'Officers' },
                                { id: 'developers', label: 'Developers' },
                                { id: 'volunteers', label: 'Volunteers' }
                            ].map((role) => {
                                // Aggregate members from all organizations for this role
                                const allMembers = organizationSectionData.tabs.reduce((acc, org) => {
                                    const members = org[role.id as keyof typeof org] as Member[];
                                    return members ? [...acc, ...members] : acc;
                                }, [] as Member[]);

                                if (allMembers.length === 0) return null;

                                return (
                                    <TabsContent key={role.id} value={role.id} className="mt-0 focus-visible:outline-none">
                                        <div>
                                            <MemberCarousel members={allMembers} title={role.label} />
                                        </div>
                                    </TabsContent>
                                );
                            })}
                        </Tabs>
                    </div>
                </div>
            </div>
        </section>
    )
}

const MemberCarousel = ({ members, title }: { members: Member[]; title: string }) => {
    if (!members || members.length === 0) return null;

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-foreground/80">{title}</h3>
                <div className="h-px flex-1 bg-border/50" />
            </div>
            <div className="relative">
                {/* Left fade gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                {/* Right fade gradient */}
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                
                <Carousel
                    opts={{
                        align: "center",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {members.map((member, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[35%] xl:basis-[28%]">
                                <div className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/50 bg-muted">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                        <p className="text-white font-bold text-lg leading-tight">{member.name}</p>
                                        <p className="text-white/80 text-sm font-medium uppercase tracking-wider">{member.role}</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    
                    {/* Navigation arrows */}
                    <CarouselPrevious className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-lg" />
                    <CarouselNext className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-lg" />
                </Carousel>
            </div>
        </div>
    );
};