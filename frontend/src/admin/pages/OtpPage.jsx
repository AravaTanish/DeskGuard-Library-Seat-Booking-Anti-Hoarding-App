import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAdminStore from "../../zustand/AdminStore";

export default function OtpPage() {
    const navigate = useNavigate();
    const { email, setEmail } = useAdminStore();

    const [step, setStep] = useState(1);

    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (step === 1) {
                const res = await api.post("/admin/auth/send-otp", {
                    email,
                });

                if (res.data.success) {
                    toast.success("OTP sent successfully");
                    setStep(2);
                }
            }

            else if (step === 2) {
                const res = await api.post("/admin/auth/verify-otp", {
                    email,
                    otp,
                });

                if (res.data.success) {
                    toast.success("OTP verified successfully");
                    setStep(3);
                }
            }

            else if (step === 3) {

                if (password !== confirmPassword) {
                    return toast.error("Passwords do not match");
                }

                const res = await api.put("/admin/auth/reset-pass", {
                    email,
                    password,
                });

                if (res.data.success) {
                    toast.success("Password changed successfully");
                    navigate("/admin/login");
                }
            }
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Something went wrong"
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-green-50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16 12H8m8-4H8m8 8H8m13-9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V9z"
                            />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        {step === 1 && "Forgot Password"}
                        {step === 2 && "Verify OTP"}
                        {step === 3 && "Reset Password"}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {step === 1 &&
                            "Enter your registered email address."}

                        {step === 2 &&
                            "Enter the OTP sent to your email."}

                        {step === 3 &&
                            "Create a new password."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {step === 1 && (
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                required
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    readOnly
                                    className="pointer-events-none w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    OTP
                                </label>

                                <input
                                    type="text"
                                    maxLength={4}
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) =>
                                        setOtp(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-xl tracking-[0.5em] outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={
                            (step === 1 && !email) ||
                            (step === 2 && otp.length !== 4) ||
                            (step === 3 &&
                                (!password ||
                                    password !== confirmPassword))
                        }
                        className={`w-full rounded-xl py-3 text-lg font-semibold text-white transition ${
                            (step === 1 && !email) ||
                            (step === 2 && otp.length !== 4) ||
                            (step === 3 &&
                                (!password ||
                                    password !== confirmPassword))
                                ? "cursor-not-allowed bg-green-300"
                                : "cursor-pointer bg-green-600 hover:bg-green-700"
                        }`}
                    >
                        {step === 1 && "Send OTP"}
                        {step === 2 && "Verify OTP"}
                        {step === 3 && "Reset Password"}
                    </button>

                </form>
            </div>
        </div>
    );
}