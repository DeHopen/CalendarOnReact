import React, {useEffect, useState} from 'react';
import {useCalendarEvents} from '../../../../store/hooks';
import {CalendarEvent} from '../../../../store/slices/eventsSlice';
import {getRandomPastelColor} from '../../utils';
import './EventModal.scss'; // Подключаем файл стилей

interface EventModalProps {
  show: boolean;
  onClose: () => void;
  event?: CalendarEvent;
  day: Date;
  position?: { x: number, y: number };
}

const EventModal: React.FC<EventModalProps> = ({show, onClose, event, day, position}) => {
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
    const formattedDate = `${day.getUTCFullYear()}-${(day.getUTCMonth() + 1).toString().padStart(2, '0')}-${day.getUTCDate().toString().padStart(2, '0')}`;
    const finalTitle = title.trim() === '' ? 'New event' : title;
    if (event) {
      editEvent({...event, title: finalTitle, color, time, description});
    } else {
      addNewEvent({date: formattedDate, title: finalTitle, color, time, description});
    }
    onClose();
  };

  const handleDelete = () => {
    if (event) {
      deleteEvent(event.id);
      onClose();
    }
  };

  if (!show) return null;

  const modalStyle = {
    position: 'absolute' as 'absolute',
    left: position?.x || '50%',
    top: position?.y || '50%',
    transform: 'translateY(10px)',
    zIndex: 1000,
  };

  return (
      <div className={`modal ${show ? 'show' : ''}`} style={modalStyle}>
        <div className="modal-content">
          <div className="modal-header">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="modal-title-input"
            />
            <span className="close" onClick={onClose}>&times;</span>
          </div>
          <div className="modal-body">
            <p><strong>Date:</strong> {day.toLocaleDateString()}</p>
            <p><strong>Time:</strong>
              <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="modal-time-input"
              />
            </p>
            <p><strong>Description:</strong></p>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="modal-description-input"
            />
          </div>
          <div className="modal-footer">
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Close</button>
            {event && <button onClick={handleDelete}>Delete</button>}
          </div>
        </div>
      </div>
  );
};

export default EventModal;
