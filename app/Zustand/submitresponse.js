import { create } from "zustand";

const useSubmissionStore = create((set) => ({
  submit: null, // Initial response state
  loadingsubmit: false, // Track loading state

  // Action to set the response
  setSubmit: (data) => set({ submit: data }),

  // Action to set loading state
  setLoadingsubmit: (isLoading) => set({ loadingsubmit: isLoading }),
}));

export default useSubmissionStore;
