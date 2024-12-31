import { create } from "zustand";

import type { EventType } from "../../types";

type UseEventsType = {
  events: EventType[];
  setEvents: (events: EventType[]) => void;
  selectedEvent: EventType | null;
  setSelectedEvent: (selectedEvent: EventType | null) => void;
};

export const useEvents = create<UseEventsType>((set) => ({
  events: localStorage.getItem("events")
    ? JSON.parse(localStorage.getItem("events")!)
    : [],
  setEvents: (events) => {
    localStorage.setItem("events", JSON.stringify(events));
    set({ events });
  },
  selectedEvent: null,
  setSelectedEvent: (selectedEvent) => set({ selectedEvent }),
}));
