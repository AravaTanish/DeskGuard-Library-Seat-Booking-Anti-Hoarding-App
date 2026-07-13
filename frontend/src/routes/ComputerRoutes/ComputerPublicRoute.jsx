import { Navigate } from "react-router-dom";
import LoadingScreen from "../../admin/components/LoadingScreen.jsx";

import useAdminStore from "../../zustand/AdminStore.js";
import useComputerStore from "../../zustand/ComputerStore.js";
import useSessionStore from "../../zustand/SessionStore.js";

const ComputerPublicRoute = ({ children }) => {
  const admin = useAdminStore();
  const computer = useComputerStore();
  const session = useSessionStore();

  if (computer.loading) {
    return <LoadingScreen message="Loading..." />;
  }

  if (session.isLoggedIn) {
    return <Navigate to={`/client/session/${session.session.computerId}`} replace />;
  }

  if (admin.isLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (computer.isLoggedIn) {
    return <Navigate to="/computer/home" replace />;
  }

  return children;
};

export default ComputerPublicRoute;
