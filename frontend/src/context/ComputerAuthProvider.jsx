import { useEffect } from "react";

import computerApi from "../api/computerAxios.js";
import useComputerStore from "../zustand/ComputerStore.js";

const ComputerAuthProvider = ({ children }) => {
  const { setComputerId, setIsLoggedIn, setLoading } = useComputerStore();

  useEffect(() => {
    const fetchComputer = async () => {
      try {
        const res = await computerApi.get("/client/computer/me");

        if (res.data.success) {
          setComputerId(res.data.computerId);
          setIsLoggedIn(true);
        }
      } catch {
        setComputerId(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchComputer();
  }, [setComputerId, setIsLoggedIn, setLoading]);

  return children;
};

export default ComputerAuthProvider;
