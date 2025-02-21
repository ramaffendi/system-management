import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./Register.css"; // Import CSS

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Default Employee (false)
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          username,
          password,
          isAdmin, // Kirim isAdmin ke backend
        }
      );

      console.log("Response dari server:", response.data); // Debugging
      Swal.fire("Success", "Registrasi berhasil!", "success").then(() => {
        navigate("/login"); // Redirect ke halaman login setelah sukses
      });
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Registrasi gagal!",
        "error"
      );
    }
  };

  return (
    <div className="register-container">
      <h2>Register User</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          className="register-input"
          placeholder="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          className="register-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="register-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Tambahkan Dropdown untuk memilih role */}
        <select
          className="register-input"
          value={isAdmin}
          onChange={(e) => setIsAdmin(e.target.value === "true")}
        >
          <option value="false">Employee</option>
          <option value="true">Admin</option>
        </select>

        <button type="submit" className="register-button">
          Register
        </button>
      </form>

      <p>
        Sudah punya akun?{" "}
        <span className="register-link" onClick={() => navigate("/login")}>
          Login di sini
        </span>
      </p>
    </div>
  );
};

export default RegisterPage;
