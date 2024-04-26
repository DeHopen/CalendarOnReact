import React, { useState, useEffect } from 'react';
import { useCalendarEvents } from '../store/hooks';
import {CalendarEvent} from '../store/features/eventsSlice';
import { getRandomPastelColor } from './utils';

interface EventModalProps {
  show: boolean;
  onClose: () => void;
  event?: CalendarEvent;
  day: Date;
}

const EventModal: React.FC<EventModalProps> = ({ show, onClose, event, day }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [color, setColor] = useState(event?.color || '#ffffff');
  const [time, setTime] = useState('12:00');
  const [description, setDescription] = useState('');
  const { addNewEvent, editEvent, deleteEvent, getEventsForDate } = useCalendarEvents();

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setColor(event.color);
      setTime(event.time || '12:00');
      setDescription(event.description || '');
    }
    else {
      setColor(getRandomPastelColor());
      setTime('12:00');
      setDescription('');
    }
  }, [event]);


  const handleSave = () => {
    const formattedDate = day.getFullYear() + '-' + (day.getMonth() + 1).toString().padStart(2, '0') + '-' + day.getDate().toString().padStart(2, '0');
    if (event) {
      editEvent({...event, title, color, time, description});
    } else {
      addNewEvent({date: formattedDate, title, color, time, description});
    }
    onClose();
  }
  const handleDelete = () => {
    if (event) {
      console.log("Deleting event with ID:", event.id);
      deleteEvent(event.id);
      onClose();
    }
  };

  if (!show) return null;

  return (
      <div className="modal">
        <div className="modal-content">
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
          <input type="time" value={time} onChange={e => setTime(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Close</button>
          {event && <button onClick={handleDelete}>Delete</button>}
        </div>
      </div>
  );
};

export default EventModal;
