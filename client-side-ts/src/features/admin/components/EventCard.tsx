import React from 'react';
import { MoreVertical, BarChart3, Ticket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface Event {
  id: string;
  title: string;
  date: string;
  image: string;
  status: 'view' | 'manage';
  description?: string;
  location?: string;
  locationAddress?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  venues?: string[];
}

interface EventCardProps {
  event: Event;
  onViewEvent?: (eventId: string) => void;
  onManageEvent?: (eventId: string) => void;
  onViewStatistics?: (eventId: string) => void;
  onViewRaffle?: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onViewEvent,
  onManageEvent,
  onViewStatistics,
  onViewRaffle,
}) => {
  const handleMainAction = () => {
    if (event.status === 'manage') {
      onManageEvent?.(event.id);
    } else {
      onViewEvent?.(event.id);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-gray-200">
      <div className="relative aspect-[4/3] overflow-hidden bg-white p-6 rounded-lg">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base sm:text-lg mb-1 truncate">
              {event.title}
            </h3>
            <p className="text-sm text-muted-foreground">{event.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleMainAction}
            className="flex-1 bg-[#1C9DDE] cursor-pointer rounded-2xl hover:bg-[#1C9DDE]"
          >
            {event.status === 'manage' ? 'Manage Event' : 'View Event'}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewStatistics?.(event.id)}>
                <BarChart3 />
                <span>Statistics</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewRaffle?.(event.id)}>
                <Ticket />
                <span>Raffle</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
