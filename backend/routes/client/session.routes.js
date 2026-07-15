import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  createSession,
  refresh,
  me,
  completeSession,
  extendSession,
} from "../../controllers/client/session.controller.js";

const router = express.Router();

router.post("/:computerId/create-session", createSession);
router.put("/complete", authMiddleware("computer"), completeSession);
router.put("/refresh", refresh);
router.get("/me", authMiddleware("session"), me);
router.post("/extend", authMiddleware("session"), extendSession);

export default router;
