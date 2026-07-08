import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";

import {
  me,
  verifyActivationCode,
  refresh,
} from "../../controllers/client/clientComputer.controller.js";
import { generateAccessToken } from "../../utils/generateTokens.js";

const router = express.Router();

router.post("/verify-activation-code", verifyActivationCode);
router.put("/refresh", refresh);
router.get("/me", authMiddleware("computer"), me);

export default router;
