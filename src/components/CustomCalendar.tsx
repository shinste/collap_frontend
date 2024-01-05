import { FC, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import getEvents from '../functions/getEvents';

interface CustomCalendarProps {
  initialView: string;
  height: string;
}

const CustomCalendar: FC<CustomCalendarProps> = ({ initialView, height}) => {

  interface MyEvent {
    name: string;
    primary_date: string;
    start: string;
    end: string;
    primary_end: string
  }
  const [events, setEvents] = useState<MyEvent[]>([]);
  useEffect(() => {
    getEvents(setEvents, localStorage.getItem('username') || '');
  }, []);

  const allEvents = events.map((event: MyEvent) => ({
    title: event.name,
    start: `${event.primary_date}T${event.start}`,
    end: `${event.primary_end}T${event.end}`

  }));
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView={initialView} // Set the initial view dynamically
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: initialView
        }}
        selectable={true}
        // select={handleDateSelect}
        height={height}
        events={allEvents} // Use the events prop directly
      />
    </div>
  );
};

export default CustomCalendar;
