import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

router.post(
  "/login",
  (req, res, next) => {
    console.log("✅ LOGIN ROUTE HIT");
    next();
  },
  login,
);

export default router;
