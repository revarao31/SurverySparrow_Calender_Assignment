import { useCalendar } from '../context/CalendarContext';
import '../styles/CalendarHeader.css';

const CalendarHeader = () => {
  const { prevMonth, nextMonth, goToToday, formattedMonthYear } = useCalendar();
  
  return (
    <div className="calendar-header">
      <div className="calendar-title">
        <h1>{formattedMonthYear}</h1>
      </div>
      <div className="calendar-controls">
        <button className="today-button" onClick={goToToday}>Today</button>
        <div className="navigation-controls">
          <button className="nav-button" onClick={prevMonth} aria-label="Previous month">
            <span className="nav-arrow">&#8249;</span>
          </button>
          <button className="nav-button" onClick={nextMonth} aria-label="Next month">
            <span className="nav-arrow">&#8250;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;