import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { EventsHeader, ViewToggle, EventsGrid, AddEventModal } from './components';
import type { Event } from './components';
import { getEvents, createEvent, removeEvent } from '../events/api/event';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Events data from API
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: '60th UC Intramurals',
      date: '11-20-2024',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop',
      status: 'view',
      description: 'One of the most awaited events of every UCian is the annual celebration of Intramurals, and this year is no other. An event where all college departments battle each other to stand above the rest; an event that allows UCians to showcase their talents and skills; an event that unites all UCians from every campus; an event that exudes the spirit and enthusiasm of every UCians; an event like no other, that is the true essence of UC Intramurals.',
      location: 'University of Cebu Main Campus',
      locationAddress: 'Sanciangko St.',
      startDate: 'Wed, 20 November 2024',
      startTime: '5:00 PM',
      endDate: 'Sat, 23 November 2024',
      endTime: '12:00 PM',
      venues: ['University of Cebu Main Campus', 'UC Banilad Campus', 'UC South Campus']
    },
    {
      id: '2',
      title: 'Acquaintance Party',
      date: '11-16-2024',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
      status: 'view',
      description: 'Join us for an evening of fun, music, and networking at the PSITS Acquaintance Party! Get to know your fellow IT students in a relaxed and festive atmosphere.',
      location: 'UC Main Campus Auditorium',
      locationAddress: 'Sanciangko St.',
      startDate: 'Sat, 16 November 2024',
      startTime: '6:00 PM',
      endDate: 'Sat, 16 November 2024',
      endTime: '11:00 PM',
      venues: ['University of Cebu Main Campus']
    },
    {
      id: '3',
      title: '10th ICT Congress',
      date: '04-12-2024',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
      status: 'manage',
      description: 'The 10th ICT Congress brings together industry leaders, experts, and students to discuss the latest trends and innovations in Information and Communications Technology.',
      location: 'Cebu Convention Center',
      locationAddress: 'Archbishop Reyes Ave, Cebu City',
      startDate: 'Fri, 12 April 2024',
      startTime: '8:00 AM',
      endDate: 'Fri, 12 April 2024',
      endTime: '5:00 PM',
      venues: ['Cebu Convention Center']
    },
    {
      id: '4',
      title: '60th UC Intramurals',
      date: '01-06-2025',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop',
      status: 'view',
      description: 'The 60th UC Intramurals brings together students from all campuses to compete in various sports and showcase their athletic prowess.',
      location: 'UC Sports Complex',
      locationAddress: 'M.J. Cuenco Ave',
      startDate: 'Mon, 6 January 2025',
      startTime: '7:00 AM',
      endDate: 'Fri, 10 January 2025',
      endTime: '6:00 PM',
      venues: ['UC Sports Complex', 'UC Main Campus']
    },
    {
      id: '5',
      title: '60th UC Intramurals',
      date: '01-06-2025',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop',
      status: 'view',
      description: 'Join the excitement of UC Intramurals 2025! A celebration of sportsmanship, camaraderie, and healthy competition.',
      location: 'UC Banilad Campus',
      locationAddress: 'Gov. M. Cuenco Ave, Cebu City',
      startDate: 'Mon, 6 January 2025',
      startTime: '8:00 AM',
      endDate: 'Thu, 9 January 2025',
      endTime: '5:00 PM',
      venues: ['UC Banilad Campus']
    },
    {
      id: '6',
      title: '60th UC Intramurals',
      date: '01-06-2025',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop',
      status: 'view',
      description: 'Experience the thrill of competition at the 60th UC Intramurals! Cheer for your college and witness amazing displays of talent.',
      location: 'UC Maritime Campus',
      locationAddress: 'M.J. Cuenco Ave',
      startDate: 'Mon, 6 January 2025',
      startTime: '7:30 AM',
      endDate: 'Wed, 8 January 2025',
      endTime: '4:00 PM',
      venues: ['UC Maritime Campus']
    }
  ]);

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const result = await getEvents();
      if (result && Array.isArray(result)) {
        // Map API data to Event interface
        const mappedEvents: Event[] = result.map((event: any) => ({
          id: event.eventId || event._id,
          title: event.eventName,
          date: event.eventDate,
          image: event.eventImage?.[0] || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop',
          status: 'view',
          description: event.eventDescription || '',
          location: event.location || 'TBD',
          locationAddress: event.locationAddress || '',
          startDate: event.startDate || event.eventDate,
          startTime: event.startTime || '8:00 AM',
          endDate: event.endDate || event.eventDate,
          endTime: event.endTime || '5:00 PM',
          venues: event.venues || [event.location || 'TBD']
        }));
        setEvents(mappedEvents);
      }
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  // Add event callback
  const handleAddEventToList = async (newEvent: Event) => {
    const eventData = {
      name: newEvent.title,
      date: newEvent.date,
      description: newEvent.description,
      location: newEvent.location,
      eventImage: newEvent.image,
    };
    
    const result = await createEvent(eventData);
    if (result) {
      // Add the new event with the returned ID
      const createdEvent = {
        ...newEvent,
        id: result.eventId || String(Date.now())
      };
      setEvents((prev) => [createdEvent, ...prev]);
      setIsAddEventModalOpen(false);
    }
  };

  // Event handlers
  const handleAddEvent = () => {
    setIsAddEventModalOpen(true);
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
      const result = await removeEvent(eventId);
      if (result) {
        setEvents((prev) => prev.filter(e => e.id !== eventId));
      }
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
      
      <EventsGrid
        events={events}
        viewMode={viewMode}
        onViewEvent={handleViewEvent}
        onManageEvent={handleManageEvent}
        onViewStatistics={handleViewStatistics}
        onViewRaffle={handleViewRaffle}
      />

      <AddEventModal 
        open={isAddEventModalOpen} 
        onOpenChange={setIsAddEventModalOpen}
        onAddEvent={handleAddEventToList}
      />
    </div>
  );
};

export default Dashboard;
