import { create } from "zustand";

const sessionStore = (set) => ({
  sessionId: null,
  isLoggedIn: false,
  loading: true,

  setSessionId: (sessionId) =>
    set({
      sessionId,
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
