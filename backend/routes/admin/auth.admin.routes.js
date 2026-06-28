import express from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import {
  login,
  refresh,
  signin,
} from "../../controllers/admin/auth.admin.controller.js";

const router = express.Router();

router.post("/sign-in", authMiddleware, signin);
router.put("/login", authMiddleware, login);
router.put("/refresh", refresh);

export default router;
