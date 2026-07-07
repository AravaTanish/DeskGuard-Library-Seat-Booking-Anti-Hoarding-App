import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  login,
  refresh,
  signin,
  me,
} from "../../controllers/admin/auth.admin.controller.js";

const router = express.Router();

router.post("/sign-in", signin);
router.put("/login", login);
router.put("/refresh", refresh);
router.get("/me", authMiddleware("admin"), me);

export default router;
