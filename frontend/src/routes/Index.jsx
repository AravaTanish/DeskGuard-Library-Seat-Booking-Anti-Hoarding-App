import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import App from "../App.jsx";
import Login from "../admin/Login.jsx";
import Signin from "../admin/Signin.jsx";
import Dashboard from "../admin/Dashboard.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";
import Computer from "../admin/Computer.jsx";
import StudentLogin from "../client/pages/StudentLogin.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="admin">
                <Route
                    path="login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="signin"
                    element={
                        <PublicRoute>
                            <Signin />
                        </PublicRoute>
                    }
                />
                <Route
                    path="dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="computer"
                    element={
                        <PrivateRoute>
                            <Computer />
                        </PrivateRoute>
                    }
                />
            </Route>
            <Route path="computer">
                    <Route path="create-session" element={
                        <PublicRoute>
                            <StudentLogin />
                        </PublicRoute>
                    }/>
            </Route>
        </Route>,
    ),
);

export default router;
