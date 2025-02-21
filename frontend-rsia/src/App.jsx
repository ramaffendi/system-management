import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Homes";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/loginPage/Login";
import EditEmployee from "./component/PutEmployee";
import InputEmployee from "./component/InputEmployee";
import Navbar from "./component/Navbar";
import { useEffect, useState } from "react";
import RegisterPage from "./pages/Register/RegisterPage";
import AdminPanel from "./component/AdminPanel"; // Tambah import AdminPanel

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/employees/edit/:id"
          element={user ? <EditEmployee /> : <Navigate to="/" />}
        />
        <Route
          path="/employees/new"
          element={user ? <InputEmployee /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-panel"
          element={user ? <AdminPanel /> : <Navigate to="/" />} // Tambah route untuk AdminPanel
        />
      </Routes>
    </Router>
  );
};

export default App;
