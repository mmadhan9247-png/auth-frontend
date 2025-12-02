import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#1f2937"
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#64748b", fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#64748b", fontSize: 12 }}
        />
        <Tooltip />
        <Bar
          dataKey="value"
          fill="url(#salesGradient)"
          radius={[10, 10, 4, 4]}
          barSize={24}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesBarChart;
