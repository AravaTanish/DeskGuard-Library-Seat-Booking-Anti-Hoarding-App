import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  createLibrary,
  deleteLibraries,
  fetchLibraries,
} from "../../controllers/admin/library.controller.js";

const router = express.Router();

router.get("/fetch", authMiddleware, fetchLibraries);
router.post("/create", authMiddleware, createLibrary);
router.delete("/delete/:libraryId", authMiddleware, deleteLibraries);

export default router;
