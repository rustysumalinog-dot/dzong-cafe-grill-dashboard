"use client";

import { Topbar } from "@/components/topbar";
import { KpiCard } from "@/components/kpi-card";
import { SalesChart } from "@/components/charts/sales-chart";
import { TrafficChart } from "@/components/charts/traffic-chart";
import { useApp } from "@/lib/app-provider";
import { formatPHP, formatNumber } from "@/lib/utils";
import {
  DollarSign,
  Receipt,
  ShoppingCart,
  UserCog,
  Ship,
  TrendingUp,
} from "lucide-react";

export default function OverviewPage() {
  const { data } = useApp();
  const { branch, todayKPIs, weekSales, hourlyTraffic, topItems, nextFerry } = data;
  const top5 = topItems.slice(0, 5);

  return (
    <>
      <Topbar
        title="Overview"
        subtitle={`${branch.name} — ${branch.location} · ${new Date().toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`}
      />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="Today's Sales"
            value={formatPHP(todayKPIs.sales)}
            delta={todayKPIs.salesDeltaPct}
            hint="vs last Sunday"
            icon={DollarSign}
          />
          <KpiCard
            label="Transactions"
            value={formatNumber(todayKPIs.transactions)}
            delta={todayKPIs.transactionsDeltaPct}
            hint="vs last Sunday"
            icon={Receipt}
          />
          <KpiCard
            label="Avg. Ticket"
            value={formatPHP(todayKPIs.avgTicket)}
            delta={todayKPIs.avgTicketDeltaPct}
            hint="per order"
            icon={ShoppingCart}
          />
          <KpiCard
            label="Labor Cost %"
            value={`${todayKPIs.laborCostPct}%`}
            delta={todayKPIs.laborCostDeltaPct}
            hint="target ≤ 22%"
            icon={UserCog}
            invertDelta
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <div>
                <h2 className="font-semibold text-lg text-foreground">Sales this week</h2>
                <p className="text-xs text-muted">Mon – Sun, in PHP</p>
              </div>
              <div className="text-xs px-2.5 py-1 rounded-full bg-dzong-amber/20 text-dzong-terracotta font-semibold inline-flex items-center gap-1">
                <TrendingUp size={12} /> Weekend spike
              </div>
            </div>
            <SalesChart data={weekSales} />
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <Ship size={18} className="text-dzong-terracotta" />
              <h2 className="font-semibold text-lg text-foreground">Next ferry delivery</h2>
            </div>
            <p className="text-xs text-muted mb-4">{nextFerry.vessel}</p>

            <div className="text-4xl font-black text-dzong-terracotta">
              {nextFerry.daysAway}
              <span className="text-base font-medium text-muted ml-1">days</span>
            </div>
            <div className="text-sm text-foreground mt-1">
              {new Date(nextFerry.date).toLocaleDateString("en-PH", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>

            <div className="mt-5 pt-5 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Port</span>
                <span className="font-medium text-foreground">{nextFerry.port}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Order cutoff</span>
                <span className="font-medium text-foreground">{nextFerry.cutoffOrder}</span>
              </div>
            </div>

            <button className="mt-5 w-full py-2 rounded-lg bg-dzong-terracotta text-white text-sm font-semibold hover:bg-dzong-terracotta-dark transition">
              Prepare supply order
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold text-lg text-foreground mb-1">Hourly customer traffic</h2>
            <p className="text-xs text-muted mb-4">Today · {branch.hours}</p>
            <TrafficChart data={hourlyTraffic} />
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold text-lg text-foreground mb-1">Top items today</h2>
            <p className="text-xs text-muted mb-4">By units sold</p>
            <ul className="space-y-3">
              {top5.map((item, i) => (
                <li key={item.name} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-dzong-amber/30 text-dzong-terracotta flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{item.name}</div>
                    <div className="text-xs text-muted">{formatPHP(item.revenue)}</div>
                  </div>
                  <div className="text-sm font-semibold text-foreground">{item.sold}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
