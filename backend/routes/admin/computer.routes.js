import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  addComputer,
  deleteComputer,
  fetchComputers,
} from "../../controllers/admin/computer.controller.js";

const router = express.Router();

router.get("/fetch", authMiddleware, fetchComputers);
router.post("/add", authMiddleware, addComputer);
router.delete("/delete/:computerId", authMiddleware, deleteComputer);

export default router;
