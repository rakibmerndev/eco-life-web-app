import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: false,
      default: "https://cdn-icons-png.flaticon.com/512/6522/6522516.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
