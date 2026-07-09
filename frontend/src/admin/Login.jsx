import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios.js";
import useAdminStore from "../zustand/AdminStore.js";

function Login() {
    const { email, setEmail, setIsLoggedIn, setLoading } = useAdminStore();
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            const response = await api.put("/admin/auth/login", {
                email,
                password,
            });

            if (response.data.success) {
                console.log("Login successful:", response.data);
                toast.success("Login successful!");
                setIsLoggedIn(true);
                navigate("/admin/dashboard");
            }
        } catch (error) {
            console.error("Login failed:", error);
            toast.error(
                error.response?.data?.message ||
                    "Login failed. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className="w-full max-w-md rounded-2xl border border-gray-200 shadow-xl p-4"
            >
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                </div>

                <div className="flex flex-col gap-5">
                    <div>
                        <Label
                            htmlFor="email1"
                            value="Email Address"
                            className="mb-2 text-gray-700 font-medium"
                        />

                        <TextInput
                            id="email1"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            sizing="lg"
                            required
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="password1"
                            value="Password"
                            className="mb-2 text-gray-700 font-medium"
                        />

                        <TextInput
                            id="password1"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            sizing="lg"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <a
                            href="#"
                            className="text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    <Button
                        size="lg"
                        type="submit"
                        // onClick={handleSubmit}
                        className="h-10 mt-2 rounded-lg bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium text-white text-center width-full"
                    >
                        Login
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            <Link
                                to="/admin/signin"
                                className="font-semibold text-blue-600 hover:underline"
                            >
                                Create Account
                            </Link>
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
}
export default Login;
