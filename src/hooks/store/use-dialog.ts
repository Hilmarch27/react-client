/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// Define the type for payloads dynamically
interface DialogState<TPayload = any> {
  isOpen: boolean;
  dialogType?: string; // Optional dialogType
  payload?: TPayload | null; // Optional payload
  openDialog: (payload?: TPayload, type?: string) => void; // Adjust method signature
  closeDialog: () => void;
}

// Create a generic store to handle any payload type
const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  dialogType: undefined, // Initialize as undefined
  payload: null,
  openDialog: (payload?: any | string, type?: string) => {
    set({ isOpen: true, dialogType: type, payload });
  },
  closeDialog: () =>
    set({ isOpen: false, dialogType: undefined, payload: null }),
}));

export default useDialogStore;
