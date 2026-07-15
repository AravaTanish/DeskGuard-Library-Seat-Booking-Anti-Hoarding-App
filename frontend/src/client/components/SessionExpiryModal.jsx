import { useEffect, useState } from "react";

function SessionExpiryModal({ open, onExtend, endTime }) {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!open || !endTime) return;

    const updateCountdown = () => {
      const remaining = Math.max(
        0,
        Math.floor((new Date(endTime).getTime() - Date.now()) / 1000),
      );

      setCountdown(remaining);
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [open, endTime]);

  if (!open) return null;

  const minutes = String(Math.floor(countdown / 60)).padStart(2, "0");
  const seconds = String(countdown % 60).padStart(2, "0");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-105 shadow-2xl">
        <h2 className="text-2xl font-bold text-center">Are you still there?</h2>

        <p className="text-center text-gray-500 mt-3">
          Your session will expire soon.
        </p>

        <p className="text-center mt-6 text-4xl font-bold text-red-500">
          {minutes}:{seconds}
        </p>

        <button
          onClick={onExtend}
          className="mt-8 w-full rounded-xl bg-green-600 text-white py-3 font-semibold hover:bg-green-700"
        >
          Yes, Extend Session
        </button>
      </div>
    </div>
  );
}

export default SessionExpiryModal;
