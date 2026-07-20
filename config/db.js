import mongoose from "mongoose";

const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  console.log("URI exists:", !!process.env.MONGO_URI);

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
    console.log(conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB Error");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
