import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MetricCard from "../components/MetricCard";
import SalesBarChart from "../components/Charts/BarChart";
import CategoryPieChart from "../components/Charts/PieChart";

const mockUsers = [
  {
    id: 1,
    name: "Sarah Connor",
    email: "sarah.connor@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "Dec 4, 2025 · 13:20",
    location: "San Francisco, USA",
    plan: "Enterprise",
  },
  {
    id: 2,
    name: "Imani Okafor",
    email: "imani.okafor@example.com",
    role: "Owner",
    status: "Active",
    lastLogin: "Dec 4, 2025 · 09:02",
    location: "Lagos, Nigeria",
    plan: "Enterprise",
  },
  {
    id: 3,
    name: "Diego Alvarez",
    email: "diego.alvarez@example.com",
    role: "Manager",
    status: "Invited",
    lastLogin: "—",
    location: "Madrid, Spain",
    plan: "Growth",
  },
  {
    id: 4,
    name: "Aisha Khan",
    email: "aisha.khan@example.com",
    role: "Analyst",
    status: "Active",
    lastLogin: "Dec 3, 2025 · 21:44",
    location: "Dubai, UAE",
    plan: "Growth",
  },
  {
    id: 5,
    name: "Liam Chen",
    email: "liam.chen@example.com",
    role: "Viewer",
    status: "Suspended",
    lastLogin: "Nov 12, 2025 · 08:15",
    location: "Singapore",
    plan: "Starter",
  },
];

const getStatusBadgeClasses = (status) => {
  if (status === "Active") {
    return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
  }
  if (status === "Invited") {
    return "bg-sky-500/10 text-sky-300 border-sky-500/30";
  }
  if (status === "Suspended") {
    return "bg-rose-500/10 text-rose-300 border-rose-500/30";
  }
  return "bg-slate-500/10 text-slate-300 border-slate-500/30";
};

const Users = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter((u) => u.status === "Active").length;
  const invitedUsers = mockUsers.filter((u) => u.status === "Invited").length;
  const suspendedUsers = mockUsers.filter((u) => u.status === "Suspended").length;

  const userKpiStats = [
    { title: "Total users", value: `${totalUsers}`, changeLabel: "Across all roles" },
    { title: "Active users", value: `${activeUsers}`, changeLabel: "Currently active" },
    { title: "Pending invites", value: `${invitedUsers}`, changeLabel: "Awaiting acceptance" },
    { title: "Suspended", value: `${suspendedUsers}`, changeLabel: "Require review" },
  ];

  const roleCounts = mockUsers.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});

  const roleChartData = Object.entries(roleCounts).map(([role, count]) => ({
    label: role,
    value: count,
  }));

  const planCounts = mockUsers.reduce((acc, u) => {
    acc[u.plan] = (acc[u.plan] || 0) + 1;
    return acc;
  }, {});

  const planChartData = Object.entries(planCounts).map(([plan, count]) => ({
    name: plan,
    value: count,
  }));

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

  const filteredUsers = mockUsers.filter((u) => {
    const term = search.toLowerCase();
    const matchesSearch =
      !term || u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term);
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
          <Navbar
            onMenuClick={() => setSidebarOpen(true)}
            user={user}
            onLogout={handleLogout}
            pageTitle="Users"
            pageSubtitle="Team and access"
          />

          <main className="flex-1 px-4 pb-8 pt-4 md:px-6 lg:px-8">
            {error && (
              <div className="mb-4 rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-sm text-red-100">
                {error}
              </div>
            )}

            <section className="mb-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-4 shadow-xl shadow-slate-950/80 sm:px-5 sm:py-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Users
                    </p>
                    <p className="text-sm font-medium text-slate-100">
                      Manage your team and permissions
                    </p>
                  </div>
                  <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                    <div className="relative w-full sm:w-56">
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">
                        <span className="h-3.5 w-3.5 rounded-full border border-slate-500/70" />
                      </span>
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or email"
                        className="w-full rounded-full border border-slate-700 bg-slate-900/80 py-1.5 pl-9 pr-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:outline-none focus:ring-0"
                      />
                    </div>
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="w-full rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-100 focus:border-slate-500 focus:outline-none focus:ring-0 sm:w-40"
                    >
                      <option value="all">All roles</option>
                      <option value="Owner">Owner</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Analyst">Analyst</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-100 focus:border-slate-500 focus:outline-none focus:ring-0 sm:w-40"
                    >
                      <option value="all">All status</option>
                      <option value="Active">Active</option>
                      <option value="Invited">Invited</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-5">
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {userKpiStats.map((metric, index) => (
                  <MetricCard
                    key={metric.title}
                    title={metric.title}
                    value={metric.value}
                    change={metric.change}
                    changeLabel={metric.changeLabel}
                    index={index}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div>
                  <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Roles
                        </p>
                        <p className="text-sm font-medium text-slate-100">Members by role</p>
                      </div>
                      <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                        Team structure
                      </span>
                    </div>
                    <div className="h-64">
                      <SalesBarChart data={roleChartData} />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Plans
                        </p>
                        <p className="text-sm font-medium text-slate-100">Users by plan</p>
                      </div>
                      <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                        Subscription mix
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="h-40 w-40">
                        <CategoryPieChart data={planChartData} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
              <div>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Team members
                      </p>
                      <p className="text-sm font-medium text-slate-100">{filteredUsers.length} users</p>
                    </div>
                    <button
                      type="button"
                      className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-800"
                    >
                      Invite user
                    </button>
                  </div>

                  <div className="-mx-2 overflow-x-auto">
                    <table className="min-w-full table-fixed border-separate border-spacing-y-1 text-xs">
                      <thead className="text-slate-500">
                        <tr>
                          <th className="px-2 py-1 text-left font-medium">User</th>
                          <th className="px-2 py-1 text-left font-medium">Role</th>
                          <th className="px-2 py-1 text-left font-medium">Status</th>
                          <th className="px-2 py-1 text-left font-medium">Last login</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-200">
                        {filteredUsers.map((u) => (
                          <tr
                            key={u.id}
                            className="cursor-pointer rounded-xl border border-transparent bg-slate-900/60 transition hover:border-slate-700 hover:bg-slate-900"
                            onClick={() => setSelectedUser(u)}
                          >
                            <td className="px-2 py-2">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-sky-500 to-fuchsia-500 text-xs font-semibold text-slate-950">
                                  {u.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                                </div>
                                <div>
                                  <p className="text-[13px] font-medium">{u.name}</p>
                                  <p className="text-[11px] text-slate-400">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-2 text-slate-300">{u.role}</td>
                            <td className="px-2 py-2">
                              <span
                                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${getStatusBadgeClasses(
                                  u.status
                                )}`}
                              >
                                {u.status}
                              </span>
                            </td>
                            <td className="px-2 py-2 text-slate-400">{u.lastLogin}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <aside>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div className="mb-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      User details
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-100">
                      {selectedUser ? selectedUser.name : "Select a user"}
                    </p>
                  </div>

                  {selectedUser ? (
                    <div className="space-y-4 text-xs text-slate-300">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Email</p>
                        <p className="mt-1 text-slate-100">{selectedUser.email}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Role</p>
                          <p className="mt-1 text-slate-100">{selectedUser.role}</p>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Status</p>
                          <span
                            className={`mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${getStatusBadgeClasses(
                              selectedUser.status
                            )}`}
                          >
                            {selectedUser.status}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Plan</p>
                        <p className="mt-1 text-slate-100">{selectedUser.plan}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Last login</p>
                        <p className="mt-1 text-slate-100">{selectedUser.lastLogin}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Location</p>
                        <p className="mt-1 text-slate-100">{selectedUser.location}</p>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          className="flex-1 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-[11px] font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-800"
                        >
                          Edit access
                        </button>
                        <button
                          type="button"
                          className="flex-1 rounded-full border border-rose-600/70 bg-rose-600/10 px-3 py-1.5 text-[11px] font-medium text-rose-200 hover:bg-rose-600/20"
                        >
                          Suspend
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-3 text-xs text-slate-400">
                      Click on a user in the table to see details, roles, and recent activity.
                    </p>
                  )}
                </div>
              </aside>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Users;
