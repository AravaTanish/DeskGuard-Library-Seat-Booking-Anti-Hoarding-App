import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const adminStore = (set) => ({
    email: "",
    loading: true,
    isLoggedIn: false,
    setEmail: function (email) {
        set({ email: email });
    },
    setLoading: function (loading) {
        set({ loading: loading });
    },
    setIsLoggedIn: function (isLoggedIn) {
        set({ isLoggedIn: isLoggedIn });
    },
});

const useAdminStore = create(
    persist(adminStore, {
        name: "admin-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
    }),
);
export default useAdminStore;
