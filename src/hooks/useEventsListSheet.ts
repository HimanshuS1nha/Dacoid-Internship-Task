import { create } from "zustand";

type UseEventsListSheetType = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

export const useEventsListSheet = create<UseEventsListSheetType>((set) => ({
  isVisible: false,
  setIsVisible: (isVisible) => set({ isVisible }),
}));
