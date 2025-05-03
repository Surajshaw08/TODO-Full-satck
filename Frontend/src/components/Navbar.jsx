// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { logout, getToken } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold"><Link to="/">TodoApp</Link></h1>
      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/subscribe" className="hover:text-gray-300">Subscription</Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="hover:text-gray-300">Signup</Link>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
