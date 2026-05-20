"use client";

import { useMemo } from "react";
import { Topbar } from "@/components/topbar";
import { KpiCard } from "@/components/kpi-card";
import { SortableTH } from "@/components/sortable-th";
import { useApp } from "@/lib/app-provider";
import { useTableSort } from "@/lib/use-table-sort";
import type { InventoryItem } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Package, AlertTriangle, AlertOctagon, Ship } from "lucide-react";

type InvKey = "sku" | "name" | "onHand" | "par" | "status" | "lastDelivery";

const statusStyles: Record<string, string> = {
  ok: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300",
  low: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  critical: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300",
};

const statusLabel: Record<string, string> = {
  ok: "In stock",
  low: "Low",
  critical: "Critical",
};

const statusOrder: Record<string, number> = { critical: 0, low: 1, ok: 2 };

export default function InventoryPage() {
  const { data, search } = useApp();
  const { inventory, nextFerry } = data;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return inventory;
    return inventory.filter(
      (i) =>
        i.sku.toLowerCase().includes(q) ||
        i.name.toLowerCase().includes(q) ||
        statusLabel[i.status].toLowerCase().includes(q)
    );
  }, [inventory, search]);

  const accessor = (row: InventoryItem, key: InvKey) => {
    if (key === "status") return statusOrder[row.status];
    return row[key];
  };

  const { sort, sorted, toggle } = useTableSort<InventoryItem, InvKey>(
    filtered,
    { key: "status", dir: "asc" },
    accessor
  );

  const critical = inventory.filter((i) => i.status === "critical");
  const low = inventory.filter((i) => i.status === "low");

  return (
    <>
      <Topbar title="Inventory & Supply" subtitle="Stock levels, par stock alerts, ferry deliveries" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Total SKUs" value={inventory.length.toString()} icon={Package} hint="tracked items" />
          <KpiCard label="Low stock" value={low.length.toString()} icon={AlertTriangle} hint="need reorder" />
          <KpiCard label="Critical" value={critical.length.toString()} icon={AlertOctagon} hint="below safety stock" />
          <KpiCard label="Next ferry" value={`${nextFerry.daysAway}d`} icon={Ship} hint={nextFerry.vessel} />
        </div>

        {critical.length > 0 && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-5">
            <div className="flex items-start gap-3 flex-wrap">
              <AlertOctagon className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" size={20} />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-red-900 dark:text-red-200">Critical stock alert</h3>
                <p className="text-sm text-red-800 dark:text-red-300 mt-0.5">
                  {critical.length} item(s) below safety stock. Next ferry in {nextFerry.daysAway} days — order cutoff {nextFerry.cutoffOrder}.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {critical.map((c) => (
                    <span key={c.sku} className="text-xs bg-white dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 px-2.5 py-1 rounded-full font-semibold">
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
              <button className="px-4 py-2 rounded-lg bg-dzong-terracotta text-white text-sm font-semibold hover:bg-dzong-terracotta-dark shrink-0">
                Create order
              </button>
            </div>
          </div>
        )}

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-semibold text-lg text-foreground">All inventory</h2>
            <p className="text-xs text-muted">
              Stock vs. par level{search && ` · filtered by "${search}"`}
            </p>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[820px]">
            <thead className="bg-background text-muted text-xs uppercase tracking-wide">
              <tr>
                <SortableTH field="sku" active={sort.key} dir={sort.dir} onToggle={toggle}>SKU</SortableTH>
                <SortableTH field="name" active={sort.key} dir={sort.dir} onToggle={toggle}>Item</SortableTH>
                <SortableTH field="onHand" active={sort.key} dir={sort.dir} onToggle={toggle} align="right">On hand</SortableTH>
                <SortableTH field="par" active={sort.key} dir={sort.dir} onToggle={toggle} align="right">Par</SortableTH>
                <th className="text-left px-6 py-3 font-semibold w-40">Level</th>
                <SortableTH field="status" active={sort.key} dir={sort.dir} onToggle={toggle}>Status</SortableTH>
                <SortableTH field="lastDelivery" active={sort.key} dir={sort.dir} onToggle={toggle}>Last delivery</SortableTH>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-muted text-sm">
                    Walang tugma sa &ldquo;{search}&rdquo;.
                  </td>
                </tr>
              ) : (
                sorted.map((item) => {
                  const pct = Math.min(100, Math.round((item.onHand / item.par) * 100));
                  return (
                    <tr key={item.sku} className="hover:bg-background/60">
                      <td className="px-6 py-3 font-mono text-xs text-muted">{item.sku}</td>
                      <td className="px-6 py-3 font-medium text-foreground">{item.name}</td>
                      <td className="px-6 py-3 text-right tabular-nums font-semibold text-foreground">
                        {item.onHand} <span className="text-xs text-muted font-normal">{item.unit}</span>
                      </td>
                      <td className="px-6 py-3 text-right tabular-nums text-muted">{item.par}</td>
                      <td className="px-6 py-3">
                        <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              item.status === "ok" && "bg-green-500",
                              item.status === "low" && "bg-amber-500",
                              item.status === "critical" && "bg-red-500",
                            )}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className={cn("text-xs px-2 py-0.5 rounded-full font-semibold", statusStyles[item.status])}>
                          {statusLabel[item.status]}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-muted text-xs">{item.lastDelivery}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          </div>
        </div>
      </main>
    </>
  );
}
