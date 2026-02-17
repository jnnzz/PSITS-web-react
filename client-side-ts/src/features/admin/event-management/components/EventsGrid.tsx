import React from 'react';
import { EventCard } from './EventCard';
import type { Event } from './EventCard';

interface EventsGridProps {
  events: Event[];
  viewMode?: 'grid' | 'list';
  onViewEvent?: (eventId: string) => void;
  onManageEvent?: (eventId: string) => void;
  onViewStatistics?: (eventId: string) => void;
  onViewRaffle?: (eventId: string) => void;
}

export const EventsGrid: React.FC<EventsGridProps> = ({
  events,
  viewMode = 'grid',
  onViewEvent,
  onManageEvent,
  onViewStatistics,
  onViewRaffle,
}) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-8">
      <div 
        className={`grid gap-4 sm:gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onViewEvent={onViewEvent}
            onManageEvent={onManageEvent}
            onViewStatistics={onViewStatistics}
            onViewRaffle={onViewRaffle}
          />
        ))}
      </div>
      
      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events found</p>
          <p className="text-gray-400 text-sm mt-2">Create your first event to get started</p>
        </div>
      )}
    </div>
  );
};

export default EventsGrid;
