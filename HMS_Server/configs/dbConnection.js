import mongoose from "mongoose";
import { DB_URI } from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connected successfully...");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // Exit process with failure if the database connection fails
    process.exit(1);
  }
};

export default connectDB;
