import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getEvents);
router.get("/:id", getEventById);

// Protected Routes
// Remove adminOnly temporarily while developing if needed
router.post("/", protect, adminOnly, createEvent);
router.put("/:id", protect, adminOnly, updateEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);
export default router;
