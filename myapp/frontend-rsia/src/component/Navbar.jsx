import { Link } from "react-router-dom";
import "../pages/AllCss/Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const currentUser = user?.user || user; // Ambil `user.user` jika ada

  return (
    <nav className="navbar">
      <div className="brand">MyApp</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        {currentUser && <Link to="/employees/new">Add Employee</Link>}
      </div>
      <div className="nav-user">
        {currentUser ? (
          <>
            <span>{currentUser.username}</span>
            <button onClick={onLogout} className="nav-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="nav-button">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
