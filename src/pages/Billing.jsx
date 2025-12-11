import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MetricCard from "../components/MetricCard";
import RevenueAreaChart from "../components/Charts/AreaChart";
import CategoryPieChart from "../components/Charts/PieChart";
import ConfirmModal from "../components/ConfirmModal";

const invoices = [
  { id: "INV-2025-12-01", date: "Dec 1, 2025", amount: "$480.00", status: "Paid", period: "Dec 1 – Dec 31, 2025" },
  { id: "INV-2025-11-01", date: "Nov 1, 2025", amount: "$480.00", status: "Paid", period: "Nov 1 – Nov 30, 2025" },
  { id: "INV-2025-10-01", date: "Oct 1, 2025", amount: "$456.00", status: "Paid", period: "Oct 1 – Oct 31, 2025" },
];

const payments = [
  { id: 1, date: "Dec 1, 2025", method: "Visa •••• 2345", amount: "$480.00", status: "Succeeded" },
  { id: 2, date: "Nov 1, 2025", method: "Visa •••• 2345", amount: "$480.00", status: "Succeeded" },
  { id: 3, date: "Oct 1, 2025", method: "Visa •••• 2345", amount: "$456.00", status: "Succeeded" },
];

const billingKpiStats = [
  { title: "MRR", value: "$480", change: "+18%", changeLabel: "vs last quarter" },
  { title: "Invoices paid", value: "3", changeLabel: "Last 3 months" },
  { title: "Avg. invoice", value: "$472", changeLabel: "Rolling average" },
  { title: "Payment success", value: "100%", changeLabel: "Last 90 days" },
];

const revenueTrend = [
  { label: "Oct", value: 456 },
  { label: "Nov", value: 480 },
  { label: "Dec", value: 480 },
];

const billingMix = [
  { name: "Subscription", value: 82 },
  { name: "Overage", value: 10 },
  { name: "Discounts", value: 8 },
];

const Billing = () => {
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

  const handleDownload = (id) => {
    // Here you would call your backend to download the PDF
    console.log("Download invoice", id);
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
            pageTitle="Billing"
            pageSubtitle="Invoices and subscription"
          />

          <main className="flex-1 px-4 pb-8 pt-4 md:px-6 lg:px-8">
            {error && (
              <div className="mb-4 rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-sm text-red-100">
                {error}
              </div>
            )}

            <section className="mb-6">
              <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-4 shadow-xl shadow-slate-950/80 sm:px-5 sm:py-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Current plan
                    </p>
                    <p className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
                      Growth · Monthly
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Billed on the 1st of every month · Next invoice on Jan 1, 2026
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-right text-xs">
                    <p className="text-2xl font-semibold tracking-tight text-slate-50">
                      $480<span className="text-sm text-slate-400">/mo</span>
                    </p>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                      In trial · 12 days left
                    </span>
                    <button
                      type="button"
                      className="mt-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-800"
                    >
                      Manage subscription
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-6">
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {billingKpiStats.map((metric, index) => (
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
                          Recurring revenue
                        </p>
                        <p className="text-sm font-medium text-slate-100">Billing trend</p>
                      </div>
                      <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                        Last 3 invoices
                      </span>
                    </div>
                    <div className="h-64">
                      <RevenueAreaChart data={revenueTrend} />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Billing mix
                        </p>
                        <p className="text-sm font-medium text-slate-100">Breakdown by type</p>
                      </div>
                      <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                        Normalized %
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="h-40 w-40">
                        <CategoryPieChart data={billingMix} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Invoices
                      </p>
                      <p className="text-sm font-medium text-slate-100">Billing history</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownload(invoices[0].id)}
                      className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-800"
                    >
                      Download latest
                    </button>
                  </div>

                  <div className="-mx-2 overflow-x-auto">
                    <table className="min-w-full table-fixed border-separate border-spacing-y-1 text-xs">
                      <thead className="text-slate-500">
                        <tr>
                          <th className="px-2 py-1 text-left font-medium">Invoice</th>
                          <th className="px-2 py-1 text-left font-medium">Period</th>
                          <th className="px-2 py-1 text-left font-medium">Amount</th>
                          <th className="px-2 py-1 text-left font-medium">Status</th>
                          <th className="px-2 py-1 text-right font-medium">Download</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-200">
                        {invoices.map((invoice) => (
                          <tr
                            key={invoice.id}
                            className="rounded-xl border border-transparent bg-slate-900/60 transition hover:border-slate-700 hover:bg-slate-900"
                          >
                            <td className="px-2 py-2">
                              <div className="flex flex-col">
                                <span className="text-[13px] font-medium">{invoice.id}</span>
                                <span className="text-[11px] text-slate-400">{invoice.date}</span>
                              </div>
                            </td>
                            <td className="px-2 py-2 text-[11px] text-slate-400">{invoice.period}</td>
                            <td className="px-2 py-2">{invoice.amount}</td>
                            <td className="px-2 py-2">
                              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                                {invoice.status}
                              </span>
                            </td>
                            <td className="px-2 py-2 text-right">
                              <button
                                type="button"
                                onClick={() => handleDownload(invoice.id)}
                                className="rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-800"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Payment history
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-100">Recent charges</p>
                  </div>
                  <div className="-mx-2 overflow-x-auto">
                    <table className="min-w-full table-fixed border-separate border-spacing-y-1 text-xs">
                      <thead className="text-slate-500">
                        <tr>
                          <th className="px-2 py-1 text-left font-medium">Date</th>
                          <th className="px-2 py-1 text-left font-medium">Method</th>
                          <th className="px-2 py-1 text-left font-medium">Amount</th>
                          <th className="px-2 py-1 text-left font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-200">
                        {payments.map((p) => (
                          <tr key={p.id} className="rounded-xl bg-slate-900/60">
                            <td className="px-2 py-2">{p.date}</td>
                            <td className="px-2 py-2 text-slate-300">{p.method}</td>
                            <td className="px-2 py-2">{p.amount}</td>
                            <td className="px-2 py-2 text-emerald-300">{p.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Subscription info
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-100">Usage and seats</p>
                  </div>
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>Tracked events this month</span>
                      <span className="font-semibold text-slate-50">42.3M / 50M</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-900">
                      <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Resets Jan 1, 2026</span>
                      <span>84% of quota</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span>Billing seats</span>
                      <span className="font-semibold text-slate-50">18 / 20</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/80">
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Billing contacts
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-100">Who receives invoices</p>
                  </div>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-3">
                      <div>
                        <p className="text-[13px] font-medium">Primary contact</p>
                        <p className="text-[11px] text-slate-400">{user?.email || "finance@example.com"}</p>
                      </div>
                      <button
                        type="button"
                        className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-[11px] font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-800"
                      >
                        Edit
                      </button>
                    </div>
                    <button
                      type="button"
                      className="w-full rounded-xl border border-dashed border-slate-700 bg-slate-900/40 px-3 py-2 text-left text-[11px] text-slate-400 hover:border-slate-500 hover:bg-slate-900/60"
                    >
                      + Add additional billing email
                    </button>
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

export default Billing;
