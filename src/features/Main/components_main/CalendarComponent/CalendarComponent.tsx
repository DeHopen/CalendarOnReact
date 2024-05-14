import React, {useState} from 'react';
import DayComponent from '../DayComponent/DayComponent';
import EventModal from '../EventModal/EventModal';
import './CalendarComponent.scss';
import {CalendarEvent} from "../../../../store/slices/eventsSlice";

const CalendarComponent: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeDay, setActiveDay] = useState<Date | null>(null);
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | undefined>(undefined);
  const [modalPosition, setModalPosition] = useState<{ x: number, y: number } | undefined>(undefined);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const handleDayClick = (day: Date, event?: CalendarEvent, eventPosition?: { x: number, y: number }) => {
    setActiveDay(day);
    setActiveEvent(event);
    if (eventPosition) {
      setModalPosition(eventPosition);
    }
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
      <div className="calendar">
        <div className="header">
          <button onClick={prevMonth}>&laquo;</button>
          <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <button onClick={nextMonth}>&raquo;</button>
        </div>
        <div className="days-grid">
          {Array.from({length: daysInMonth(currentDate)}, (_, index) => (
              <DayComponent
                  key={index}
                  day={new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1)}
                  onDayClick={handleDayClick}
                  setActiveEvent={setActiveEvent}
              />
          ))}
        </div>
        {activeDay && <EventModal
            show={true}
            onClose={() => {
              setActiveDay(null);
              setActiveEvent(undefined);
            }}
            event={activeEvent}
            day={activeDay}
            position={modalPosition}
        />}
      </div>
  );
};

export default CalendarComponent;
