import { useEffect } from "react";
import api from "../api/axios.js";
import useAdminStore from "../zustand/AdminStore.js";

const AdminAuthProvider = ({ children }) => {
  const { setEmail, setLoading, setIsLoggedIn } = useAdminStore();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get("/admin/auth/me");
        if (res.data.success) {
          setEmail(res.data.email);
          setIsLoggedIn(true);
        }
      } catch {
        setEmail(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [setEmail, setLoading, setIsLoggedIn]);

  return children;
};

export default AdminAuthProvider;
