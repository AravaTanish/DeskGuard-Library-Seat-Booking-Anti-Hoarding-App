import { create } from "zustand";

const sessionStore = (set) => ({
  session: null,
  isLoggedIn: false,
  loading: true,

  setSession: (session) =>
    set({
      session,
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
      session: null,
      isLoggedIn: false,
    }),
});

const useSessionStore = create(sessionStore);
export default useSessionStore;
