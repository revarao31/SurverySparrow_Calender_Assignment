import { useCalendar } from '../context/CalendarContext';
import '../styles/EventItem.css';

const EventItem = ({ event }) => {
  const { formatEventTime, getConflictingEvents } = useCalendar();
  
  const conflicts = getConflictingEvents(event);
  const hasConflict = conflicts.length > 0;
  
  // Calculate end time
  const calculateEndTime = (startTime, durationInMinutes) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes + durationInMinutes;
    
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  };
  
  const endTime = calculateEndTime(event.time, event.duration);
  
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
  
  return (
    <div className={`event-item ${hasConflict ? 'has-conflict' : ''}`}>
      <div className="event-color" style={{ backgroundColor: getEventColor(event.id) }}></div>
      <div className="event-content">
        <div className="event-title-container">
          <h3 className="event-title">{event.title}</h3>
          {hasConflict && (
            <div className="conflict-indicator" title="This event overlaps with another event">
              <span>!</span>
            </div>
          )}
        </div>
        <div className="event-time">
          {formatEventTime(event.time)} - {formatEventTime(endTime)} ({event.duration} minutes)
        </div>
        {hasConflict && (
          <div className="conflict-warning">
            This event overlaps with: 
            <ul>
              {conflicts.map(conflict => (
                <li key={conflict.id}>{conflict.title} ({formatEventTime(conflict.time)})</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventItem;