import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../pages/AllCss/adminPanel.css";

const AdminPanel = () => {
  const [units, setUnits] = useState([]);
  const [positions, setPositions] = useState([]);
  const [newUnit, setNewUnit] = useState("");
  const [newPosition, setNewPosition] = useState("");

  useEffect(() => {
    fetchUnits();
    fetchPositions();
  }, []);

  const fetchUnits = async () => {
    const response = await axios.get("http://localhost:5000/api/units");
    setUnits(response.data);
  };

  const fetchPositions = async () => {
    const response = await axios.get("http://localhost:5000/api/positions");
    setPositions(response.data);
  };

  const addUnit = async () => {
    if (!newUnit.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/units", { name: newUnit });
      setNewUnit("");
      fetchUnits();
      Swal.fire("Success", "Unit added successfully!", "success");
    } catch {
      Swal.fire("Error", "Failed to add unit", "error");
    }
  };

  const addPosition = async () => {
    if (!newPosition.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/positions", {
        name: newPosition,
      });
      setNewPosition("");
      fetchPositions();
      Swal.fire("Success", "Position added successfully!", "success");
    } catch {
      Swal.fire("Error", "Failed to add position", "error");
    }
  };

  const deleteItem = async (id, type) => {
    Swal.fire({
      title: "Are you sure?",
      text: `This ${type} will be deleted permanently!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/${type}/${id}`);
          type === "units" ? fetchUnits() : fetchPositions();
          Swal.fire("Deleted!", `${type} has been deleted.`, "success");
        } catch {
          Swal.fire("Error!", `Failed to delete ${type}.`, "error");
        }
      }
    });
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-title">Admin Panel - Manage Units & Positions</h2>
      <div className="admin-section">
        <h3>Units</h3>
        <ul className="admin-list">
          {units.map((unit) => (
            <li key={unit._id} className="admin-item">
              {unit.name}
              <button
                className="delete-btn"
                onClick={() => deleteItem(unit._id, "units")}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
        <div className="input-group">
          <input
            type="text"
            placeholder="New Unit"
            value={newUnit}
            onChange={(e) => setNewUnit(e.target.value)}
            className="admin-input"
          />
          <button onClick={addUnit} className="add-btn">
            Add Unit
          </button>
        </div>
      </div>

      <div className="admin-section">
        <h3>Positions</h3>
        <ul className="admin-list">
          {positions.map((position) => (
            <li key={position._id} className="admin-item">
              {position.name}
              <button
                className="delete-btn"
                onClick={() => deleteItem(position._id, "positions")}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
        <div className="input-group">
          <input
            type="text"
            placeholder="New Position"
            value={newPosition}
            onChange={(e) => setNewPosition(e.target.value)}
            className="admin-input"
          />
          <button onClick={addPosition} className="add-btn">
            Add Position
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
