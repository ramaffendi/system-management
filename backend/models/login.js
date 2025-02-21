import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
  username: { type: String, required: true },
  loginDate: { type: Date, default: Date.now },
});

export default mongoose.model("Login", LoginSchema);
