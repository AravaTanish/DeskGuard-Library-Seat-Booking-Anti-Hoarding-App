import { X } from "lucide-react";

function ActivationCode({ code, onClose }) {
  return (
    <div className="relative w-full max-w-md rounded-xl bg-white p-6 ">
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
      >
        <X size={22} />
      </button>

      <h2 className="mb-2 text-center text-2xl font-semibold">
        Activation Code
      </h2>

      <p className="mb-6 text-center text-sm text-gray-500">
        Share this code to activate the computer.
      </p>

      <div className="rounded-md border border-gray-300 bg-gray-50 px-4 py-5">
        <p className="text-center text-3xl font-bold tracking-[0.3em] text-blue-600">
          {code}
        </p>
      </div>
    </div>
  );
}

export default ActivationCode;
