import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchStats();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch {
      setError("Failed to load user info");
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data.data);
    } catch {
      setError("Failed to load dashboard stats");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
    }
    navigate("/login");
  };

  const handleProfile = async () => {
    try {
      const res = await api.get("/profile");
      alert(JSON.stringify(res.data, null, 2));
    } catch (err) {
      alert(
        "Profile error: " +
          (err.response?.data?.error || err.response?.data?.msg || "Unknown")
      );
    }
  };

  const handleAdmin = async () => {
    try {
      const res = await api.get("/admin");
      alert(JSON.stringify(res.data, null, 2));
    } catch (err) {
      alert(
        "Admin error: " +
          (err.response?.data?.error || err.response?.data?.msg || "Unknown")
      );
    }
  };

  return (
    <div className="app-shell">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-xl-5">
            <div className="card dashboard-card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Dashboard</h3>
                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </div>
              <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}

                {user && (
                  <div className="mb-4 text-start">
                    <h4 className="mb-1">Welcome, {user.username}!</h4>
                    <p className="mb-1 text-muted">Email: {user.email}</p>
                    <p className="mb-0 text-muted">
                      Member since: {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {stats && (
                  <div className="stats-row mb-4">
                    <div>
                      <div className="card bg-primary text-white stat-card">
                        <div className="card-body">
                          <div className="stat-label">Total Users</div>
                          <div className="stat-value">{stats.total_users}</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card bg-success text-white stat-card">
                        <div className="card-body">
                          <div className="stat-label">Active Users</div>
                          <div className="stat-value">{stats.active_users}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="dashboard-actions d-flex justify-content-center gap-2">
                  <button className="btn btn-info" onClick={handleProfile}>
                    Get Profile
                  </button>
                  <button className="btn btn-warning" onClick={handleAdmin}>
                    Admin Panel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
