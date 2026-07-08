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
import ComputerActivate from "../client/pages/ComputerActivate.jsx";
import Session from "../client/pages/Session.jsx";

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
            <Route path="computer">
                <Route
                    path="activate"
                    element={
                        <PublicRoute>
                            <ComputerActivate />
                        </PublicRoute>
                    }
                />
            </Route>
            <Route path="computer">
                <Route path=":computerId">
                    <Route 
                        path="create-session" 
                        element={
                        <PublicRoute>
                            <StudentLogin />
                        </PublicRoute>
                    }/>
                </Route>
            </Route>
            <Route path="client">
                <Route path="session">
                    <Route 
                        path=":computerId" 
                        element={
                        <PublicRoute>
                            <Session />
                        </PublicRoute>
                    }/>
                </Route>
            </Route>
        </Route>,
    ),
);

export default router;
