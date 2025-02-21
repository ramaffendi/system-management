import express from "express";
import Employee from "../models/employee.js";
import Login from "../models/login.js";
import Unit from "../models/unit.js";
import Position from "../models/position.js";
// import { adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Endpoint untuk mendapatkan statistik dashboard
router.get("/", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Filter waktu jika ada
    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        loginDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
      };
    }

    // Hitung jumlah total
    const totalEmployees = await Employee.countDocuments();
    const totalLogins = await Login.countDocuments(dateFilter);
    const totalUnits = await Unit.countDocuments();
    const totalPositions = await Position.countDocuments();

    // Top 10 user dengan login lebih dari 25 kali dalam rentang waktu tertentu
    const topUsers = await Login.aggregate([
      { $match: dateFilter },
      { $group: { _id: "$username", count: { $sum: 1 } } },
      { $match: { count: { $gt: 25 } } }, // Hanya yang lebih dari 25 kali
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).json({
      totalEmployees,
      totalLogins,
      totalUnits,
      totalPositions,
      topUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
