import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  addComputer,
  deleteComputer,
  fetchComputers,
  getActivationCode,
} from "../../controllers/admin/computer.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/fetch", authMiddleware("admin"), fetchComputers);
router.post("/add", authMiddleware("admin"), addComputer);
router.delete("/delete/:computerId", authMiddleware("admin"), deleteComputer);
router.put("/get-activation-code", authMiddleware("admin"), getActivationCode);


export default router;
