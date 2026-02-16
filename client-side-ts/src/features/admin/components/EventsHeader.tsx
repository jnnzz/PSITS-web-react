import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventsHeaderProps {
  onAddEvent?: () => void;
}

export const EventsHeader: React.FC<EventsHeaderProps> = ({ onAddEvent }) => {
  return (
    <header className="bg-background  px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">Create and manage upcoming events.</p>
        </div>
        <Button 
          onClick={onAddEvent}
          size="default"
          className="w-full sm:w-auto bg-[#1C9DDE] hover:bg-[#1C9DDE]"
        >
          <Plus />
          <span>Add Event</span>
        </Button>
      </div>
    </header>
  );
};

export default EventsHeader;
