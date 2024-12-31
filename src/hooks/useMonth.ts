import { create } from "zustand";

type UseMonthType = {
  month: number;
  setMonth: (month: number) => void;
};

export const useMonth = create<UseMonthType>((set) => ({
  month: new Date().getMonth(),
  setMonth: (month) => set({ month }),
}));
