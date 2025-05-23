import { useCalendar } from '../context/CalendarContext';
import EventItem from './EventItem';
import { format } from 'date-fns';
import '../styles/EventList.css';

const EventList = () => {
  const { selectedDate, selectedEvents } = useCalendar();
  
  return (
    <div className="event-list">
      <div className="event-list-header">
        <h2>Events for {format(selectedDate, 'EEEE, MMMM d, yyyy')}</h2>
        {selectedEvents.length === 0 && (
          <p className="no-events">No events scheduled for this day.</p>
        )}
      </div>
      <div className="event-items">
        {selectedEvents.map(event => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;