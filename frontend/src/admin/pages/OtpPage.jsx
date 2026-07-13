import { useState } from "react";
import api from "../../api/axios";

export default function OtpPage() {
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/auth/send-otp", { email });

      if (res.data.success) {
        console.log(res.data);
        setShowOtp(true);
      }
    } catch (err) {
      console.log(err.response?.body);
      console.log(err.message);
      throw err;
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
            Email Verification
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your email address.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            console.log("FORM SUBMITTED");
            handleSubmit(e);
          }}
          className="space-y-6"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            OTP
                        </label>

                        <input
                            type="text"
                            maxLength={4}
                            placeholder="Enter 4-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-xl tracking-[0.5em] outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        />
                    </div> */}

          {showOtp && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                OTP
              </label>

              <input
                type="text"
                maxLength={4}
                placeholder="Enter 4-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-xl tracking-[0.5em] outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-green-600 py-3 text-lg font-semibold text-white transition hover:bg-green-700 active:scale-[0.98]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
