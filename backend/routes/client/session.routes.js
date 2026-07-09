import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  createSession,
  refresh,
  me,
} from "../../controllers/client/session.controller.js";

const router = express.Router();

router.post("/:computerId/create-session", createSession);
router.put("/refresh", refresh);
router.get("/me", authMiddleware("session"), me);

export default router;
