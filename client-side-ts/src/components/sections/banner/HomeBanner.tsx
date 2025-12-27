import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import banner from '@/assets/banner.png';
import { homeBannerData } from '@/data/sections-data';
import { OptimizedImage } from '@/components/common/OptimizedImage';

export const HomeBanner = () => {
  return (
    <section className="flex flex-col items-center justify-center pt-14 sm:pt-20 md:pt-24 lg:pt-32 pb-12 gap-8 md:gap-10 lg:gap-14">
      <Card className="container bg-transparent border-none shadow-none flex flex-col items-center text-center py-0">
        <CardContent className="flex flex-col items-center gap-6 max-w-[900px] p-0">
          <CardTitle className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]">
            {homeBannerData.title.normal}{' '}
            <span className="text-primary block sm:inline">
              {homeBannerData.title.highlight}
            </span>
          </CardTitle>
          <CardDescription className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {homeBannerData.description}
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 px-4 sm:px-0">
            <Button
              size="lg"
              className="rounded-full text-base px-8 h-12 font-semibold w-full sm:w-auto"
            >
              {homeBannerData.buttons.primary}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base px-8 h-12 font-semibold w-full sm:w-auto"
            >
              {homeBannerData.buttons.secondary}
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        <OptimizedImage
          src={banner}
          alt={homeBannerData.image.alt}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </section>
  );
};
