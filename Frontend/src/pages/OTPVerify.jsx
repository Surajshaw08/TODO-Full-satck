// src/pages/OTPVerify.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";

function OTPVerify() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/verify", { email, otp });
      toast.success("Verified! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Verify</button>
      </form>
    </div>
  );
}

export default OTPVerify;
