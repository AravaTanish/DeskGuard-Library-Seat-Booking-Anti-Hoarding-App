import { useEffect } from "react";

import computerApi from "../api/computerAxios.js";
import useComputerStore from "../zustand/ComputerStore.js";

const ComputerAuthProvider = ({ children }) => {
  const { setComputer, setIsLoggedIn, setLoading } = useComputerStore();

  useEffect(() => {
    const fetchComputer = async () => {
      try {
        const res = await computerApi.get("/client/computer/me");

        if (res.data.success) {
          setComputer(res.data.computer);
          setIsLoggedIn(true);
        }
      } catch {
        setComputer(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchComputer();
  }, [setComputer, setIsLoggedIn, setLoading]);

  return children;
};

export default ComputerAuthProvider;
