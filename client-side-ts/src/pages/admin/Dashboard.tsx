import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth';
import { showToast } from '@/utils/alertHelper';
import { EventsHeader, ViewToggle, EventsGrid, AddEventModal } from '@/features/admin/event-management';
import type { Event } from '@/features/admin/event-management';
import { getEvents, createEvent, updateEvent, removeEvent } from '@/features/events/api/event';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { logout, user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Mock events for local testing (used when API returns no data)
  const MOCK_EVENTS: Event[] = [
    {
      id: 'm1',
      title: 'Mock: Developer Meetup',
      date: '02-25-2026',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      status: 'manage',
      description: 'A local meetup for developers to network and share knowledge.',
      location: 'Tech Hub Auditorium',
      locationAddress: '123 Dev Street',
      startDate: 'Wed, 25 February 2026',
      startTime: '6:00 PM',
      endDate: 'Wed, 25 February 2026',
      endTime: '9:00 PM',
      venues: ['Tech Hub Auditorium']
    },
    {
      id: 'm2',
      title: 'Mock: Hackathon',
      date: '03-10-2026',
      image: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=800&h=600&fit=crop',
      status: 'view',
      description: '24 hour hackathon for students to build cool projects.',
      location: 'Innovation Lab',
      locationAddress: '456 Code Ave',
      startDate: 'Tue, 10 March 2026',
      startTime: '9:00 AM',
      endDate: 'Wed, 11 March 2026',
      endTime: '9:00 AM',
      venues: ['Innovation Lab']
    },
    {
      id: 'm3',
      title: 'Mock: UI/UX Workshop',
      date: '04-05-2026',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      status: 'view',
      description: 'Hands-on workshop covering modern UI/UX techniques.',
      location: 'Design Studio',
      locationAddress: '789 Creative Blvd',
      startDate: 'Mon, 5 April 2026',
      startTime: '1:00 PM',
      endDate: 'Mon, 5 April 2026',
      endTime: '4:00 PM',
      venues: ['Design Studio']
    }
  ];

  // Events data from API (default to mock data for local testing)
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const result = await getEvents();
        if (result && Array.isArray(result) && result.length > 0) {
          // Map API data to Event interface
          const mappedEvents: Event[] = result.map((event: any) => ({
            id: event.eventId || event._id || String(Date.now()),
            title: event.eventName || 'Untitled Event',
            date: event.eventDate ? new Date(event.eventDate).toLocaleDateString() : new Date().toLocaleDateString(),
            image: event.eventImage?.[0] || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop',
            status: 'view' as const,
            description: event.eventDescription || '',
            location: event.location || 'TBD',
            locationAddress: event.locationAddress || '',
            startDate: event.startDate ? new Date(event.startDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }),
            startTime: event.startTime || '8:00 AM',
            endDate: event.endDate ? new Date(event.endDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }),
            endTime: event.endTime || '5:00 PM',
            venues: event.venues || [event.location || 'TBD']
          }));
          setEvents(mappedEvents);
        } else {
          // Keep using mock events when API returns empty or fails
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        showToast('error', 'Error loading events');
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Add event callback
  const handleAddEventToList = async (newEvent: Event) => {
    try {
      const eventData = {
        name: newEvent.title,
        date: newEvent.date,
        description: newEvent.description,
        location: newEvent.location,
        eventImage: newEvent.image,
      };

      const result = await createEvent(eventData);
      if (result) {
        // Create the event with the returned ID from the API
        const createdEvent = {
          ...newEvent,
          id: result.eventId || String(Date.now())
        };
        setEvents((prev) => [createdEvent, ...prev]);
        setIsAddEventModalOpen(false);
        showToast('success', 'Event created successfully');
      } else {
        showToast('error', 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      showToast('error', 'Error creating event');
    }
  };

  // Event handlers
  const handleAddEvent = () => {
    setIsAddEventModalOpen(true);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      showToast('success', 'Logged out successfully');
      navigate('/auth/login', { replace: true });
    } catch (err) {
      showToast('error', 'Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleViewEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      navigate(`/admin/events/${eventId}`, { state: { event } });
    }
  };

  const handleManageEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      navigate(`/admin/events/${eventId}`, { state: { event } });
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this event?');
    if (confirmed) {
      try {
        const result = await removeEvent(eventId);
        if (result) {
          setEvents((prev) => prev.filter(e => e.id !== eventId));
          showToast('success', 'Event deleted successfully');
        } else {
          showToast('error', 'Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        showToast('error', 'Error deleting event');
      }
    }
  };

  // Update event handler
  const handleUpdateEvent = async (eventId: string, updatedEventData: Partial<Event>) => {
    try {
      // Map the Event data to match the API expected format
      const apiEventData = {
        eventName: updatedEventData.title,
        eventDescription: updatedEventData.description,
        eventDate: updatedEventData.date,
        location: updatedEventData.location,
        locationAddress: updatedEventData.locationAddress,
        startDate: updatedEventData.startDate,
        startTime: updatedEventData.startTime,
        endDate: updatedEventData.endDate,
        endTime: updatedEventData.endTime,
        venues: updatedEventData.venues,
        eventImage: updatedEventData.image ? [updatedEventData.image] : undefined
      };

      // Remove undefined values
      const cleanedData = Object.fromEntries(
        Object.entries(apiEventData).filter(([_, value]) => value !== undefined)
      );

      const result = await updateEvent(eventId, cleanedData);
      if (result) {
        // Update the event in local state
        setEvents((prev) =>
          prev.map(event =>
            event.id === eventId
              ? { ...event, ...updatedEventData }
              : event
          )
        );
        showToast('success', 'Event updated successfully');
        return true;
      } else {
        showToast('error', 'Failed to update event');
        return false;
      }
    } catch (error) {
      console.error('Error updating event:', error);
      showToast('error', 'Error updating event');
      return false;
    }
  };

  const handleViewStatistics = (eventId: string) => {
    console.log('View statistics for event:', eventId);
    // Add your logic here
  };

  const handleViewRaffle = (eventId: string) => {
    console.log('View raffle for event:', eventId);
    // Add your logic here
  };

  return (
    <div className="flex-1 flex flex-col">
      <EventsHeader onAddEvent={handleAddEvent} />

      <ViewToggle
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1C9DDE] mx-auto mb-4"></div>
            <p className="text-gray-500">Loading events...</p>
          </div>
        </div>
      ) : (
        <EventsGrid
          events={events}
          viewMode={viewMode}
          onViewEvent={handleViewEvent}
          onManageEvent={handleManageEvent}
          // onUpdateEvent={handleUpdateEvent}
          // onDeleteEvent={handleDeleteEvent}
          onViewStatistics={handleViewStatistics}
          onViewRaffle={handleViewRaffle}
        />
      )}

      <AddEventModal
        open={isAddEventModalOpen}
        onOpenChange={setIsAddEventModalOpen}
        onAddEvent={handleAddEventToList}
      />
    </div>
  );
};

export default Dashboard;
