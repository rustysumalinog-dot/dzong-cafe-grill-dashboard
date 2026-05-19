import { Topbar } from "@/components/topbar";
import { KpiCard } from "@/components/kpi-card";
import { staff, todayKPIs } from "@/lib/mock-data";
import { cn, formatPHP } from "@/lib/utils";
import { Users, UserCheck, UserX, Clock } from "lucide-react";

const statusStyles: Record<string, string> = {
  in: "bg-green-100 text-green-700",
  late: "bg-amber-100 text-amber-700",
  off: "bg-gray-100 text-gray-600",
};

const statusLabel: Record<string, string> = {
  in: "Clocked in",
  late: "Late",
  off: "Off today",
};

export default function StaffPage() {
  const onShift = staff.filter((s) => s.status === "in").length;
  const late = staff.filter((s) => s.status === "late").length;
  const off = staff.filter((s) => s.status === "off").length;

  return (
    <>
      <Topbar title="Staff & Scheduling" subtitle="Today's roster, attendance, labor cost" />
      <main className="flex-1 p-8 space-y-6">
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
            <h2 className="font-semibold text-lg">Today&apos;s roster</h2>
            <p className="text-xs text-muted">Shift assignments and attendance</p>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-background text-muted text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Employee</th>
                <th className="text-left px-6 py-3 font-semibold">Role</th>
                <th className="text-left px-6 py-3 font-semibold">Shift</th>
                <th className="text-left px-6 py-3 font-semibold">Status</th>
                <th className="text-right px-6 py-3 font-semibold">Hourly rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {staff.map((s) => (
                <tr key={s.id} className="hover:bg-background/60">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-dzong-amber flex items-center justify-center text-xs font-bold text-dzong-terracotta-dark">
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-muted font-mono">{s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3">{s.role}</td>
                  <td className="px-6 py-3 text-muted">{s.shift}</td>
                  <td className="px-6 py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-semibold", statusStyles[s.status])}>
                      {statusLabel[s.status]}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right tabular-nums">{formatPHP(s.hourlyRate)}/hr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
