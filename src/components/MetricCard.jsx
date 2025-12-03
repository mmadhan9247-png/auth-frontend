import React from "react";

const accentGradients = [
  "from-indigo-500 to-sky-500",
  "from-emerald-500 to-lime-500",
  "from-amber-500 to-orange-500",
  "from-fuchsia-500 to-purple-500",
];

const MetricCard = ({ title, value, index, change, changeLabel }) => {
  const accent = accentGradients[index % accentGradients.length];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/85 p-4 shadow-xl shadow-slate-950/70 transition hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl hover:shadow-fuchsia-500/25">
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />

      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          {title}
        </p>
        <button
          type="button"
          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/80 text-slate-500 ring-slate-700 transition group-hover:bg-slate-900 group-hover:text-slate-200"
        >
          <span className="sr-only">Open menu</span>
          <span className="flex flex-col gap-0.5 text-[8px] leading-[0]"><span>•</span><span>•</span><span>•</span></span>
        </button>
      </div>

      <p className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
        {value}
      </p>

      {(change || changeLabel) && (
        <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
          {change && (
            <span className="font-medium text-emerald-400">
              ▲ {change}
            </span>
          )}
          {changeLabel && <span className="text-slate-400">{changeLabel}</span>}
        </p>
      )}
    </div>
  );
};

export default MetricCard;
