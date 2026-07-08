import express from "express";
import {
  createSession,
  refresh,
} from "../../controllers/client/session.controller.js";

const router = express.Router();

router.post("/:computerId/create-session", createSession);
router.put("/refresh", refresh);

export default router;
