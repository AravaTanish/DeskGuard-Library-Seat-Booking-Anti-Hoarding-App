import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  createSession,
  refresh,
  me,
  completeSession,
  extendSession,
  endSession,
  breakSession,
  endBreak,
} from "../../controllers/client/session.controller.js";

const router = express.Router();

router.post("/:computerId/create-session", createSession);
router.put("/complete", authMiddleware("computer"), completeSession);
router.put("/refresh", refresh);
router.get("/me", authMiddleware("session"), me);
router.post("/extend", authMiddleware("session"), extendSession);
router.post("/end-session", authMiddleware("session"), endSession);
router.post("/break-session", authMiddleware("session"), breakSession)
router.post("/end-break", authMiddleware("session"), endBreak);

export default router;
