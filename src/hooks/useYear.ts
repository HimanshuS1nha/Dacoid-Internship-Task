import { create } from "zustand";

type UseYearType = {
  year: number;
  setYear: (year: number) => void;
};

export const useYear = create<UseYearType>((set) => ({
  year: new Date().getFullYear(),
  setYear: (year) => set({ year }),
}));
