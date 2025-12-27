import { EventsBanner } from '@/components/sections/banner/EventsBanner';
import { UpcomingEventsSection } from '@/components/sections/events/UpcomingEventsSection';
import { PastEvents } from '@/components/sections/events/PastEvents';

export const Events = () => {
  return (
    <main className="min-h-screen bg-white">
      <EventsBanner />
      <UpcomingEventsSection />
      <PastEvents />
    </main>
  );
};
