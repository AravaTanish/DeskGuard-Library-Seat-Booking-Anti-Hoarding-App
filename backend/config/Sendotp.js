import AppError from "../utils/AppError.js";
import tranEmailApi from "./Brevo.js";

export default async function sendEmailOTP(email, otp) {
    try {
        const sender = {
            email: process.env.EMAIL_USER,
            name: "DeskGuard",
        };

        const htmlContent = `
<div style="
  margin:0;
  padding:40px 20px;
  background:#f4f7fb;
  font-family:Arial,Helvetica,sans-serif;
">

  <div style="
    max-width:600px;
    margin:0 auto;
    background:#ffffff;
    border-radius:12px;
    overflow:hidden;
    box-shadow:0 8px 25px rgba(0,0,0,.08);
  ">

    <!-- Header -->
    <div style="
      background:#16a34a;
      padding:30px;
      text-align:center;
    ">
      <h1 style="
        margin:0;
        color:#ffffff;
        font-size:30px;
        font-weight:700;
      ">
        DeskGuard
      </h1>

      <p style="
        margin-top:8px;
        color:#d1fae5;
        font-size:15px;
      ">
        Library Seat Booking & Anti-Hoarding System
      </p>
    </div>

    <!-- Body -->
    <div style="padding:35px;">

      <h2 style="
        margin-top:0;
        color:#111827;
      ">
        Verify Your Email
      </h2>

      <p style="
        color:#4b5563;
        line-height:1.7;
        font-size:15px;
      ">
        Hello,
      </p>

      <p style="
        color:#4b5563;
        line-height:1.7;
        font-size:15px;
      ">
        Thank you for using <strong>DeskGuard</strong>.
        Please use the following One-Time Password (OTP) to verify your email address.
      </p>

      <div style="
        text-align:center;
        margin:35px 0;
      ">

        <div style="
          display:inline-block;
          background:#dcfce7;
          color:#15803d;
          padding:18px 38px;
          border-radius:10px;
          font-size:34px;
          font-weight:bold;
          letter-spacing:8px;
        ">
          ${otp}
        </div>

      </div>

      <p style="
        color:#374151;
        font-size:15px;
        margin-bottom:8px;
      ">
        This OTP is valid for <strong>10 minutes</strong>.
      </p>

      <p style="
        color:#6b7280;
        font-size:14px;
        line-height:1.6;
      ">
        If you did not request this verification code, you can safely ignore this email. Your account will remain secure.
      </p>

      <hr style="
        margin:30px 0;
        border:none;
        border-top:1px solid #e5e7eb;
      ">

      <p style="
        color:#6b7280;
        font-size:13px;
        margin-bottom:5px;
      ">
        Need help?
      </p>

      <p style="
        color:#111827;
        font-size:14px;
        margin-top:0;
      ">
        Contact the DeskGuard Administrator.
      </p>

    </div>

    <!-- Footer -->
    <div style="
      background:#f9fafb;
      padding:20px;
      text-align:center;
      border-top:1px solid #e5e7eb;
    ">

      <p style="
        margin:0;
        color:#6b7280;
        font-size:13px;
      ">
        © ${new Date().getFullYear()} DeskGuard
      </p>

      <p style="
        margin-top:6px;
        color:#9ca3af;
        font-size:12px;
      ">
        Smart Library Seat Booking & Anti-Hoarding Platform
      </p>

    </div>

  </div>

</div>
`;

        await tranEmailApi.sendTransacEmail({
            sender,
            to: [{ email }],
            subject: "Your DeskGuard verification code",
            htmlContent,
        });

        console.log(`DeskGuard OTP sent to ${email}`);
    } catch (err) {
        console.error("Email OTP error:", err);
        throw new AppError("OTP email failed", 500);
    }
}
