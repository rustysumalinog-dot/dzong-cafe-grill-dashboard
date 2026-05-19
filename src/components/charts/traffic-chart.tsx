"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function TrafficChart({ data }: { data: { hour: string; customers: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
        <XAxis dataKey="hour" stroke="#6b7280" fontSize={11} />
        <YAxis stroke="#6b7280" fontSize={12} />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb" }}
          cursor={{ fill: "#fed7aa" }}
        />
        <Bar dataKey="customers" fill="#F59E0B" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
