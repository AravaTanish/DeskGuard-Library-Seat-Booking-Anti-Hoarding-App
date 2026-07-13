import { useEffect } from "react";
import api from "../api/axios.js";
import useAdminStore from "../zustand/AdminStore.js";
import socket from "../socket/socket.js";

const AdminAuthProvider = ({ children }) => {
  const { setEmail, setLoading, setIsLoggedIn } = useAdminStore();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get("/admin/auth/me");
        if (res.data.success) {
          const email = res.data.email;
          setEmail(email);
          setIsLoggedIn(true);
          socket.connect();
          if (socket.connected) {
            socket.emit("join-admin", email);
          } else {
            socket.once("connect", () => {
              socket.emit("join-admin", email);
            });
          }
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
