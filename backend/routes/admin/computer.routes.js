import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  addComputer,
  deleteComputer,
  fetchComputers,
  getActivationCode,
} from "../../controllers/admin/computer.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/fetch", authMiddleware, fetchComputers);
router.post("/add", authMiddleware, addComputer);
router.delete("/delete/:computerId", authMiddleware, deleteComputer);
router.put("/get-activation-code", authMiddleware, getActivationCode);

export default router;
