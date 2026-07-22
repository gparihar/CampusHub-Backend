import express from "express";
import {
  getAllStudents,
  getStudentById,
  deleteStudent,
} from "../controllers/userController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAllStudents);

router.get("/:id", protect, adminOnly, getStudentById);

router.delete("/:id", protect, adminOnly, deleteStudent);

export default router;
