import bcrypt from "bcryptjs";
import auth from "../models/authModel.js";
import Login from "../models/login.js";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, username, password, isAdmin } = req.body; // Tambahkan isAdmin dari req.body

    // Cek apakah username sudah ada
    const existingUser = await auth.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru (bisa Admin atau Employee)
    const newUser = new auth({
      name,
      username,
      password: hashedPassword,
      isAdmin: isAdmin || false, // Jika tidak diisi, default ke false (employee)
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await auth.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Simpan di session
    req.session.user = {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    await Login.create({ username });

    res.status(200).json({
      message: "Login successful",
      user: req.session.user, // Kirim data tanpa password
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
