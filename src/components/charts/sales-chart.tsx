"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatPHP } from "@/lib/utils";
import { useApp } from "@/lib/app-provider";

export function SalesChart({ data }: { data: { day: string; sales: number }[] }) {
  const { theme } = useApp();
  const isDark = theme === "dark";
  const gridStroke = isDark ? "#2a2723" : "#e5e7eb";
  const axisStroke = isDark ? "#9a9088" : "#6b7280";
  const lineColor = isDark ? "#ea580c" : "#C2410C";
  const tooltipBg = isDark ? "#1a1815" : "#ffffff";
  const tooltipBorder = isDark ? "#2a2723" : "#e5e7eb";
  const tooltipText = isDark ? "#f5f0e8" : "#171717";

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={lineColor} stopOpacity={0.4} />
            <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
        <XAxis dataKey="day" stroke={axisStroke} fontSize={12} />
        <YAxis
          stroke={axisStroke}
          fontSize={12}
          tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(v) => formatPHP(Number(v))}
          contentStyle={{
            borderRadius: 8,
            border: `1px solid ${tooltipBorder}`,
            backgroundColor: tooltipBg,
            color: tooltipText,
          }}
          labelStyle={{ color: tooltipText }}
        />
        <Area
          type="monotone"
          dataKey="sales"
          stroke={lineColor}
          strokeWidth={2}
          fill="url(#salesGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
