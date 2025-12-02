import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MetricCard from "../components/MetricCard";
import UserActivityLineChart from "../components/Charts/LineChart";
import SalesBarChart from "../components/Charts/BarChart";
import CategoryPieChart from "../components/Charts/PieChart";

/**
 * README-style UI inspiration (Dribbble search terms):
 * - "analytics dashboard", "SaaS metrics", "dark admin panel"
 * - Soft gradients, rounded-2xl cards, pill buttons, subtle neon glows
 * - Examples: shots with multi-column metric cards + line, bar & donut charts
 */

const userActivity = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 200 },
  { day: "Wed", value: 150 },
  { day: "Thu", value: 300 },
  { day: "Fri", value: 220 },
  { day: "Sat", value: 500 },
  { day: "Sun", value: 450 },
];

const salesData = [
  { label: "Jan", value: 1200 },
  { label: "Feb", value: 1900 },
  { label: "Mar", value: 1650 },
];

const categoryData = [
  { name: "Electronics", value: 45 },
  { name: "Furniture", value: 25 },
  { name: "Clothing", value: 30 },
];

const metricStats = [
  { title: "Total Users", value: "15.2K" },
  { title: "Revenue", value: "$45,200" },
  { title: "Orders", value: "1,240" },
  { title: "Conversion", value: "4.3%" },
];

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch {
        setError("Failed to load user info");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore
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
          (err.response?.data?.error || err.response?.data?.msg || "Unknown"),
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
          (err.response?.data?.error || err.response?.data?.msg || "Unknown"),
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
          <Navbar
            onMenuClick={() => setSidebarOpen(true)}
            user={user}
            onLogout={handleLogout}
          />

          <main className="flex-1 px-4 pb-8 pt-4 md:px-6 lg:px-8">
            {error && (
              <div className="mb-4 rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-sm text-red-100">
                {error}
              </div>
            )}

            {user && (
              <section className="mb-5">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 shadow-xl shadow-slate-950/80 sm:px-5 sm:py-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Welcome back
                      </p>
                      <p className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
                        {user.username}
                      </p>
                      <p className="text-xs text-slate-400">
                        Member since {" "}
                        {new Date(user.created_at).toLocaleDateString()} • {user.email}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={handleProfile}
                        className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-sm shadow-slate-950/60 hover:border-slate-500 hover:bg-slate-800"
                      >
                        Get profile
                      </button>
                      <button
                        type="button"
                        onClick={handleAdmin}
                        className="rounded-full border border-amber-500/60 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-100 shadow-sm shadow-amber-500/40 hover:bg-amber-500/20"
                      >
                        Admin panel
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metricStats.map((metric, index) => (
                <MetricCard
                  key={metric.title}
                  title={metric.title}
                  value={metric.value}
                  index={index}
                />
              ))}
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        User activity
                      </p>
                      <p className="text-sm font-medium text-slate-100">
                        Weekly engagement trend
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                      Last 7 days
                    </span>
                  </div>
                  <div className="h-64">
                    <UserActivityLineChart data={userActivity} />
                  </div>
                </div>
              </div>

              <div>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Category split
                      </p>
                      <p className="text-sm font-medium text-slate-100">
                        Revenue by category
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                      Current
                    </span>
                  </div>
                  <div className="h-52">
                    <CategoryPieChart data={categoryData} />
                  </div>
                  <ul className="mt-4 space-y-1 text-xs text-slate-400">
                    {categoryData.map((item) => (
                      <li key={item.name} className="flex items-center justify-between">
                        <span>{item.name}</span>
                        <span className="text-slate-300">{item.value}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Monthly revenue
                      </p>
                      <p className="text-sm font-medium text-slate-100">
                        Sales performance
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                      Q1 snapshot
                    </span>
                  </div>
                  <div className="h-60">
                    <SalesBarChart data={salesData} />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 shadow-xl shadow-slate-950/80">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Session summary
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-100">
                      You are viewing a simulated analytics dashboard with dummy data.
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      Hook these widgets up to your real API endpoints to turn this
                      into a production analytics surface. The layout is optimised
                      for quick-glance KPIs, activity trends, and category
                      breakdowns.
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="rounded-full border border-red-500/60 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-100 shadow-sm shadow-red-500/40 hover:bg-red-500/20"
                    >
                      Logout
                    </button>
                    <span className="rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-[11px] font-medium text-slate-400">
                      Auth state: simulated via PrivateRoute
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
