import { useCalendar } from '../context/CalendarContext';
import '../styles/CalendarEvent.css';

const CalendarEvent = ({ event }) => {
  const { formatEventTime, getConflictingEvents } = useCalendar();
  
  const conflicts = getConflictingEvents(event);
  const hasConflict = conflicts.length > 0;
  
  // Generate a consistent color based on the event ID
  const getEventColor = (id) => {
    const colors = [
      '#4285F4', // Google Blue
      '#EA4335', // Google Red
      '#FBBC05', // Google Yellow
      '#34A853', // Google Green
      '#8E24AA', // Purple
      '#00ACC1', // Cyan
      '#FF7043', // Deep Orange
      '#43A047', // Green
      '#3949AB', // Indigo
      '#5D4037'  // Brown
    ];
    
    return colors[id % colors.length];
  };
  
  const eventStyle = {
    backgroundColor: hasConflict ? 'rgba(255, 173, 173, 0.7)' : 'rgba(66, 133, 244, 0.7)',
    borderLeft: `3px solid ${getEventColor(event.id)}`
  };
  
  return (
    <div 
      className="calendar-event" 
      style={eventStyle} 
      title={`${event.title} - ${formatEventTime(event.time)} (${event.duration} min)`}
    >
      <div className="event-title">{event.title}</div>
    </div>
  );
};

export default CalendarEvent;