import React from 'react';
import { MoreVertical, BarChart3, Ticket } from 'lucide-react';
import { EventCard } from './EventCard';
import type { Event } from './EventCard';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  if (events.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 pb-8 text-center py-12">
        <p className="text-gray-500 text-lg">No events found</p>
        <p className="text-gray-400 text-sm mt-2">Create your first event to get started</p>
      </div>
    );
  }

  /* ── LIST VIEW ── */
  if (viewMode === 'list') {
    return (
      <div className="px-4 sm:px-6 lg:px-8 pb-8 flex flex-col gap-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-4 border border-border rounded-xl px-4 py-3 bg-background hover:bg-muted/40 transition-colors"
          >
            {/* Thumbnail */}
            <div className="w-13 h-13 shrink-0 rounded-xl overflow-hidden bg-muted">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f1f5f9'/%3E%3Cg transform='translate(50,50)'%3E%3Crect x='-20' y='-16' width='40' height='32' rx='4' fill='%23cbd5e1'/%3E%3Ccircle cx='0' cy='-3' r='7' fill='%23f1f5f9'/%3E%3Cellipse cx='0' cy='13' rx='11' ry='7' fill='%23f1f5f9'/%3E%3C/g%3E%3C/svg%3E`;
                }}
              />
            </div>

            {/* Title + Date */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{event.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{event.date}</p>
            </div>

            {/* Manage Event button */}
            <Button
              onClick={() => onManageEvent?.(event.id)}
              className="shrink-0 bg-[#1C9DDE] hover:bg-[#1C9DDE]/90 cursor-pointer rounded-full px-5 text-sm hidden sm:flex"
            >
              Manage Event
            </Button>

            {/* Kebab menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0 cursor-pointer">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* Show Manage on mobile via dropdown */}
                <DropdownMenuItem className="sm:hidden" onClick={() => onManageEvent?.(event.id)}>
                  Manage Event
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewStatistics?.(event.id)}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Statistics
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewRaffle?.(event.id)}>
                  <Ticket className="w-4 h-4 mr-2" />
                  Raffle
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    );
  }

  /* ── GRID VIEW ── */
  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-8">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
};

export default EventsGrid;
