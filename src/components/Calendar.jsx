import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventList from './EventList';
import '../styles/Calendar.css';

const Calendar = () => {
  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <CalendarHeader />
        <CalendarGrid />
      </div>
      <EventList />
    </div>
  );
};

export default Calendar;