import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  login,
  refresh,
  signin,
  me,
  logout,
  sendOtp,
  verifyotp,
  resetpassword
} from "../../controllers/admin/auth.admin.controller.js";

const router = express.Router();

router.post("/sign-in", signin);
router.put("/login", login);
router.put("/refresh", refresh);
router.get("/me", authMiddleware("admin"), me);
router.get("/logout", authMiddleware("admin"), logout);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyotp);
router.put("/reset-pass", resetpassword)

export default router;
