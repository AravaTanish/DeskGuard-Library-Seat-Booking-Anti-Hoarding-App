import { useEffect } from "react";
import useAdminStore from "../zustand/AdminStore.js";
import api from "../api/axios.js";

const AuthProvider = ({ children }) => {
    const { email, setEmail, setLoading, isLoggedIn, setIsLoggedIn } =
        useAdminStore();

    useEffect(() => {
        if (!isLoggedIn) {
            setLoading(false);
            return;
        }
        const fetchUser = async () => {
            try {
                const response = await api.get("/admin/auth/me");
                if (response.data.success) {
                    const { email } = response.data;
                    setEmail(email);
                    setIsLoggedIn(true);
                }
            } catch {
                setEmail("");
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return children;
};

export default AuthProvider;
