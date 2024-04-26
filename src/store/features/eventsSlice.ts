import { v4 as uuidv4 } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface CalendarEvent {
  id: string;
  date: string;
  time?: string;
  title: string;
  color: string;
  description?: string;
}

interface EventsState {
  events: CalendarEvent[];
}

const initialState: EventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<{ date: string; title: string; color: string, time: string }>) => {
      state.events.push({ id: uuidv4(), ...action.payload });
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
  },
});
export const { addEvent, removeEvent, updateEvent } = eventsSlice.actions;
export default eventsSlice.reducer;