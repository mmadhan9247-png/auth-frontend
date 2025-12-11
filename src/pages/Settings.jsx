import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UserActivityLineChart from "../components/Charts/LineChart";
import ConfirmModal from "../components/ConfirmModal";

const loginActivity = [
  { day: "Mon", value: 18 },
  { day: "Tue", value: 22 },
  { day: "Wed", value: 19 },
  { day: "Thu", value: 24 },
  { day: "Fri", value: 28 },
  { day: "Sat", value: 14 },
  { day: "Sun", value: 11 },
];

const Settings = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
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

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

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

  const initials = user?.username
    ? user.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AR";

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
            pageTitle="Settings"
            pageSubtitle="Profile, security, notifications"
          />

          <main className="flex-1 px-4 pb-8 pt-4 md:px-6 lg:px-8">
            {error && (
              <div className="mb-4 rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-sm text-red-100">
                {error}
              </div>
            )}

            <section className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]">
              <div>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Profile settings
                      </p>
                      <p className="text-sm font-medium text-slate-100">Basic account information</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-sky-500 to-fuchsia-500 text-sm font-semibold text-slate-950">
                      {initials}
                    </div>
                    <div className="text-xs text-slate-400">
                      <p className="text-[13px] font-medium text-slate-100">{user?.username || "Aurora Admin"}</p>
                      <p>{user?.email || "you@company.com"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 text-xs">
                    <div className="space-y-2">
                      <label className="block text-[11px] uppercase tracking-[0.16em] text-slate-500">
                        Full name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.username || "Aurora Admin"}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:outline-none focus:ring-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[11px] uppercase tracking-[0.16em] text-slate-500">
                        Work email
                      </label>
                      <input
                        type="email"
                        defaultValue={user?.email || "you@company.com"}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end text-xs">
                    <button
                      type="button"
                      className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-800"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div className="mb-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Security
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-100">Protect your account</p>
                  </div>
                  <div className="space-y-3 text-xs text-slate-300">
                    <label className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-100">Two-factor authentication</p>
                        <p className="text-[11px] text-slate-400">
                          Require an extra code when logging in from a new device.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={twoFactor}
                        onChange={() => setTwoFactor(!twoFactor)}
                        className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-indigo-500"
                      />
                    </label>
                    <label className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-100">Login alerts</p>
                        <p className="text-[11px] text-slate-400">
                          Email me when a login happens from a new location.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={loginAlerts}
                        onChange={() => setLoginAlerts(!loginAlerts)}
                        className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-indigo-500"
                      />
                    </label>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div className="mb-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Theme
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-100">Appearance</p>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDarkTheme(true)}
                      className={`flex-1 rounded-xl border px-3 py-2 font-medium ${
                        darkTheme
                          ? "border-slate-100 bg-slate-100 text-slate-900"
                          : "border-slate-700 bg-slate-900/80 text-slate-100"
                      }`}
                    >
                      Dark
                    </button>
                    <button
                      type="button"
                      onClick={() => setDarkTheme(false)}
                      className={`flex-1 rounded-xl border px-3 py-2 font-medium ${
                        !darkTheme
                          ? "border-slate-100 bg-slate-100 text-slate-900"
                          : "border-slate-700 bg-slate-900/80 text-slate-100"
                      }`}
                    >
                      Light
                    </button>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">
                    The dashboard currently uses a dark theme. This toggle is stored locally and can
                    be wired to a global theme switch later.
                  </p>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div className="mb-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Notifications
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-100">Email preferences</p>
                  </div>
                  <div className="space-y-3 text-xs text-slate-300">
                    <label className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-100">Weekly product digest</p>
                        <p className="text-[11px] text-slate-400">
                          Summary of key changes and feature launches.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={weeklyDigest}
                        onChange={() => setWeeklyDigest(!weeklyDigest)}
                        className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-indigo-500"
                      />
                    </label>
                    <label className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-100">Product updates</p>
                        <p className="text-[11px] text-slate-400">
                          Occasional emails about new analytics capabilities.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={productUpdates}
                        onChange={() => setProductUpdates(!productUpdates)}
                        className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-indigo-500"
                      />
                    </label>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/90 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Login activity
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-100">Sessions this week</p>
                      </div>
                      <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                        Security signal
                      </span>
                    </div>
                    <div className="h-40">
                      <UserActivityLineChart data={loginActivity} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-400 shadow-xl shadow-slate-950/80">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                    Account region
                  </p>
                  <p className="mt-1 text-sm text-slate-100">Data and exports</p>
                  <p className="mt-3">
                    Your analytics data is stored in the <span className="font-medium">EU</span> region.
                    Contact support if you need to migrate to a different data region.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
