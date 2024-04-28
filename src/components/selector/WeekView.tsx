import React from 'react';
import DayView from "./DayView";
import {CalendarEvent} from "../../store/features/eventsSlice";

interface WeekViewProps {
  week: Date;
  onDayClick: (day: Date) => void;
  setActiveEvent: (event: CalendarEvent | undefined) => void;
}

const WeekView: React.FC<WeekViewProps> = ({week, onDayClick, setActiveEvent}) => {
  const days = Array.from({length: 7}, (_, index) => {
    const day = new Date(week);
    day.setDate(day.getDate() + index);
    return day;
  });


  return (
      <div className="week">
        {days.map((day, index) => (
            <DayView key={index} day={day} onDayClick={onDayClick} setActiveEvent={setActiveEvent}/>
        ))}
      </div>
  );
};

export default WeekView;
