import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import useComputerStore from "../../zustand/ComputerStore.js";
import useSessionStore from "../../zustand/SessionStore.js";
import socket from "../../socket/socket.js";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import computerApi from "../../api/computerAxios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ComputerHomePage() {
  const navigate = useNavigate();
  const { computer } = useComputerStore();
  const { setSession, setIsLoggedIn } = useSessionStore();
  const [code, setCode] = useState(computer.sessionCode);
  const [expiresAt, setExpiresAt] = useState(
    new Date(computer.sessionCodeExpiresAt),
  );
  const [timeLeft, setTimeLeft] = useState(0);
  const percentage = (timeLeft / (5 * 60)) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const qrData = `${import.meta.env.VITE_FRONTEND_URL}/computer/${computer._id}/create-session`;

  useEffect(() => {
    socket.on("session-code-updated", ({ sessionCode, expiresAt }) => {
      setCode(sessionCode);
      setExpiresAt(new Date(expiresAt));
    });

    socket.on("session-created", async () => {
      console.log("session-created received");
      try {
        const res = await computerApi.put("/client/session/complete");
        if (res.data.success) {
          const session = res.data.session;
          setSession(session);
          setIsLoggedIn(true);
          console.log("session =", session);
          console.log("computerId =", session.computerId);
          console.log("url =", `/client/session/${session.computerId}`);
          navigate(`/client/session/${session.computerId}`);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    });

    return () => {
      socket.off("session-code-updated");
      socket.off("session-created");
    };
  }, [navigate, setIsLoggedIn, setSession]);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((expiresAt.getTime() - Date.now()) / 1000),
      );

      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-6xl font-bold text-center text-green-600 mb-10">
          {computer.name}
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* QR */}
          <div className="flex flex-col items-center">
            <div className="bg-white p-5 rounded-2xl border-2 border-green-100 shadow">
              <QRCode value={qrData} size={260} />
            </div>

            <p className="mt-5 text-gray-500 text-sm text-center max-w-xs">
              Scan this QR code using your mobile device.
            </p>
          </div>

          {/* Verification Code */}
          <div className="flex flex-col items-center">
            <p className="text-xl text-gray-500 font-medium">
              Verification Code
            </p>

            <div className="mt-4 bg-green-100 text-green-700 text-6xl font-bold tracking-[14px] px-10 py-5 rounded-2xl shadow">
              {code}
            </div>

            <div className="w-32 h-32 mt-8">
              <CircularProgressbar
                value={percentage}
                text={`${minutes}:${seconds}`}
                styles={buildStyles({
                  pathColor: "#22c55e",
                  trailColor: "#e5e7eb",
                  textColor: "#16a34a",
                  strokeLinecap: "round",
                  textSize: "16px",
                })}
              />
            </div>

            <p className="mt-4 text-gray-500 text-sm">
              Code refreshes automatically
            </p>
          </div>
        </div>

        <div className="mt-12 bg-green-50 border border-green-200 rounded-2xl p-5">
          <p className="text-center text-gray-600">
            Scan the QR code and enter the verification code on your mobile
            device to confirm your presence.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ComputerHomePage;
