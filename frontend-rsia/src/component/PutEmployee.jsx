import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../pages/AllCss/InputEmployee.css"; // Import CSS

const EditEmployee = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    unit: "",
    positions: [],
    newPassword: "", // Hanya untuk password baru (opsional)
  });

  const [units, setUnits] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/units")
      .then((res) => setUnits(res.data))
      .catch((err) => console.error("Error fetching units:", err));

    axios
      .get("http://localhost:5000/api/positions")
      .then((res) => setPositions(res.data))
      .catch((err) => console.error("Error fetching positions:", err));

    if (id !== "new") {
      axios
        .get(`http://localhost:5000/api/employees/${id}`)
        .then((res) => {
          const emp = res.data;
          setFormData({
            name: emp.name,
            username: emp.username,
            unit: emp.unit?._id || "",
            positions: emp.positions?.map((p) => p._id) || [],
            newPassword: "", // Password tidak ditampilkan
          });
        })
        .catch((err) => console.error("Error fetching employee data:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const removePosition = (positionId) => {
    setFormData({
      ...formData,
      positions: formData.positions.filter((pos) => pos !== positionId),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hanya kirim password jika user mengisi
    const dataToSend = {
      name: formData.name,
      username: formData.username,
      unit: formData.unit,
      positions: formData.positions,
    };

    if (formData.newPassword) {
      dataToSend.newPassword = formData.newPassword;
    }

    try {
      if (id === "new") {
        await axios.post("http://localhost:5000/api/employees", dataToSend);
        Swal.fire("Success!", "Employee berhasil ditambahkan!", "success");
      } else {
        await axios.put(
          `http://localhost:5000/api/employees/${id}`,
          dataToSend
        );
        Swal.fire("Success!", "Employee berhasil diupdate!", "success");
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving employee:", error.response?.data || error);
      Swal.fire("Error!", "Terjadi kesalahan saat menyimpan data.", "error");
    }
  };

  return (
    <div className="input-employee-container">
      <h2 className="form-title">
        {id === "new" ? "Tambah Employee" : "Edit Employee"}
      </h2>
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
          Password Baru (Opsional):
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Biarkan kosong jika tidak ingin mengubah password"
          />
        </label>

        <button type="submit" className="submit-btn">
          {id === "new" ? "Tambah" : "Update"}
        </button>
      </form>

      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        Kembali ke Dashboard
      </button>
    </div>
  );
};

export default EditEmployee;
