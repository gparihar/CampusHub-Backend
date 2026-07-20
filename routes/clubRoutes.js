import express from "express";
import {
  createClub,
  getClubs,
  getClubById,
  updateClub,
  deleteClub,
} from "../controllers/clubController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getClubs);
router.get("/:id", getClubById);

// Protected Routes
// Remove adminOnly temporarily while developing if needed
router.post("/", protect, adminOnly, createClub);
router.put("/:id", protect, adminOnly, updateClub);
router.delete("/:id", protect, adminOnly, deleteClub);

export default router;
