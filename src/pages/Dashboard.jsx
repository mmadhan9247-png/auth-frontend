import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MetricCard from "../components/MetricCard";
import UserActivityLineChart from "../components/Charts/LineChart";
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

const categoryData = [
  { name: "Transaction view", value: 45 },
  { name: "Sales", value: 35 },
  { name: "Payment", value: 20 },
];

const transactions = [
  {
    title: "Dana Schultz",
    date: "22 Sep 2022 10:30 AM",
    medium: "Visa",
    amount: "$5,022",
  },
  {
    title: "Jessie Moen",
    date: "21 Sep 2022 09:18 AM",
    medium: "PayPal",
    amount: "$3,480",
  },
  {
    title: "Carroll Emmerich",
    date: "20 Sep 2022 11:02 AM",
    medium: "Payoneer",
    amount: "$1,220",
  },
  {
    title: "Elaine Dicki",
    date: "19 Sep 2022 08:47 AM",
    medium: "Visa",
    amount: "$980",
  },
];

const metricStats = [
  {
    title: "Total income",
    value: "$8,500",
    change: "35%",
    changeLabel: "Increased from last month",
  },
  {
    title: "Total spending",
    value: "$4,800",
    change: "75%",
    changeLabel: "Increased from last month",
  },
  {
    title: "Spending goal",
    value: "$9,254",
    change: "15%",
    changeLabel: "Increased from last month",
  },
  {
    title: "Total transactions",
    value: "$17,000",
    change: "85%",
    changeLabel: "Increased from last month",
  },
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
                        Your assets
                      </p>
                      <p className="text-sm font-medium text-slate-100">
                        Balance & cash flow
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="hidden items-center gap-3 text-xs text-slate-400 sm:flex">
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          <span>Income</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-amber-400" />
                          <span>Expense</span>
                        </span>
                      </div>
                      <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                        Daily
                      </span>
                    </div>
                  </div>
                  <div className="h-64">
                    <UserActivityLineChart data={userActivity} />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 shadow-xl shadow-slate-950/80">
                  <div>
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          My cards
                        </p>
                        <p className="text-sm font-medium text-slate-100">
                          Active debit card
                        </p>
                      </div>
                      <button
                        type="button"
                        className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-[11px] font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-800"
                      >
                        Add new
                      </button>
                    </div>

                    <div className="relative mt-2">
                      <div className="pointer-events-none absolute -top-4 right-4 h-20 w-28 rounded-2xl bg-gradient-to-br from-fuchsia-500/40 via-sky-500/30 to-indigo-500/40 opacity-60 blur-md" />
                      <div className="mb-8 rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-fuchsia-500 p-4 pb-6 text-slate-950 shadow-lg shadow-indigo-500/40">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span>DEBIT CARD</span>
                          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]">
                            Active
                          </span>
                        </div>
                        <p className="mt-4 text-lg font-semibold tracking-wide">
                          0123 4567 8901 2345
                        </p>
                        <div className="mt-4 flex items-center justify-between text-[11px]">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.16em]">
                              Card holder
                            </p>
                            <p className="font-medium">{user?.username || "Ethan Cole"}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.16em]">
                              Expires
                            </p>
                            <p className="font-medium">12/24</p>
                          </div>
                        </div>
                      </div>

                      <div className="-mt-6 mx-auto w-[85%] rounded-2xl border border-slate-700/80 bg-slate-900/90 px-5 py-3 text-xs text-slate-300 shadow-xl shadow-slate-950/80">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                            Balance
                          </span>
                          <span className="text-xs text-emerald-400">+20.4%</span>
                        </div>
                        <p className="mt-1 text-lg font-semibold text-slate-50">
                          $5,540.00
                        </p>
                        <p className="mt-1 text-[11px] text-slate-400">**** 2345 · Visa</p>
                      </div>
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
                        Latest transactions
                      </p>
                      <p className="text-sm font-medium text-slate-100">
                        Recent activity
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-xs font-medium text-slate-400 hover:text-slate-200"
                    >
                      See all
                    </button>
                  </div>

                  <div className="-mx-2 overflow-x-auto">
                    <table className="min-w-full table-fixed border-separate border-spacing-y-1 text-xs">
                      <thead className="text-slate-500">
                        <tr>
                          <th className="px-2 py-1 text-left font-medium">Title</th>
                          <th className="px-2 py-1 text-left font-medium">Date</th>
                          <th className="px-2 py-1 text-left font-medium">Medium</th>
                          <th className="px-2 py-1 text-right font-medium">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-200">
                        {transactions.map((item) => (
                          <tr key={item.title}>
                            <td className="px-2 py-1.5">
                              <span className="text-[13px] font-medium">{item.title}</span>
                            </td>
                            <td className="px-2 py-1.5 text-slate-400">{item.date}</td>
                            <td className="px-2 py-1.5">
                              <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] text-slate-300">
                                {item.medium}
                              </span>
                            </td>
                            <td className="px-2 py-1.5 text-right text-slate-100">{item.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Transaction view
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-100">
                      Summary by type
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col items-center gap-4 md:flex-row md:items-center">
                    <div className="flex-1">
                      <div className="mx-auto h-40 w-40">
                        <CategoryPieChart data={categoryData} />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2 text-xs text-slate-400">
                      <p className="text-2xl font-semibold tracking-tight text-slate-50">
                        $55,501
                      </p>
                      <p className="text-[11px] text-emerald-400">+20% growth this month</p>
                      <ul className="mt-2 space-y-1">
                        {categoryData.map((item) => (
                          <li
                            key={item.name}
                            className="flex items-center justify-between"
                          >
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
