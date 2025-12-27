import { cn } from '@/lib/utils';
// import { Bell, Code2, Users2 } from "lucide-react" // Icons are now in data file
import { getInvolvedData } from '@/data/sections-data';
import { GetInvolvedCard } from './GetInvolvedCard';

export const GetInvolvedSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [isLg, setIsLg] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : false)

  const calculateMaxScroll = useCallback(() => {
    const lg = window.innerWidth >= 1024
    setIsLg(lg)
    
    if (cardsRef.current && lg) {
      // Visible area = viewport height minus padding (py-20 = 80px * 2)
      const visibleHeight = window.innerHeight - 160
      // Total content height
      const contentHeight = cardsRef.current.scrollHeight
      // Max scroll = how much content overflows
      const scroll = Math.max(0, contentHeight - visibleHeight)
      console.log('visible:', visibleHeight, 'content:', contentHeight, 'maxScroll:', scroll)
      setMaxScroll(scroll)
    } else {
      setMaxScroll(0)
    }
  }, [])

  // Calculate on mount and resize
  useEffect(() => {
    // Delay initial calculation to ensure DOM is ready
    const timeout = setTimeout(calculateMaxScroll, 100)
    
    window.addEventListener("resize", calculateMaxScroll)
    
    // Watch for content changes
    const observer = new ResizeObserver(calculateMaxScroll)
    if (cardsRef.current) {
      observer.observe(cardsRef.current)
    }
    
    return () => {
      clearTimeout(timeout)
      window.removeEventListener("resize", calculateMaxScroll)
      observer.disconnect()
    }
  }, [calculateMaxScroll])

  // Handle scroll
  useEffect(() => {
    if (!isLg || maxScroll === 0) return
    
    const onScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const progress = Math.min(Math.max(-rect.top, 0), maxScroll)
      setScrollY(progress)
    }
    
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll() // Call once to set initial position
    
    return () => window.removeEventListener("scroll", onScroll)
  }, [maxScroll, isLg])

  return (
    <div ref={sectionRef} style={{ height: isLg ? `calc(100vh + ${maxScroll}px)` : "auto" }}>
      <div className={cn("bg-background overflow-x-clip", isLg ? "sticky top-0 h-screen overflow-y-hidden" : "py-16 md:py-20")}>
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[10%] -right-[5%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full" />
        </div>

      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Header Area */}
          <div className="lg:col-span-5 space-y-8 sticky lg:top-32">
            <div className="space-y-4">
              <h2
                className={cn(
                  'text-primary font-bold uppercase tracking-[0.2em] text-sm md:text-base'
                )}
              >
                {getInvolvedData.header.subtitle}
              </h2>
              <h1
                className={cn(
                  'text-3xl md:text-4xl lg:text-5xl',
                  'font-black uppercase tracking-tighter leading-[0.9]',
                  'bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent'
                )}
              >
                {getInvolvedData.header.titlePrefix}{' '}
                <br className="hidden md:block" />{' '}
                {getInvolvedData.header.titleSuffix}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-md">{getInvolvedData.header.description}</p>
              <div className="flex items-center gap-3 md:gap-4 pt-2">
                <div className="flex -space-x-2 md:-space-x-3">
                  {[1, 2, 3, 4].map((i) => <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-muted border-2 border-background" />)}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">{getInvolvedData.header.memberCount}</span> IT Students joined
                </p>
              </div>
            </div>

            <div className={cn("lg:w-7/12", isLg && "")}>
              <div ref={cardsRef} className="flex flex-col gap-4 md:gap-6" style={isLg ? { transform: `translateY(-${scrollY}px)` } : undefined}>
                {getInvolvedData.cards.map((card, i) => <GetInvolvedCard key={i} {...card} />)}
              </div>
              <p className="flex items-center text-sm font-medium text-muted-foreground">
                <span className="text-foreground font-bold mr-1">
                  {getInvolvedData.header.memberCount}
                </span>{' '}
                IT Students already joined
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
