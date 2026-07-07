import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";

import { verifyActivationCode } from "../../controllers/client/clientComputer.controller.js";
import { generateAccessToken } from "../../utils/generateTokens.js";
import { refresh } from "../../controllers/client/clientComputer.controller.js";

const router = express.Router();

router.post("/verify-activation-code", verifyActivationCode);
router.put("/refresh", authMiddleware("computer"), refresh);

export default router;
