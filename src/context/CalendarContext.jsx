import { createContext, useState, useContext, useEffect } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  parseISO, 
  addMonths, 
  format 
} from 'date-fns';
const CalendarContext = createContext();

export const useCalendar = () => useContext(CalendarContext);

export const CalendarProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Load events from JSON file
  useEffect(() => {
    fetch('/events.json')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => {
        console.error('Error loading events:', error);
        setEvents([]);
      });
  }, []);

  // Generate days for the calendar grid
  useEffect(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    setCalendarDays(days);
  }, [currentDate]);

  // Update selected events when date changes
  useEffect(() => {
    const dayEvents = events.filter(event =>
      isSameDay(parseISO(event.date), selectedDate)
    );

    // Sort events by time
    dayEvents.sort((a, b) => {
      return a.time.localeCompare(b.time);
    });

    setSelectedEvents(dayEvents);
  }, [selectedDate, events]);

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(parseISO(event.date), date));
  };

  // Get conflicting events
  const getConflictingEvents = (event) => {
    return events.filter(e =>
      e.id !== event.id &&
      e.date === event.date &&
      (
        (parseTime(e.time) <= parseTime(event.time) &&
         parseTime(e.time) + e.duration > parseTime(event.time)) ||
        (parseTime(e.time) >= parseTime(event.time) &&
         parseTime(e.time) < parseTime(event.time) + event.duration)
      )
    );
  };

  // Helper function to parse time string to minutes
  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Format time for display
  const formatEventTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Get formatted month and year
  const formattedMonthYear = format(currentDate, 'MMMM yyyy');

  const value = {
    currentDate,
    selectedDate,
    setSelectedDate,
    calendarDays,
    events,
    selectedEvents,
    prevMonth,
    nextMonth,
    goToToday,
    getEventsForDate,
    getConflictingEvents,
    formatEventTime,
    formattedMonthYear,
    isSameMonth,
    isSameDay
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
