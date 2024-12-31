import { create } from "zustand";

type UseSelectedDateType = {
  selectedDate: string | null;
  setSelectedDate: (selectedDate: string | null) => void;
};

export const useSelectedDate = create<UseSelectedDateType>((set) => ({
  selectedDate: null,
  setSelectedDate: (selectedDate) => set({ selectedDate }),
}));
