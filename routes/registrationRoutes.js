import express from "express";
import {
  registerForEvent,
  getMyRegistrations,
  cancelRegistration,
} from "../controllers/registrationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register for an event
router.post("/", protect, registerForEvent);

// Get logged-in user's registrations
router.get("/my", protect, getMyRegistrations);

// Cancel registration
router.delete("/:id", protect, cancelRegistration);

export default router;
