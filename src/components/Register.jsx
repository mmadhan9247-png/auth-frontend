import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Wake backend
  useEffect(() => {
    axios.get(API_BASE_URL).catch(() => {});
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,   // ✅ FINAL CORRECT URL
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data);

      if (err.response) {
        setError(err.response.data.error || "Registration failed!");
      } else {
        setError("Server not responding!");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0a0f2c",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "rgba(0, 0, 0, 0.3)",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 0 25px rgba(0,0,0,0.4)",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "8px", fontSize: "28px" }}>
          Register
        </h2>

        <p style={{ textAlign: "center", marginBottom: "20px", opacity: 0.7 }}>
          Create your new account
        </p>

        {/* SUCCESS ALERT */}
        {success && <Alert type="success" message={success} />}

        {/* ERROR ALERT */}
        {error && <Alert type="error" message={error} />}

        <form onSubmit={handleSubmit}>

          <label style={{ fontSize: "14px" }}>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              marginTop: "6px",
              marginBottom: "18px",
            }}
          />

          <label style={{ fontSize: "14px" }}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              marginTop: "6px",
              marginBottom: "18px",
            }}
          />

          <label style={{ fontSize: "14px" }}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              marginTop: "6px",
              marginBottom: "18px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(to right, #003cff, #006eff)",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "4px",
            }}
          >
            Create Account
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#4da6ff", textDecoration: "none", fontWeight: "bold" }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
