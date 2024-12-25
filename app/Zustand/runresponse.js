import { create } from "zustand";

const useResponseStore = create((set) => ({
  response: null, // Initial response state
  loading: false, // Track loading state

  // Action to set the response
  setResponse: (data) => set({ response: data }),

  // Action to set loading state
  setLoading: (isLoading) => set({ loading: isLoading }),
}));

export default useResponseStore;
