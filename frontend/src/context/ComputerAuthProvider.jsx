import { useEffect } from "react";

import socket from "../socket/socket.js";
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
          const computerId = res.data.computer._id;
          console.log(res.data.computer);
          // Connect socket
          socket.connect();
          if (socket.connected) {
            socket.emit("join-computer", computerId);
          } else {
            socket.once("connect", () => {
              socket.emit("join-computer", computerId);
            });
          }
        }
      } catch {
        setComputer(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchComputer();
    return () => {
      socket.disconnect();
    };
  }, [setComputer, setIsLoggedIn, setLoading]);

  return children;
};

export default ComputerAuthProvider;
