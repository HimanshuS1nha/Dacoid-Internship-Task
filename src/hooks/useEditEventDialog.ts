import { create } from "zustand";

type UseEditEventDialogType = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

export const useEditEventDialog = create<UseEditEventDialogType>((set) => ({
  isVisible: false,
  setIsVisible: (isVisible) => set({ isVisible }),
}));
