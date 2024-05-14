import React, {useState} from 'react';
import {CalendarEvent} from "../../../../store/slices/eventsSlice";
import DayView from "./DayView";

interface MonthViewProps {
  onDayClick: (day: Date) => void;
  setActiveEvent: (event: CalendarEvent | undefined) => void;
}

const MonthView: React.FC<MonthViewProps> = ({onDayClick, setActiveEvent}) => {
  const [currentDate] = useState(new Date());

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  return (
      <div className="month">
        {Array.from({length: daysInMonth(currentDate)}, (_, index) => (
            <DayView key={index} day={new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1)}
                     onDayClick={onDayClick} setActiveEvent={setActiveEvent}/>
        ))}
      </div>
  );
};

export default MonthView;
