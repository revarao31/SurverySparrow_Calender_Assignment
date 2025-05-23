import { useCalendar } from '../context/CalendarContext';
import CalendarEvent from './CalendarEvent';
import '../styles/CalendarDay.css';

const CalendarDay = ({ day }) => {
  const { 
    currentDate, 
    selectedDate, 
    setSelectedDate, 
    isSameMonth, 
    isSameDay,
    getEventsForDate 
  } = useCalendar();
  
  const dayEvents = getEventsForDate(day);
  
  const isCurrentMonth = isSameMonth(day, currentDate);
  const isCurrentDay = isSameDay(day, new Date());
  const isSelected = isSameDay(day, selectedDate);
  
  const dayClasses = [
    'calendar-day',
    !isCurrentMonth ? 'other-month' : '',
    isCurrentDay ? 'current-day' : '',
    isSelected ? 'selected-day' : '',
    dayEvents.length > 0 ? 'has-events' : ''
  ].filter(Boolean).join(' ');
  
  const handleSelectDay = () => {
    setSelectedDate(day);
  };
  
  // Limit the number of events to display in the calendar cell
  const visibleEvents = dayEvents.slice(0, 3);
  const hasMoreEvents = dayEvents.length > 3;
  
  return (
    <div className={dayClasses} onClick={handleSelectDay}>
      <div className="day-number">{day.getDate()}</div>
      {isCurrentMonth && (
        <div className="day-events">
          {visibleEvents.map(event => (
            <CalendarEvent key={event.id} event={event} />
          ))}
          {hasMoreEvents && (
            <div className="more-events">+{dayEvents.length - 3} more</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarDay;