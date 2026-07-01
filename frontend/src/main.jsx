import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Index.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
                duration: 3000,
                style: {
                    background: "#2a2f32",
                    color: "#fff",
                },
            }}
        />
    </StrictMode>,
);
