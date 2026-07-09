import { useEffect } from "react";

import sessionApi from "../api/sessionAxios";
import useSessionStore from "../zustand/SessionStore";

const SessionAuthProvider = ({ children }) => {
  const { setSessionId, setIsLoggedIn, setLoading } = useSessionStore();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await sessionApi.get("/client/session/me");

        if (res.data.success) {
          setSessionId(res.data.sessionId);
          setIsLoggedIn(true);
        }
      } catch {
        setSessionId(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [setIsLoggedIn, setLoading, setSessionId]);

  return children;
};

export default SessionAuthProvider;
