import { Button, Card, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios.js";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await api.post("/admin/auth/sign-in", {
        email,
        password,
      });
      if (response.status === 200) {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error occurred while signing in:", error);
      toast.error(
        error.response?.data?.message || "signin failed. Please try again.",
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <Card className="w-full max-w-md rounded-2xl border border-gray-200 shadow-xl p-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
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
            onClick={handleSubmit}
            className="mt-2 rounded-lg bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium text-white text-center width-full h-10"
          >
            Sign In
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              className="font-semibold text-blue-600 hover:underline"
            >
              <Link
                to="/admin/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Login
              </Link>
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Signin;
