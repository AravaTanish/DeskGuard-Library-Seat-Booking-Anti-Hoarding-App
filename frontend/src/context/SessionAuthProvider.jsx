import { useEffect } from "react";

import sessionApi from "../api/sessionAxios";
import useSessionStore from "../zustand/SessionStore";

const SessionAuthProvider = ({ children }) => {
  const { setSession, setIsLoggedIn, setLoading } = useSessionStore();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await sessionApi.get("/client/session/me");

        if (res.data.success) {
          setSession(res.data.session);
          setIsLoggedIn(true);
        }
      } catch {
        setSession(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [setIsLoggedIn, setLoading, setSession]);

  return children;
};

export default SessionAuthProvider;
