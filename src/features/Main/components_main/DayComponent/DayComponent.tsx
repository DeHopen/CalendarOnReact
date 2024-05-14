import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/store';
import {CalendarEvent} from "../../../../store/slices/eventsSlice";

interface DayComponentProps {
  day: Date;
  onDayClick: (day: Date, event?: CalendarEvent, eventPosition?: { x: number, y: number }) => void;
  setActiveEvent: (event: CalendarEvent | undefined) => void; // Функция для управления активным днём
}

const DayComponent: React.FC<DayComponentProps> = ({day, onDayClick, setActiveEvent}) => {
  const events = useSelector((state: RootState) => state.events.events.filter(e => e.date === day.toISOString().split('T')[0]));

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = {x: rect.right + 10, y: rect.top};
    onDayClick(day, event, position);
    setActiveEvent(event);
  };

  const handleDayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = {x: rect.right + 10, y: rect.top};
    onDayClick(day, undefined, position);
  };

  return (
      <div className="day" onClick={handleDayClick}>
        <span>{day.getDate()}</span>
        {events.map(event => (
            <div
                key={event.id}
                style={{backgroundColor: event.color}}
                className="event"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEventClick(event, e);
                }}>
              {event.time ? event.time : 'No Time Set'}<p>{'\n'}</p>
              {event.title}
            </div>
        ))}
      </div>
  );
};

export default DayComponent;
