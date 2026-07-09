import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App.jsx";

import AdminPrivateRoute from "./AdminRoutes/AdminPrivateRoute.jsx";
import AdminPublicRoute from "./AdminRoutes/AdminPublicRoute.jsx";

import ComputerPrivateRoute from "./ComputerRoutes/ComputerPrivateRoute.jsx";
import ComputerPublicRoute from "./ComputerRoutes/ComputerPublicRoute.jsx";

import SessionPrivateRoute from "./SessionRoutes/SessionPrivateRoute.jsx";

import Login from "../admin/Login.jsx";
import Signin from "../admin/Signin.jsx";
import Dashboard from "../admin/Dashboard.jsx";
import Computer from "../admin/Computer.jsx";

import StudentLogin from "../client/pages/StudentLogin.jsx";
import ComputerActivate from "../client/pages/ComputerActivate.jsx";
import ComputerHomePage from "../client/pages/ComputerHomePage.jsx";

import Session from "../client/pages/Session.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* ================= ADMIN ================= */}

      <Route path="admin">
        <Route
          path="login"
          element={
            <AdminPublicRoute>
              <Login />
            </AdminPublicRoute>
          }
        />

        <Route
          path="signin"
          element={
            <AdminPublicRoute>
              <Signin />
            </AdminPublicRoute>
          }
        />

        <Route
          path="dashboard"
          element={
            <AdminPrivateRoute>
              <Dashboard />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="computer"
          element={
            <AdminPrivateRoute>
              <Computer />
            </AdminPrivateRoute>
          }
        />
      </Route>

      {/* ================= COMPUTER ================= */}

      <Route path="computer">
        <Route
          path="activate"
          element={
            <ComputerPublicRoute>
              <ComputerActivate />
            </ComputerPublicRoute>
          }
        />

        <Route
          path="home"
          element={
            <ComputerPrivateRoute>
              <ComputerHomePage />
            </ComputerPrivateRoute>
          }
        />

        <Route
          path=":computerId/create-session"
          element={
            <ComputerPrivateRoute>
              <StudentLogin />
            </ComputerPrivateRoute>
          }
        />
      </Route>

      {/* ================= SESSION ================= */}

      <Route path="client">
        <Route
          path="session/:computerId"
          element={
            <SessionPrivateRoute>
              <Session />
            </SessionPrivateRoute>
          }
        />
      </Route>
    </Route>,
  ),
);

export default router;
