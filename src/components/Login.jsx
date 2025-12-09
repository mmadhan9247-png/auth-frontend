import React, { useState, useEffect } from "react";
import Alert from "../components/Alert";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import GoogleLoginButton from "./GoogleLoginButton";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Wake backend (Render cold-start)
  useEffect(() => {
    api.get("/auth/me").catch(() => {});
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
      await api.post("/auth/login", formData);
      setSuccess("Login successful! Redirecting...");

      setTimeout(() => navigate("/dashboard"), 1200);

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);

      if (err.response) {
        setError(err.response.data.error || "Login failed!");
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
          background: "rgba(0,0,0,0.3)",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 0 25px rgba(0,0,0,0.4)",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "8px", fontSize: "28px" }}>
          Login
        </h2>

        <p style={{ textAlign: "center", marginBottom: "20px", opacity: 0.7 }}>
          Welcome back! Please sign in.
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
              backgroundColor: "white",
              color: "#111827",
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
              backgroundColor: "white",
              color: "#111827",
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
            Login
          </button>
        </form>

        <div style={{ marginTop: "20px" }}>
          <div style={{ textAlign: "center", marginBottom: "10px", opacity: 0.7 }}>
            Or continue with
          </div>
          <GoogleLoginButton />
        </div>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#4da6ff", textDecoration: "none", fontWeight: "bold" }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
