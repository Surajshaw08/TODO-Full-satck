// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import OTPVerify from "./pages/OTPVerify";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Subscription from "./pages/Subscription";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      {/* Navbar is always visible on all routes */}
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* Dashboard is the default view for all users */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Auth routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<OTPVerify />} />
        <Route path="/login" element={<Login />} />
        
        {/* Other routes */}
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </Router>
  );
}

export default App;
