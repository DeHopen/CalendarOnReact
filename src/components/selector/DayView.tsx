import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { CalendarEvent } from "../../store/features/eventsSlice";
import '../DayComponent.scss'

interface DayComponentProps {
  day: Date;
  onDayClick: (day: Date, event?: CalendarEvent) => void;
  setActiveEvent: (event: CalendarEvent | undefined) => void;
}

const DayComponent: React.FC<DayComponentProps> = ({ day, onDayClick, setActiveEvent }) => {
  const events = useSelector((state: RootState) => state.events.events.filter(e => e.date === day.toISOString().split('T')[0]));

  const handleEventClick = (event: CalendarEvent) => {
    onDayClick(day, event);
    setActiveEvent(event);
  };

  return (
      <div className="day" onClick={() => onDayClick(day)}>
        <span>{day.getDate()}</span>
        {events.map(event => (
            <div key={event.id} style={{ backgroundColor: event.color }} className="event" onClick={(e) => {
              e.stopPropagation();
              handleEventClick(event);
            }}>
              {event.title} - {event.time ? event.time : 'No Time Set'}
              <p></p>
              {event.description}
            </div>
        ))}
      </div>
  );
};

export default DayComponent;
