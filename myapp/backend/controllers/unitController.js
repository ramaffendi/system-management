import Unit from "../models/unit.js";

export const getUnits = async (req, res) => {
  try {
    const units = await Unit.find();
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUnit = async (req, res) => {
  try {
    const newUnit = new Unit(req.body);
    await newUnit.save();
    res.status(201).json(newUnit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUnit = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔹 Pastikan ID valid
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Unit ID" });
    }

    // 🔹 Cari unit berdasarkan ID
    const unit = await Unit.findById(id);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // 🔹 Update unit
    const updatedUnit = await Unit.findByIdAndUpdate(id, req.body, {
      new: true, // 🔹 Mengembalikan data yang sudah diupdate
      runValidators: true, // 🔹 Pastikan data baru valid sesuai schema
    });

    res.status(200).json(updatedUnit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUnit = async (req, res) => {
  try {
    await Unit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Unit deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
