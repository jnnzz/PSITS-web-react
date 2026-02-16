import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { EventInfoTab } from './EventInfoTab';
import { SessionSetupTab } from './SessionSetupTab';
import type { EventFormData } from './AddEventModal';

interface EditEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveEvent?: (event: any) => void;
  eventData: {
    id: string;
    title: string;
    description?: string;
    location?: string;
    startDate?: string;
    image: string;
  } | null;
}

export const EditEventModal: React.FC<EditEventModalProps> = ({
  open,
  onOpenChange,
  onSaveEvent,
  eventData,
}) => {
  const [activeTab, setActiveTab] = useState('event-info');
  const [formData, setFormData] = useState<EventFormData>({
    eventName: '',
    eventDescription: '',
    eventSchedule: undefined,
    location: '',
    image: null,
    sessions: [],
  });

  // Populate form data when eventData changes
  useEffect(() => {
    if (eventData && open) {
      setFormData({
        eventName: eventData.title || '',
        eventDescription: eventData.description || '',
        eventSchedule: eventData.startDate ? new Date(eventData.startDate) : undefined,
        location: eventData.location || '',
        image: null, // Keep as null since we can't convert URL to File
        sessions: [],
      });
    }
  }, [eventData, open]);

  const handleSubmit = () => {
    if (!eventData) return;

    const eventDate = formData.eventSchedule || new Date();
    const updatedEvent = {
      id: eventData.id,
      title: formData.eventName,
      date: eventDate.toLocaleDateString(),
      image: formData.image ? URL.createObjectURL(formData.image) : eventData.image,
      status: 'view' as const,
      description: formData.eventDescription,
      location: formData.location,
      locationAddress: formData.location,
      startDate: eventDate.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      startTime: formData.sessions[0]?.morningSession.startTime || '8:00 AM',
      endDate: eventDate.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      endTime:
        formData.sessions[formData.sessions.length - 1]?.eveningSession.endTime || '5:00 PM',
      venues: [formData.location],
    };

    if (onSaveEvent) onSaveEvent(updatedEvent);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setActiveTab('event-info');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-4xl sm:max-w-2xl h-[90vh] max-h-[90vh] flex flex-col overflow-y-auto p-0 gap-0 rounded-lg sm:rounded-xl" showCloseButton={false}>
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold leading-6">Edit Event</DialogTitle>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleCancel}
              className="h-8 w-8 flex items-center justify-center rounded-full cursor-pointer"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-6 py-0 h-auto">
            <TabsTrigger
              value="event-info"
              className="rounded-none cursor-pointer border-b-2 border-transparent  data-[state=active]:bg-transparent data-[state=active]:text-[#1C9DDE] data-[state=active]:shadow-none px-4 py-3"
            >
              Event Info
            </TabsTrigger>
            <TabsTrigger
              value="session-setup"
              className="rounded-none cursor-pointer border-b-2 border-blue border-transparent data-[state=active]:border-b[#1C9DDE] data-[state=active]:bg-transparent data-[state=active]:text-[#1C9DDE] data-[state=active]:shadow-none px-4 py-3"
            >
              Session Setup
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6">
            <TabsContent value="event-info" className="mt-0">
              <EventInfoTab formData={formData} setFormData={setFormData} />
            </TabsContent>

            <TabsContent value="session-setup" className="mt-0">
              <SessionSetupTab formData={formData} setFormData={setFormData} />
            </TabsContent>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-background">
            <Button variant="outline" onClick={handleCancel} className="cursor-pointer">
              Cancel
            </Button>
              <Button onClick={handleSubmit} className="bg-[#1C9DDE] hover:bg-[#1C9DDE] cursor-pointer">
              Save Changes
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
