import mongoose from "mongoose";

const UnitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Position name is required"],
    unique: true,
    trim: true,
  },
});

export default mongoose.model("Position", UnitSchema);
