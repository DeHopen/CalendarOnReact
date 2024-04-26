import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {CalendarEvent} from "../store/features/eventsSlice";

interface DayComponentProps {
  day: Date;
  onDayClick: (day: Date, event?: CalendarEvent) => void;
  setActiveEvent: (event: CalendarEvent | undefined) => void;// Функция для управления активным днём
}

const DayComponent: React.FC<DayComponentProps> = ({day, onDayClick, setActiveEvent}) => {
  const events = useSelector((state: RootState) => state.events.events.filter(e => e.date === day.toISOString().split('T')[0]));

  const handleEventClick = (event: CalendarEvent) => {
    onDayClick(day, event);  // Теперь передаем день и событие
    setActiveEvent(event); // Установить активное событие для редактирования
  };

  return (
      <div className="day" onClick={() => onDayClick(day)}>
        <span>{day.getDate()}</span>
        {events.map(event => (
            <div key={event.id} style={{backgroundColor: event.color}} className="event" onClick={(e) => {
              e.stopPropagation(); // Предотвращаем всплывание события, чтобы не вызвать onClick дня
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
