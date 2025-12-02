import React from "react";

const gradientClasses = [
  "from-indigo-500/25 via-sky-500/10 to-fuchsia-500/20",
  "from-emerald-500/25 via-teal-500/10 to-cyan-500/20",
  "from-amber-500/25 via-orange-500/10 to-rose-500/20",
  "from-fuchsia-500/25 via-purple-500/10 to-indigo-500/20",
];

const MetricCard = ({ title, value, index }) => {
  const gradient = gradientClasses[index % gradientClasses.length];

  return (
    <div
      className={`group rounded-2xl border border-slate-800/80 bg-slate-950/80 bg-gradient-to-br ${gradient} p-4 shadow-xl shadow-slate-950/70 transition hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl hover:shadow-fuchsia-500/25`}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          {title}
        </p>
        <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400 group-hover:bg-slate-900 group-hover:text-slate-200">
          Live
        </span>
      </div>
      <p className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-400">
        +4.2% vs last week
      </p>
    </div>
  );
};

export default MetricCard;
