import { useRef, useState } from "react";
import api from "../../api/axios.js"
import toast from "react-hot-toast";

function ComputerActivate() {
  const [code, setCode] = useState(Array(8).fill(""));
  const inputs = useRef([]);
  const activationCode = `AC-${code.slice(0,4).join("")}-${code.slice(4).join("")}`;

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
    try{
        console.log("Activation Code:", activationCode);
        const res = await api.post("/client/computer/verify-activation-code", { code: activationCode });
        if (res.data.success) {
          toast.success("Computer activated successfully!");
        }
    }
    catch(err){
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-center text-5xl font-bold text-black mb-10">
          Activate Computer
        </h1>

        <div className="rounded-3xl border-2 border-black-600  p-10">
          <h2 className="text-center text-3xl font-semibold text-black mb-16">
            Enter Activation Code
          </h2>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-5xl font-semibold text-black-200">AC</span>

            <span className="text-5xl text-gray-400">-</span>

            {code.slice(0, 4).map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="
                  h-16
                  w-16
                  rounded-xl
                  border-2
                  border-gray-500
                  bg-transparent
                  text-center
                  text-2xl
                  font-bold
                  text-black
                  outline-none
                  transition
                  focus:border-green-500
                  focus:ring-2
                  focus:ring-green-500/30
                "
              />
            ))}

            <span className="text-5xl text-gray-400">-</span>

            {code.slice(4).map((digit, index) => (
              <input
                key={index + 4}
                ref={(el) => (inputs.current[index + 4] = el)}
                type="text"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e, index + 4)}
                onKeyDown={(e) => handleKeyDown(e, index + 4)}
                className="
                  h-16
                  w-16
                  rounded-xl
                  border-2
                  border-gray-500
                  bg-transparent
                  text-center
                  text-2xl
                  font-bold
                  text-black
                  outline-none
                  transition
                  focus:border-green-500
                  focus:ring-2
                  focus:ring-green-500/30
                "
              />
            ))}
          </div>

          <button
          onClick={handleClick}
            className="
              mt-14
              w-full
              rounded-xl
              bg-green-600
              py-4
              text-lg
              font-semibold
              text-white
              transition
              hover:bg-green-700
            "
          >
            Activate
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComputerActivate;