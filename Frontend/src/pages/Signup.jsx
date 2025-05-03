// src/pages/Signup.jsx
import { useState } from "react";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", form);
      toast.success("OTP sent to your email!");
      navigate("/verify", { state: { email: form.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} required placeholder="Name" className="w-full p-2 border rounded" />
        <input name="email" onChange={handleChange} required placeholder="Email" className="w-full p-2 border rounded" />
        <input name="password" onChange={handleChange} type="password" required placeholder="Password" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Send OTP</button>
      </form>
    </div>
  );
}

export default Signup;
