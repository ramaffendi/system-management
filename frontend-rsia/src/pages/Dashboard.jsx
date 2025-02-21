import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../pages/AllCss/dashboard.css";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/employees/${id}`);
          Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
          fetchEmployees();
        } catch (error) {
          console.error("Error deleting employee:", error);
          Swal.fire(
            "Gagal!",
            "Terjadi kesalahan saat menghapus data.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <button className="btn-add" onClick={() => navigate("/employees/new")}>
        Input Employee
      </button>
      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>
                Unit{" "}
                <button
                  className="btn-add-small"
                  onClick={() => navigate("/admin-panel")}
                >
                  +
                </button>
              </th>
              <th>
                Position{" "}
                <button
                  className="btn-add-small"
                  onClick={() => navigate("/admin-panel")}
                >
                  +
                </button>
              </th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp._id}</td>
                <td>{emp.name}</td>
                <td>{emp.unit?.name || "N/A"}</td>
                <td>
                  {Array.isArray(emp.positions)
                    ? emp.positions.map((pos) => pos.name).join(", ")
                    : "N/A"}
                </td>
                <td>
                  {emp.joinDate
                    ? new Date(emp.joinDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/employees/edit/${emp._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
