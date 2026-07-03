import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const adminStore = (set) => ({
    email: "",
    loading: true,
    isLoggedIn: false,
    library: null,
    computerData: [],
    libraries: [],
    setEmail: function (email) {
        set({ email: email });
    },
    setLoading: function (loading) {
        set({ loading: loading });
    },
    setIsLoggedIn: function (isLoggedIn) {
        set({ isLoggedIn: isLoggedIn });
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
});

const useAdminStore = create(
    persist(adminStore, {
        name: "admin-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
            isLoggedIn: state.isLoggedIn,
            library: state.library,
        }),
    }),
);
export default useAdminStore;
