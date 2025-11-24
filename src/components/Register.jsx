import React, { useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, formData);

      setSuccess("Registration successful. Please log in.");
      setTimeout(() => navigate("/login"), 1200);

    } catch (err) {
      const backendMessage =
        err.response?.data?.error || err.response?.data?.msg;

      if (backendMessage) {
        setError(backendMessage);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
