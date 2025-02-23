import Employee from "../models/employee.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("unit")
      .populate("positions");
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, username, password, unit, positions, joinDate } = req.body;

    // Pastikan password tidak kosong
    if (!password) {
      return res.status(400).json({ message: "Password tidak boleh kosong" });
    }

    // Hash password sebelum disimpan
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Pastikan `positions` adalah array sebelum diubah ke ObjectId
    let positionIds = [];
    if (Array.isArray(positions)) {
      positionIds = positions
        .map((pos) =>
          mongoose.isValidObjectId(pos)
            ? new mongoose.Types.ObjectId(pos)
            : null
        )
        .filter(Boolean); // Hapus ID yang tidak valid
    }

    // Buat karyawan baru dengan password yang sudah di-hash
    const newEmployee = new Employee({
      name,
      username,
      password: hashedPassword, // Simpan password yang sudah di-hash
      unit,
      positions: positionIds,
      joinDate,
    });

    // Simpan ke database
    await newEmployee.save();

    res.status(201).json({
      message: "Karyawan berhasil ditambahkan!",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(400).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { name, username, unit, positions, newPassword } = req.body;

    // Ambil data employee lama
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee tidak ditemukan" });

    // Jika ada password baru, hash password baru, jika tidak gunakan yang lama
    const passwordToUpdate = newPassword
      ? await bcrypt.hash(newPassword, 10)
      : employee.password;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        username,
        unit,
        positions,
        password: passwordToUpdate, // Pakai password lama jika tidak diubah
      },
      { new: true }
    );

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek apakah ID valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const employee = await Employee.findById(id)
      .populate("unit")
      .populate("positions");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
