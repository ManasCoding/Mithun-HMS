import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    usertype: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
    },
    patientId: {
      type: Number,
    },
    gender: {
      type: String,
    },
    phone: {
      type: Number,
    },
    profilePicture: {
      type: String,
    },
    address: {
      type: String,
    },
    dob: {
      type: String,
    },
    age: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
