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
import { useApp } from "@/lib/app-provider";

export function TrafficChart({ data }: { data: { hour: string; customers: number }[] }) {
  const { theme } = useApp();
  const isDark = theme === "dark";
  const gridStroke = isDark ? "#2a2723" : "#e5e7eb";
  const axisStroke = isDark ? "#9a9088" : "#6b7280";
  const barColor = isDark ? "#fbbf24" : "#F59E0B";
  const cursorFill = isDark ? "rgba(251, 191, 36, 0.12)" : "#fed7aa";
  const tooltipBg = isDark ? "#1a1815" : "#ffffff";
  const tooltipBorder = isDark ? "#2a2723" : "#e5e7eb";
  const tooltipText = isDark ? "#f5f0e8" : "#171717";

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
        <XAxis dataKey="hour" stroke={axisStroke} fontSize={11} />
        <YAxis stroke={axisStroke} fontSize={12} />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: `1px solid ${tooltipBorder}`,
            backgroundColor: tooltipBg,
            color: tooltipText,
          }}
          labelStyle={{ color: tooltipText }}
          cursor={{ fill: cursorFill }}
        />
        <Bar dataKey="customers" fill={barColor} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
