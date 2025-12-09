import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Overview", badge: "Live", to: "/dashboard" },
  { label: "Analytics", badge: "New", to: "/analytics" },
  { label: "Users", to: "/users" },
  { label: "Billing", to: "/billing" },
  { label: "Settings", to: "/settings" },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-800/80 bg-slate-950/95 shadow-2xl shadow-slate-950/80 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col px-4 py-5">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-fuchsia-500 text-xs font-semibold text-slate-950 shadow-lg shadow-indigo-500/40">
                AR
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight text-slate-50">
                  Aurora
                </div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  Analytics
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-800 bg-slate-900/80 text-slate-300 hover:bg-slate-800 lg:hidden"
            >
              <span className="sr-only">Close sidebar</span>
              <span className="h-3 w-3 rotate-45 border-b border-r border-slate-300" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/dashboard"}
                className={({ isActive }) =>
                  `group flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-medium transition no-underline ${
                    isActive
                      ? "border-slate-700 bg-slate-900/80 text-slate-50"
                      : "border-transparent bg-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-900/70 hover:text-slate-50"
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-indigo-400" />
                  <span>{item.label}</span>
                </span>
                {item.badge && (
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 group-hover:bg-slate-800 group-hover:text-indigo-300">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <div className="rounded-xl border border-slate-800 bg-gradient-to-br from-indigo-500/15 via-sky-500/5 to-fuchsia-500/10 px-3.5 py-3 text-xs text-slate-300 shadow-lg shadow-slate-950/70">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Usage
                </span>
                <span className="text-[11px] text-slate-500">72% capacity</span>
              </div>
              <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-900">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500" />
              </div>
              <p className="text-[11px] text-slate-500">
                Upgrade to unlock higher rate limits and additional workspaces.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
