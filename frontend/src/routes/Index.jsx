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
            </Route>
        </Route>,
    ),
);

export default router;
