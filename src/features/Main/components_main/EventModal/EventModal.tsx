import React, {useEffect, useState} from 'react';
import {useCalendarEvents} from '../../../../store/hooks';
import {CalendarEvent} from '../../../../store/slices/eventsSlice';
import {getRandomPastelColor} from '../../utils';

interface EventModalProps {
  show: boolean;
  onClose: () => void;
  event?: CalendarEvent;
  day: Date;
}

const EventModal: React.FC<EventModalProps> = ({show, onClose, event, day}) => {
  const [title, setTitle] = useState(event?.title || '');
  const [color, setColor] = useState(event?.color || '#ffffff');
  const [time, setTime] = useState('12:00');
  const [description, setDescription] = useState('');
  const {addNewEvent, editEvent, deleteEvent} = useCalendarEvents();

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setColor(event.color);
      setTime(event.time || '12:00');
      setDescription(event.description || '');
    } else {
      setColor(getRandomPastelColor());
      setTime('12:00');
      setDescription('');
    }
  }, [event]);


  const handleSave = () => {
    const formattedDate = day.getUTCFullYear() + '-' + (day.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + day.getUTCDate().toString().padStart(2, '0');
    const finalTitle = title.trim() === '' ? 'New event' : title;
    if (event) {
      editEvent({...event, title: finalTitle, color, time, description});
    } else {
      addNewEvent({date: formattedDate, title: finalTitle, color, time, description});
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
      <div className={`modal ${show ? 'show' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2
              contentEditable
              onBlur={e => setTitle(e.currentTarget.textContent || '')}
              suppressContentEditableWarning={true}
          >
            {title}
          </h2>

          <p><strong>Date:</strong> {day.toLocaleDateString()}</p> {/* Дата события */}
          <p><strong>Time:</strong>
            <div
                contentEditable
                onBlur={e => setTime(e.currentTarget.textContent || '')}
                suppressContentEditableWarning={true}
            >
              {time}
            </div>

          </p>
          <p><strong>Description: </strong></p>
          <p
              contentEditable
              onBlur={e => setDescription(e.currentTarget.textContent || '')}
              suppressContentEditableWarning={true}
          >
            {description}
          </p>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Close</button>
          {event && <button onClick={handleDelete}>Delete</button>}
        </div>
      </div>

  );
};

export default EventModal;