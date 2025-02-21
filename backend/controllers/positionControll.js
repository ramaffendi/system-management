import Position from "../models/position.js";

export const getPositions = async (req, res) => {
  try {
    const positions = await Position.find();
    res.status(200).json(positions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPosition = async (req, res) => {
  try {
    const newPosition = new Position(req.body);
    await newPosition.save();
    res.status(201).json(newPosition);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePosition = async (req, res) => {
  try {
    const updatedPosition = await Position.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPosition);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePosition = async (req, res) => {
  try {
    await Position.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Position deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
