import React, {useState} from 'react';
import EventModal from '../../../Main/components_main/EventModal/EventModal';
import './Calendar.scss';
import {CalendarEvent} from "../../../../store/slices/eventsSlice";
import DayView from "../selector/DayView";
import WeekView from "../selector/WeekView";
import MonthView from "../selector/MonthView";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeDay, setActiveDay] = useState<Date | null>(null);
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | undefined>(undefined);
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');


  const handleDayClick = (day: Date, event?: CalendarEvent) => {
    setActiveDay(day);
    setActiveEvent(event);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
      <div className="calendar">
        <div className="header">
          <button onClick={prevMonth}>&laquo;</button>
          <h2>{currentDate.toLocaleString('default', {month: 'long'})} {currentDate.getFullYear()}</h2>
          <button onClick={nextMonth}>&raquo;</button>
        </div>
        <div className="view-selector">
          <button onClick={() => setView('day')}>Day</button>
          <button onClick={() => setView('week')}>Week</button>
          <button onClick={() => setView('month')}>Month</button>
        </div>
        {view === 'day' && <DayView day={currentDate} onDayClick={handleDayClick} setActiveEvent={setActiveEvent}/>}
        {view === 'week' &&
            <WeekView week={currentDate} onDayClick={handleDayClick} setActiveEvent={setActiveEvent}/>}
        {view === 'month' &&
            <MonthView onDayClick={handleDayClick} setActiveEvent={setActiveEvent}/>}
        {activeDay && <EventModal show={true} onClose={() => {
          setActiveDay(null);
          setActiveEvent(undefined);
        }} event={activeEvent} day={activeDay}/>}
      </div>
  );
};

export default Calendar;