import { create } from "zustand";

type UseAddEventDialogType = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

export const useAddEventDialog = create<UseAddEventDialogType>((set) => ({
  isVisible: false,
  setIsVisible: (isVisible) => set({ isVisible }),
}));
