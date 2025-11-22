import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../config";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, formData);
      // Do NOT auto-login. Force user to use username/password on Login page.
      setSuccess("Registration successful. Please log in with your username and password.");
      navigate("/login");
    } catch (err) {
      const backendMessage =
        err.response?.data?.error || err.response?.data?.msg;
      const status = err.response?.status;
      if (backendMessage) {
        setError(backendMessage);
      } else if (status) {
        setError(`Registration failed (status ${status}).`);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="app-shell">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="card auth-card">
              <div className="card-header text-center">
                <div className="auth-title">Create account</div>
                <div className="auth-subtitle">Register to access your dashboard</div>
              </div>
              <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                  <button type="submit" className="btn btn-success w-100">
                    Register
                  </button>
                </form>
                <div className="mt-3 text-center auth-footer-text">
                  <span>Already have an account? </span>
                  <Link to="/login">Login here</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
