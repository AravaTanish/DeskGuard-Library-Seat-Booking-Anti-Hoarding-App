import { useState, useRef } from "react";

export default function StudentLogin() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const isFormValid =
    name.trim() !== "" &&
    roll.trim() !== "" &&
    code.every((digit) => digit !== "");

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl border border-green-100 p-6">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
          Student Login
        </h1>

        <form className="space-y-5">
          {/* Name */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Name"
            className="w-full h-14 rounded-xl border-2 border-gray-200 px-4 text-base outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
          />

          {/* Roll Number */}
          <input
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            type="text"
            placeholder="Enter Roll No"
            className="w-full h-14 rounded-xl border-2 border-gray-200 px-4 text-base outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
          />

          {/* Code */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Enter Code
            </h2>

            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="h-16 w-16 rounded-xl border-2 border-gray-200 text-center text-2xl font-bold outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full h-14 rounded-xl text-lg font-semibold shadow-lg transition-all ${
              isFormValid
                ? "bg-green-600 text-white hover:bg-green-700 active:scale-95"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Start Session
          </button>
        </form>
      </div>
    </div>
  );
}
