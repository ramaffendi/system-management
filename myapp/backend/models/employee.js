import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" }, // ✅ Pakai ObjectId
  positions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Position" }], // ✅ Pakai ObjectId
  joinDate: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
});

export default mongoose.model("Employee", EmployeeSchema);
