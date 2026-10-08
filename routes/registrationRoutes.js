import express from "express";
import {
  registerForEvent,
  getMyRegistrations,
  cancelRegistration,
  getRegistrationCount,
  getAllRegistrationsForAdmin,
  deleteRegistrationByAdmin,
} from "../controllers/registrationController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register for an event
router.post("/", protect, registerForEvent);

// Get logged-in user's registrations
router.get("/my", protect, getMyRegistrations);

// Get total registration count
router.get("/count", protect, adminOnly, getRegistrationCount);

// Get all registrations for admin
router.get("/admin", protect, adminOnly, getAllRegistrationsForAdmin);

// Delete registration by admin
router.delete("/admin/:id", protect, adminOnly, deleteRegistrationByAdmin);

// Cancel registration
router.delete("/:id", protect, cancelRegistration);

export default router;
