import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import App from "../App";
import Login from "../admin/Login";
import Signin from "../admin/Signin";
import UserLogin from "../userlogin";
import Dashboard from "../admin/dashboard";
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

            <Route path="user">
                <Route
                    path="login"
                    element={
                        <PublicRoute>
                            <UserLogin />
                        </PublicRoute>
                    }
                />
            </Route>
        </Route>,
    ),
);

export default router;
