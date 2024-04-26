import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent, removeEvent, updateEvent, CalendarEvent } from './features/eventsSlice';
import { RootState } from './store';

export const useCalendarEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.events);

  const addNewEvent = useCallback((event: { date: string; title: string; color: string, time: string, description: string }) => {
    dispatch(addEvent(event));
  }, [dispatch]);

  const deleteEvent = useCallback((eventId: string) => {
    dispatch(removeEvent(eventId));
  }, [dispatch]);

  const editEvent = useCallback((event: CalendarEvent) => {
    dispatch(updateEvent(event));
  }, [dispatch]);

  const getEventsForDate = useCallback((date: Date) => {
    const targetDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
    return events.filter(e => e.date === targetDate);
  }, [events]);




  return { addNewEvent, deleteEvent, editEvent, getEventsForDate };
};
