import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MetricCard from "../components/MetricCard";
import UserActivityLineChart from "../components/Charts/LineChart";
import SalesBarChart from "../components/Charts/BarChart";
import CategoryPieChart from "../components/Charts/PieChart";
import RevenueAreaChart from "../components/Charts/AreaChart";
import ConfirmModal from "../components/ConfirmModal";

const kpiStats = [
  { title: "Active users", value: "18,240", change: "24%", changeLabel: "vs last month" },
  { title: "Monthly revenue", value: "$86.4k", change: "18%", changeLabel: "vs last month" },
  { title: "Churn rate", value: "2.1%", change: "-0.4%", changeLabel: "vs last month" },
  { title: "Sessions", value: "214k", change: "12%", changeLabel: "vs last month" },
];

const dailyActivity = [
  { day: "Mon", value: 8200 },
  { day: "Tue", value: 9600 },
  { day: "Wed", value: 10400 },
  { day: "Thu", value: 9800 },
  { day: "Fri", value: 11200 },
  { day: "Sat", value: 12350 },
  { day: "Sun", value: 11900 },
];

const revenueByMonth = [
  { label: "Jan", value: 32000 },
  { label: "Feb", value: 34500 },
  { label: "Mar", value: 36800 },
  { label: "Apr", value: 39200 },
  { label: "May", value: 42100 },
  { label: "Jun", value: 44750 },
  { label: "Jul", value: 47200 },
];

const planPerformance = [
  { label: "Starter", value: 32 },
  { label: "Growth", value: 44 },
  { label: "Scale", value: 21 },
  { label: "Enterprise", value: 15 },
];

const trafficSources = [
  { name: "Organic", value: 42 },
  { name: "Paid", value: 28 },
  { name: "Referral", value: 18 },
  { name: "Partners", value: 12 },
];

const Analytics = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
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

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    setLogoutModalOpen(false);
    try {
      await api.post("/auth/logout");
    } catch {
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <ConfirmModal
        isOpen={logoutModalOpen}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmLabel="Logout"
        cancelLabel="Cancel"
        onConfirm={handleConfirmLogout}
        onCancel={() => setLogoutModalOpen(false)}
      />
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
          <Navbar
            onMenuClick={() => setSidebarOpen(true)}
            user={user}
            onLogout={openLogoutModal}
            pageTitle="Analytics"
            pageSubtitle="Engagement & revenue"
          />

          <main className="flex-1 px-4 pb-8 pt-4 md:px-6 lg:px-8">
            {error && (
              <div className="mb-4 rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-sm text-red-100">
                {error}
              </div>
            )}

            <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {kpiStats.map((metric, index) => (
                <MetricCard
                  key={metric.title}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeLabel={metric.changeLabel}
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
                        Active users
                      </p>
                      <p className="text-sm font-medium text-slate-100">Daily sessions</p>
                    </div>
                    <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                      Last 7 days
                    </span>
                  </div>
                  <div className="h-64">
                    <UserActivityLineChart data={dailyActivity} />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Traffic sources
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-100">
                      Sessions by channel
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col items-center gap-4 md:flex-row md:items-center">
                    <div className="flex-1">
                      <div className="mx-auto h-40 w-40">
                        <CategoryPieChart data={trafficSources} />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2 text-xs text-slate-400">
                      <p className="text-2xl font-semibold tracking-tight text-slate-50">64.3k</p>
                      <p className="text-[11px] text-emerald-400">+19% sessions this month</p>
                      <ul className="mt-2 space-y-1">
                        {trafficSources.map((item) => (
                          <li key={item.name} className="flex items-center justify-between">
                            <span>{item.name}</span>
                            <span className="text-slate-200">{item.value}%</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Recurring revenue
                      </p>
                      <p className="text-sm font-medium text-slate-100">MRR growth</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                      +18% MoM
                    </span>
                  </div>
                  <div className="h-64">
                    <RevenueAreaChart data={revenueByMonth} />
                  </div>
                </div>
              </div>

              <div>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Plan performance
                      </p>
                      <p className="text-sm font-medium text-slate-100">Active subscriptions</p>
                    </div>
                    <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                      By tier
                    </span>
                  </div>
                  <div className="h-64">
                    <SalesBarChart data={planPerformance} />
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

export default Analytics;
