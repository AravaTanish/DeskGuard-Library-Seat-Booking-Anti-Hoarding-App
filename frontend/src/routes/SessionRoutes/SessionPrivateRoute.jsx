import { Navigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen.jsx";

import useAdminStore from "../../zustand/AdminStore.js";
import useSessionStore from "../../zustand/SessionStore.js";

const SessionPrivateRoute = ({ children }) => {
  const admin = useAdminStore();
  const session = useSessionStore();

  if (session.loading) {
    return <LoadingScreen message="Loading..." />;
  }

  // Admin cannot access session
  if (admin.isLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Session OR Computer can access
  if (session.isLoggedIn) {
    return children;
  }

  return <Navigate to="/computer/home" replace />;
};

export default SessionPrivateRoute;
