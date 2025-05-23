import { CalendarProvider } from './context/CalendarContext';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Interactive Calendar</h1>
      </header>
      <main className="app-main">
        <CalendarProvider>
          <Calendar />
        </CalendarProvider>
      </main>
      <footer className="app-footer">
        <p>Calendar Application - 2025</p>
      </footer>
    </div>
  );
}

export default App;