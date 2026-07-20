import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Monitor, Clock3, Coffee, Square } from "lucide-react";
import Loading from "../../admin/components/LoadingScreen.jsx";
import SessionExpiryModal from "../components/SessionExpiryModal.jsx";
import socket from "../../socket/socket.js";
import { useNavigate } from "react-router-dom";
import sessionApi from "../../api/sessionAxios.js";
import BreakSession from "../components/BreakSession.jsx";

import useComputerStore from "../../zustand/ComputerStore.js";
import useSessionStore from "../../zustand/SessionStore.js";
import toast from "react-hot-toast";

export default function Session() {
  const { computer } = useComputerStore();
  const { session, setSession, setIsLoggedIn } = useSessionStore();

  const navigate = useNavigate();

  const [warningEndTime, setWarningEndTime] = useState(session.endTime);
  const [showExpiryModal, setShowExpiryModal] = useState(
    () =>
      session.endTime &&
      new Date(session.endTime) - new Date(Date.now()) < 2 * 60 * 1000,
  );
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    socket.on("session-expiring", ({ endTime }) => {
      setWarningEndTime(endTime);
      setShowExpiryModal(true);
    });

    socket.on("session-expired", async () => {
      await sessionApi.get("/client/session/logout");
      setShowExpiryModal(false);
      setIsLoggedIn(false);
      setSession(null);
      navigate("/computer/home");
    });

    return () => {
      socket.off("session-expiring");
      socket.off("session-expired");
    };
  }, [navigate, session, setSession, setIsLoggedIn]);

  useEffect(() => {
    if (!session?.endTime) return;

    const updateTimer = () => {
      const endTime = new Date(session.endTime).getTime();
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);
    };
    updateTimer();

    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [session?.endTime]);

  const handleExtend = async () => {
    try {
      const res = await sessionApi.post("/client/session/extend");
      if (res.data.success) {
        const extendedSession = res.data.session;
        setSession(extendedSession);
        setShowExpiryModal(false);
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!computer || !session) {
    return <Loading />;
  }

  const totalDuration =
    (new Date(session.endTime).getTime() -
      new Date(session.startTime).getTime()) /
    1000;

  const percentage = (timeLeft / totalDuration) * 100;

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const formattedStartTime = new Date(session.startTime)
    .toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .toUpperCase();

  const handleSession = async () => {
    try {
      const res = await sessionApi.post("/client/session/end-session");
      if (res.data.success) {
        setIsLoggedIn(false);
        setSession(null);
        navigate("/computer/home");
      }
    } catch (err) {
      console.log(err.data.message);
    }
  };
  const handleBreak = async () => {
    try {
      const res = await sessionApi.post("/client/session/break-session");
      if (res.data.success) {
        setSession(res.data.session);
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to start break");
    }
  };
  if (session?.isOnBreak) {
    return <BreakSession />;
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-6">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <Monitor className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="mt-3 text-4xl font-bold text-green-600">
            {computer?.name}
          </h1>

          <div className="mt-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
            Session Active
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center">
            <div className="w-44 h-44">
              <CircularProgressbar
                value={percentage}
                text={`${hours}:${minutes}:${seconds}`}
                styles={buildStyles({
                  pathColor: "#22c55e",
                  trailColor: "#e5e7eb",
                  textColor: "#16a34a",
                  strokeLinecap: "round",
                  textSize: "12px",
                })}
              />
            </div>

            <p className="mt-4 text-base font-semibold text-gray-600">
              Time Remaining
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-green-50 rounded-2xl border border-green-200 p-4">
              <Monitor className="w-7 h-7 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Computer</p>
                <p className="text-lg font-semibold">{computer?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-green-50 rounded-2xl border border-green-200 p-4">
              <Clock3 className="w-7 h-7 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Session Started</p>
                <p className="text-lg font-semibold">{formattedStartTime}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={handleBreak}
            className="flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 py-3 text-lg font-semibold text-gray-900 transition hover:bg-yellow-500"
          >
            <Coffee className="w-5 h-5" />
            Take a Break
          </button>

          <button
            onClick={handleSession}
            className="flex items-center justify-center gap-2 rounded-2xl bg-red-500 py-3 text-lg font-semibold text-white transition hover:bg-red-600"
          >
            <Square className="w-5 h-5" />
            End Session
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-green-50 border border-green-200 p-4">
          <p className="text-center text-gray-600 text-sm">
            Your session is currently active. Please remember to end your
            session before leaving the computer.
          </p>
        </div>
      </div>
      <SessionExpiryModal
        open={showExpiryModal}
        onExtend={handleExtend}
        endTime={warningEndTime}
      />
    </div>
  );
}
