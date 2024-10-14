import { create } from "zustand";

type SolutionDialogStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSolutionDialogStore = create<SolutionDialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
