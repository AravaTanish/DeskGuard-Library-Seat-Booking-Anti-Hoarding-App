import QRCode from "react-qr-code";
import { useEffect, useState } from "react";

function ComputerHomePage() {
    const [code, setCode] = useState("");
    
    const qrData = "http://localhost:5173/verify/CMP001";

    const generateVerificationCode = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    };

    useEffect(() => {
        const CODE_DURATION = 1 * 60 * 1000; // 1 minute (change to 30 * 60 * 1000 later)

        const loadCode = () => {
            const savedCode = localStorage.getItem("verificationCode");
            const savedTime = localStorage.getItem("verificationCodeTime");

            const now = Date.now();

            if (
                savedCode &&
                savedTime &&
                now - Number(savedTime) < CODE_DURATION
            ) {
                setCode(savedCode);
            } else {
                const newCode = generateVerificationCode();

                setCode(newCode);

                localStorage.setItem("verificationCode", newCode);
                localStorage.setItem("verificationCodeTime", now.toString());
            }
        };

        loadCode();

        const interval = setInterval(() => {
            loadCode();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center text-green-600">
                    Verify Your Presence
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Scan the QR code using the DeskGuard app.
                </p>

                <div className="mt-8 flex justify-center">
                    <div className="bg-white p-4 rounded-xl border">
                        <QRCode value={qrData} size={240} />
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-lg">Verification Code</p>

                    <div className="mt-3 inline-block bg-green-100 text-green-700 text-5xl font-bold tracking-[10px] px-8 py-4 rounded-xl">
                        {code}
                    </div>
                </div>

                <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-center text-sm text-gray-600">
                        Scan the QR code and enter the verification code in the
                        mobile application to confirm your presence.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ComputerHomePage;
