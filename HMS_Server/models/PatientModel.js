import mongoose, { mongo } from "mongoose";

const PatientSchema = new mongoose.Schema(
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
    patientId: {
      type: Number,
      required: true,
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

export default mongoose.model("Patient", PatientSchema);
