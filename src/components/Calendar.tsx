import React, { useState, useContext, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

const MyCalendar = () => {
  const handleDateSelect = (selectInfo: any) => {
    console.log('Selected dates: ', selectInfo);
  };
  interface MyEvent {
    name: string;
    primary_date: string;
    // Add other properties as needed
  }
  const [events, setEvents] = useState<MyEvent[]>([]);

  const storedUsername = localStorage.getItem('username') || '';

  useEffect(() => {
    getEvents(); 
  }, []);

  const getEvents = async () => {
      try {
          const response = await fetch(`http://127.0.0.1:8000/event/view/?username=${encodeURIComponent(storedUsername)}`);
          if (response.ok) {
              const currEvents = await response.json();
              const allEvents = currEvents.map((event: MyEvent) => ({
                title: event.name,
                start: event.primary_date,
              }));
              setEvents(allEvents)
              console.log('Event Query Successful', allEvents);

          } else {
              const errorData = await response.json();
              const errorMessage = errorData.error[0];
              console.error('Failed to Query', errorMessage);
          }
      } catch (error) {
          console.error('Error:', error);
      }
  };

  return (
    <div className='position-relative top-50 start-50 translate-middle' style={{width:"800px"}}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView='dayGridMonth'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        selectable={true}
        select={handleDateSelect}
        height='600px'
        events={events}
      />
    </div>
  );
};

export default MyCalendar;
