import { create } from "zustand";

const useAistore = create((set) => ({
  Airesponse: null, // Initial response state
  Ailoading: false, // Track loading state

  // Action to set the response
  setAi: (data) => set({ response: data }),

  // Action to set loading state
  setAiLoading: (isLoading) => set({ loading: isLoading }),
}));

export default useAistore;
