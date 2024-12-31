import { create } from "zustand";

const useResultStore = create((set) => ({
  // Initial state for storing IDs
  Result: [],

  // Action to add a new ID to the array
  addId: (id) =>
    set((state) => ({
      Result: state.Result.includes(id) ? state.Result : [...state.Result, id],
    })),

  // Action to remove an ID from the array
  removeId: (id) =>
    set((state) => ({
      Result: state.Result.filter((existingId) => existingId !== id),
    })),

  // Action to clear all IDs
  clearResults: () => set({ Result: [] }),

  // Function to check if an ID is in the array
  hasId: (id) => {
    const { Result } = useResultStore.getState();
    return Result.includes(id);
  },
}));

export default useResultStore;
