import mongoose from "mongoose";

const outbreakSchema = new mongoose.Schema(
  {
    obname: {
      type: String,
      required: true,
    },
    obcomments: {
      type: String,
      required: true,
    },
    oblocation: {
      type: String,
      required: true,
    },
    obmeasures: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Outbreak", outbreakSchema);
