import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  addComputer,
  deleteComputer,
  fetchComputers,
  getAvtivationCode,
} from "../../controllers/admin/computer.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/fetch", authMiddleware, fetchComputers);
router.post("/add", authMiddleware, addComputer);
router.delete("/delete/:computerId", authMiddleware, deleteComputer);
router.put("/get-activation-code", authMiddleware, getAvtivationCode);

export default router;
