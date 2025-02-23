import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../pages/AllCss/InputEmployee.css"; // Import file CSS

const InputEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    unit: "",
    positions: [],
    joinDate: "",
  });

  const [units, setUnits] = useState([]);
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/units")
      .then((res) => setUnits(res.data))
      .catch((err) => console.error("Error fetching units:", err));

    axios
      .get("http://localhost:5000/api/positions")
      .then((res) => setPositions(res.data))
      .catch((err) => console.error("Error fetching positions:", err));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "positions") {
      const selectedValues = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      ).filter(Boolean);
      setFormData({ ...formData, positions: selectedValues });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handlePositionSelect = (e) => {
    const selectedPosition = e.target.value;
    if (!formData.positions.includes(selectedPosition)) {
      setFormData({
        ...formData,
        positions: [...formData.positions, selectedPosition],
      });
    }
  };

  const removePosition = (position) => {
    setFormData({
      ...formData,
      positions: formData.positions.filter((pos) => pos !== position),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.username ||
      !formData.password ||
      !formData.unit ||
      formData.positions.length === 0 ||
      !formData.joinDate
    ) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Semua field harus diisi!",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees",
        formData
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Karyawan berhasil ditambahkan.",
        }).then(() => navigate("/dashboard"));
      }
    } catch (error) {
      console.error("Error creating employee:", error.response?.data || error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menambah karyawan.",
      });
    }
  };

  return (
    <div className="input-employee-container">
      <h2 className="form-title">Input Employee</h2>
      <form className="employee-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Unit:
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Unit</option>
            {units.map((unit) => (
              <option key={unit._id} value={unit._id}>
                {unit.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Position:
          <select className="position-select" onChange={handlePositionSelect}>
            <option value="">Pilih Position</option>
            {positions.map((pos) => (
              <option key={pos._id} value={pos._id}>
                {pos.name}
              </option>
            ))}
          </select>
        </label>

        <div className="selected-positions">
          <strong>Posisi Terpilih:</strong>
          <ul>
            {formData.positions.map((posId) => {
              const pos = positions.find((p) => p._id === posId);
              return pos ? (
                <li key={posId} className="position-item">
                  {pos.name}
                  <button
                    className="remove-btn"
                    onClick={() => removePosition(posId)}
                  >
                    ❌
                  </button>
                </li>
              ) : null;
            })}
          </ul>
        </div>

        <label>
          Join Date:
          <input
            type="date"
            name="joinDate"
            value={formData.joinDate}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        Kembali ke Dashboard
      </button>
    </div>
  );
};

export default InputEmployee;
