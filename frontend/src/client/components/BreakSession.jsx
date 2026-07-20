import { useEffect, useState } from "react";
import { Coffee } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import useSessionStore from "../../zustand/SessionStore";
import sessionApi from "../../api/sessionAxios";
import toast from "react-hot-toast";
import "react-circular-progressbar/dist/styles.css";

export default function BreakSession() {
    const BREAK_TIME = 20 * 60;

    const { session, setSession } = useSessionStore();

    const [timeLeft, setTimeLeft] = useState(BREAK_TIME);

    const endBreak = async () => {
        try {
            const res = await sessionApi.post("/client/session/end-break");

            if (res.data.success) {
                setSession(res.data.session);
                toast.success(res.data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Unable to end break");
        }
    };

    useEffect(() => {
        if (!session?.breakStartTime) return;

        let ended = false;

        const interval = setInterval(() => {
            const start = new Date(session.breakStartTime).getTime();

            const elapsed = Math.floor((Date.now() - start) / 1000);

            const remaining = Math.max(0, BREAK_TIME - elapsed);

            setTimeLeft(remaining);

            if (remaining <= 0 && !ended) {
                ended = true;
                clearInterval(interval);
                endBreak();
            }
        }, 1000);

        // Run once immediately so the timer updates without waiting 1 second
        const start = new Date(session.breakStartTime).getTime();
        const elapsed = Math.floor((Date.now() - start) / 1000);
        const remaining = Math.max(0, BREAK_TIME - elapsed);
        setTimeLeft(remaining);

        if (remaining <= 0 && !ended) {
            ended = true;
            clearInterval(interval);
            endBreak();
        }

        return () => clearInterval(interval);
    }, [session]);

    const percentage = (timeLeft / BREAK_TIME) * 100;

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");

    return (
        <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Coffee className="w-10 h-10 text-yellow-600" />
                    </div>

                    <h1 className="mt-4 text-3xl font-bold text-yellow-600">
                        Break Time
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Enjoy your 20 minute break.
                    </p>

                    <div className="w-48 h-48 mt-8">
                        <CircularProgressbar
                            value={percentage}
                            text={`${minutes}:${seconds}`}
                            styles={buildStyles({
                                pathColor: "#f59e0b",
                                trailColor: "#e5e7eb",
                                textColor: "#d97706",
                                strokeLinecap: "round",
                                textSize: "14px",
                            })}
                        />
                    </div>

                    <button
                        onClick={endBreak}
                        className="mt-10 w-full rounded-xl bg-red-500 py-3 text-lg font-semibold text-white hover:bg-red-600"
                    >
                        End Break
                    </button>
                </div>
            </div>
        </div>
    );
}
