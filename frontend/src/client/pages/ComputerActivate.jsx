import { Monitor } from "lucide-react";
import { useRef, useState } from "react";
import api from "../../api/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useComputerStore from "../../zustand/ComputerStore.js";

function ComputerActivate() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useComputerStore();
  const [code, setCode] = useState(Array(8).fill(""));
  const inputs = useRef([]);
  const activationCode = `AC-${code.slice(0, 4).join("")}-${code.slice(4).join("")}`;

  const handleChange = (e, index) => {
    const value = e.target.value.toUpperCase();

    // Allow only letters and numbers
    if (!/^[A-Z0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input
    if (value && index < 7) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move back on backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };
  const handleClick = async () => {
    try {
      const res = await api.post("/client/computer/verify-activation-code", {
        code: activationCode,
      });
      if (res.data.success) {
        toast.success("Computer activated successfully!");
        setIsLoggedIn(true);

        navigate("/computer/home");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const isFormValid = code.every((digit) => digit !== "");

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-10">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-5xl text-green-600">
              <Monitor size={50} />
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-4xl font-bold text-center text-green-600">
          Activate Computer
        </h1>

        <p className="mt-3 text-center text-gray-500">
          Enter the activation code provided by the administrator.
        </p>

        {/* Code */}
        <div className="mt-12 flex items-center justify-center gap-3 flex-wrap">
          <div className="px-5 py-4 rounded-xl bg-green-100 text-green-700 font-bold text-2xl">
            AC
          </div>

          <span className="text-3xl text-gray-400">-</span>

          {code.slice(0, 4).map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-16 h-16 rounded-xl border-2 border-gray-300 text-center text-2xl font-bold uppercase focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
            />
          ))}

          <span className="text-3xl text-gray-400">-</span>

          {code.slice(4).map((digit, index) => (
            <input
              key={index + 4}
              ref={(el) => (inputs.current[index + 4] = el)}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e, index + 4)}
              onKeyDown={(e) => handleKeyDown(e, index + 4)}
              className="w-16 h-16 rounded-xl border-2 border-gray-300 text-center text-2xl font-bold uppercase focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
            />
          ))}
        </div>

        {/* Preview */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Activation Code</p>

          <p className="mt-2 text-2xl font-semibold tracking-widest text-gray-700">
            {activationCode}
          </p>
        </div>

        {/* Button */}
        <button
          disabled={!isFormValid}
          onClick={handleClick}
          className={`mt-12 w-full rounded-2xl py-4 text-lg font-semibold transition
            ${
              isFormValid
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Activate Computer
        </button>
      </div>
    </div>
  );
}

export default ComputerActivate;
