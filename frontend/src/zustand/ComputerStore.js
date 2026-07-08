import { create } from "zustand";

const computerStore = (set) => ({
  computerId: null,
  isLoggedIn: false,
  loading: true,

  setComputerId: (computerId) =>
    set({
      computerId,
    }),

  setIsLoggedIn: (value) =>
    set({
      isLoggedIn: value,
    }),

  setLoading: (value) =>
    set({
      loading: value,
    }),

  logout: () =>
    set({
      computerId: null,
      isLoggedIn: false,
    }),
});

const useComputerStore = create(computerStore);
export default useComputerStore;
