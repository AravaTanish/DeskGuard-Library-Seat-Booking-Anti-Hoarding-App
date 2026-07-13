import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const adminStore = (set) => ({
  email: null,
  isLoggedIn: false,
  loading: true,
  library: null,
  computerData: [],
  libraries: [],
  setEmail: function (email) {
    set({ email });
  },
  setIsLoggedIn: function (isLoggedIn) {
    set({ isLoggedIn });
  },
  setLoading: function (loading) {
    set({ loading: loading });
  },
  setLibrary: function (library) {
    set({ library: library });
  },
  setLibraries: function (libraries) {
    set({ libraries: libraries });
  },
  setComputerData: function (computerData) {
    set({ computerData: computerData });
  },
  logout: function () {
    set({
      email: null,
      isLoggedIn: false,
    });
  },
  updateComputerStatus: (computerId, status) =>
    set((state) => ({
      computerData: state.computerData.map((computer) =>
        computer._id === computerId ? { ...computer, status } : computer,
      ),
    })),
});

const useAdminStore = create(
  persist(adminStore, {
    name: "admin-storage",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      library: state.library,
    }),
  }),
);
export default useAdminStore;
