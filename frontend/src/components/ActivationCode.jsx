import { X } from "lucide-react";

function ActivationCode({ code, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
        >
          <X size={22} />
        </button>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Activation Code
        </h2>

        <p className="mt-2 text-center text-sm text-gray-500">
          Share this code to activate the computer.
        </p>

        {/* Code Box */}
        <div className="mt-6 rounded-xl border-2 border-dashed border-blue-400 bg-blue-50 p-5">
          <p className="text-center text-3xl font-bold tracking-[0.4em] text-blue-700">
            {code}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ActivationCode;