import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false, // Secara default bukan admin
    },
  },
  { timestamps: true } // Tambahkan waktu pembuatan & update
);

export default mongoose.model("user", AuthSchema);
