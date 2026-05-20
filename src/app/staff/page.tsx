"use client";

import { useMemo } from "react";
import { Topbar } from "@/components/topbar";
import { KpiCard } from "@/components/kpi-card";
import { SortableTH } from "@/components/sortable-th";
import { useApp } from "@/lib/app-provider";
import { useTableSort } from "@/lib/use-table-sort";
import type { StaffMember } from "@/lib/mock-data";
import { cn, formatPHP } from "@/lib/utils";
import { Users, UserCheck, UserX, Clock } from "lucide-react";

type StaffKey = "name" | "role" | "shift" | "status" | "hourlyRate";

const statusStyles: Record<string, string> = {
  in: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300",
  late: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  off: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
};

const statusLabel: Record<string, string> = {
  in: "Clocked in",
  late: "Late",
  off: "Off today",
};

const statusOrder: Record<string, number> = { late: 0, in: 1, off: 2 };

export default function StaffPage() {
  const { data, search } = useApp();
  const { staff, todayKPIs } = data;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return staff;
    return staff.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        statusLabel[s.status].toLowerCase().includes(q)
    );
  }, [staff, search]);

  const accessor = (row: StaffMember, key: StaffKey) => {
    if (key === "status") return statusOrder[row.status];
    return row[key];
  };

  const { sort, sorted, toggle } = useTableSort<StaffMember, StaffKey>(
    filtered,
    { key: "status", dir: "asc" },
    accessor
  );

  const onShift = staff.filter((s) => s.status === "in").length;
  const late = staff.filter((s) => s.status === "late").length;
  const off = staff.filter((s) => s.status === "off").length;

  return (
    <>
      <Topbar title="Staff & Scheduling" subtitle="Today's roster, attendance, labor cost" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Total crew" value={staff.length.toString()} icon={Users} hint="active employees" />
          <KpiCard label="On shift" value={onShift.toString()} icon={UserCheck} hint="clocked in" />
          <KpiCard label="Late / off" value={`${late} / ${off}`} icon={UserX} hint="today" />
          <KpiCard
            label="Labor cost %"
            value={`${todayKPIs.laborCostPct}%`}
            delta={todayKPIs.laborCostDeltaPct}
            icon={Clock}
            hint="target ≤ 22%"
            invertDelta
          />
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-semibold text-lg text-foreground">Today&apos;s roster</h2>
            <p className="text-xs text-muted">
              Shift assignments and attendance{search && ` · filtered by "${search}"`}
            </p>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[680px]">
            <thead className="bg-background text-muted text-xs uppercase tracking-wide">
              <tr>
                <SortableTH field="name" active={sort.key} dir={sort.dir} onToggle={toggle}>Employee</SortableTH>
                <SortableTH field="role" active={sort.key} dir={sort.dir} onToggle={toggle}>Role</SortableTH>
                <SortableTH field="shift" active={sort.key} dir={sort.dir} onToggle={toggle}>Shift</SortableTH>
                <SortableTH field="status" active={sort.key} dir={sort.dir} onToggle={toggle}>Status</SortableTH>
                <SortableTH field="hourlyRate" active={sort.key} dir={sort.dir} onToggle={toggle} align="right">Hourly rate</SortableTH>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted text-sm">
                    Walang tugma sa &ldquo;{search}&rdquo;.
                  </td>
                </tr>
              ) : (
                sorted.map((s) => (
                  <tr key={s.id} className="hover:bg-background/60">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-dzong-amber flex items-center justify-center text-xs font-bold text-dzong-terracotta-dark">
                          {s.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{s.name}</div>
                          <div className="text-xs text-muted font-mono">{s.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-foreground">{s.role}</td>
                    <td className="px-6 py-3 text-muted">{s.shift}</td>
                    <td className="px-6 py-3">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-semibold", statusStyles[s.status])}>
                        {statusLabel[s.status]}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right tabular-nums text-foreground">{formatPHP(s.hourlyRate)}/hr</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>
      </main>
    </>
  );
}
