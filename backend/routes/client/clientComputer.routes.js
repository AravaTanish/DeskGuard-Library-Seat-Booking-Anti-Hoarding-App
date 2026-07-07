import express from "express";

import { verifyActivationCode } from "../../controllers/client/clientComputer.controller.js";

const router = express.Router();

router.post("/verify-activation-code", verifyActivationCode);

export default router;
