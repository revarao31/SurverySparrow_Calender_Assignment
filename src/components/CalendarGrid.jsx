import { useCalendar } from '../context/CalendarContext';
import CalendarDay from './CalendarDay';
import '../styles/CalendarGrid.css';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid = () => {
  const { calendarDays } = useCalendar();
  
  return (
    <div className="calendar-grid">
      <div className="calendar-weekdays">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-days">
        {calendarDays.map(day => (
          <CalendarDay key={day.toString()} day={day} />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;