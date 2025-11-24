import React, { useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);

      localStorage.setItem("token", res.data.access_token);

      navigate("/dashboard");

    } catch (err) {
      const backendMessage =
        err.response?.data?.error || err.response?.data?.msg;

      if (backendMessage) {
        setError(backendMessage);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {error && <Alert type="error" message={error} />}

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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
