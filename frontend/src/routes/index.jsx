import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import App from "../App";
import Login from "../admin/Login";
import Signin from "../admin/Signin";
import UserLogin from "../userlogin";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="admin">
                <Route path="login" element={<Login />} />
                <Route path="signin" element={<Signin />} />
            </Route>

            <Route path="user">
                <Route path="login" element={<UserLogin />} />
            </Route>
        </Route>
    )
);

export default router;