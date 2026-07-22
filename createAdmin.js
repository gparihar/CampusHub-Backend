import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({
      email: "admin@campushub.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "CampusHub Admin",
      email: "admin@campushub.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully.");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
