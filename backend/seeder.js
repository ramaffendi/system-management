import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Employees from "./models/employee.js";
import UserLogin from "./models/login.js";
import Unit from "./models/unit.js";
import Position from "./models/position.js";

// Load environment variables
dotenv.config();

// Koneksi ke MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/rsiaDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected for Seeding"))
  .catch((err) => console.log(err));

const seedDB = async () => {
  try {
    // Kosongkan koleksi sebelum insert
    await Employees.deleteMany();
    await UserLogin.deleteMany();
    await Unit.deleteMany();
    await Position.deleteMany();

    // Tambahkan unit baru
    const newUnit = await Unit.create({ name: "IT" }); // Buat unit baru
    console.log("Unit Created:", newUnit);

    // Dummy Data (gunakan newUnit._id untuk unit)
    const employees = [
      {
        name: "Ramadhan Effendi",
        username: "ramadhan",
        password: bcrypt.hashSync("password123", 10), // Enkripsi password
        unit: newUnit._id, // ✅ Gunakan ObjectId dari unit yang baru dibuat
        position: ["Admin", "Developer"],
        joinDate: new Date("2022-01-15"),
      },
      {
        name: "John Doe7",
        username: "johndoe9",
        password: bcrypt.hashSync("password123", 10),
        unit: newUnit._id, // ✅ Gunakan ObjectId dari unit yang baru dibuat
        position: ["Accountant"],
        joinDate: new Date("2021-11-10"),
      },
      {
        name: "John Doe6",
        username: "johndoe8",
        password: bcrypt.hashSync("password123", 10),
        unit: newUnit._id, // ✅ Gunakan ObjectId dari unit yang baru dibuat
        position: ["Accountant"],
        joinDate: new Date("2021-11-10"),
      },
      {
        name: "John Doe5",
        username: "johndoe7",
        password: bcrypt.hashSync("password123", 10),
        unit: newUnit._id, // ✅ Gunakan ObjectId dari unit yang baru dibuat
        position: ["Accountant"],
        joinDate: new Date("2021-11-10"),
      },
      {
        name: "John Doe4",
        username: "johndoe6",
        password: bcrypt.hashSync("password123", 10),
        unit: newUnit._id, // ✅ Gunakan ObjectId dari unit yang baru dibuat
        position: ["Accountant"],
        joinDate: new Date("2021-11-10"),
      },
      {
        name: "John Doe3",
        username: "johndoe5",
        password: bcrypt.hashSync("password123", 10),
        unit: newUnit._id, // ✅ Gunakan ObjectId dari unit yang baru dibuat
        position: ["Accountant"],
        joinDate: new Date("2021-11-10"),
      },
      {
        name: "John Doe2",
        username: "johndoe4",
        password: bcrypt.hashSync("password123", 10),
        unit: newUnit._id, // ✅ Gunakan ObjectId dari unit yang baru dibuat
        position: ["Accountant"],
        joinDate: new Date("2021-11-10"),
      },
      {
        name: "John Doe1",
        username: "johndoe3",
        password: bcrypt.hashSync("password123", 10),
        unit: newUnit._id, // ✅ Gunakan ObjectId dari unit yang baru dibuat
        position: ["Accountant"],
        joinDate: new Date("2021-11-10"),
      },
      {
        name: "John Doe9",
        username: "johndoe2",
        password: bcrypt.hashSync("password123", 10),
        unit: newUnit._id, // ✅ Gunakan ObjectId dari unit yang baru dibuat
        position: ["Accountant"],
        joinDate: new Date("2021-11-10"),
      },
      {
        name: "John Doe10",
        username: "johndoe1",
        password: bcrypt.hashSync("password123", 10),
        unit: newUnit._id, // ✅ Gunakan ObjectId dari unit yang baru dibuat
        position: ["Accountant"],
        joinDate: new Date("2021-11-10"),
      },
    ];

    const userLogins = Array.from({ length: 200 }).map(() => ({
      username: `user${Math.floor(Math.random() * 10) + 1}`,
      loginTime: new Date(),
    }));

    // Insert data
    await Employees.insertMany(employees);
    await UserLogin.insertMany(userLogins);

    console.log("Seeding Success!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding Error:", error);
    mongoose.connection.close();
  }
};

seedDB();
