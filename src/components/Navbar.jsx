import React from "react";

const Navbar = ({
  onMenuClick,
  user,
  onLogout,
  pageTitle = "Dashboard",
  pageSubtitle = "Analytics overview",
}) => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-900/80 text-slate-200 hover:bg-slate-800 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-4 rounded-full bg-slate-200" />
              <span className="block h-0.5 w-3 rounded-full bg-slate-400" />
            </span>
          </button>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {pageTitle}
            </p>
            <p className="text-sm font-medium text-slate-100 md:text-base">
              {pageSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-[11px] text-slate-400 hover:border-slate-700 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
            <span>Live metrics</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden flex-col items-end sm:flex">
              <span className="text-xs font-medium text-slate-100">
                {user?.username || "Logged in"}
              </span>
              <span className="text-[11px] text-slate-500">
                {user?.email || "Session active"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-sky-500 to-fuchsia-500 text-xs font-semibold text-slate-950 shadow-lg shadow-indigo-500/40">
                {(user?.username && user.username[0]?.toUpperCase()) || "U"}
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="hidden rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-slate-800 md:inline-flex"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
