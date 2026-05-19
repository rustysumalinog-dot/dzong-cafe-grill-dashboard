import { Topbar } from "@/components/topbar";
import { KpiCard } from "@/components/kpi-card";
import { SalesChart } from "@/components/charts/sales-chart";
import { TrafficChart } from "@/components/charts/traffic-chart";
import { weekSales, hourlyTraffic, topItems, todayKPIs } from "@/lib/mock-data";
import { formatPHP, formatNumber } from "@/lib/utils";
import { DollarSign, Receipt, ShoppingCart, Clock } from "lucide-react";

export default function SalesPage() {
  const totalUnits = topItems.reduce((s, i) => s + i.sold, 0);
  const totalRevenue = topItems.reduce((s, i) => s + i.revenue, 0);
  const peakHour = hourlyTraffic.reduce((a, b) => (a.customers > b.customers ? a : b));

  return (
    <>
      <Topbar title="Sales & POS" subtitle="Daily transactions, top items, hourly traffic" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Today's Sales" value={formatPHP(todayKPIs.sales)} delta={todayKPIs.salesDeltaPct} icon={DollarSign} hint="vs last Sun" />
          <KpiCard label="Transactions" value={formatNumber(todayKPIs.transactions)} delta={todayKPIs.transactionsDeltaPct} icon={Receipt} hint="orders today" />
          <KpiCard label="Avg. Ticket" value={formatPHP(todayKPIs.avgTicket)} delta={todayKPIs.avgTicketDeltaPct} icon={ShoppingCart} hint="per order" />
          <KpiCard label="Peak Hour" value={peakHour.hour} icon={Clock} hint={`${peakHour.customers} customers`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold text-lg mb-1">Weekly sales trend</h2>
            <p className="text-xs text-muted mb-4">Last 7 days</p>
            <SalesChart data={weekSales} />
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold text-lg mb-1">Hourly traffic</h2>
            <p className="text-xs text-muted mb-4">Customers per hour today</p>
            <TrafficChart data={hourlyTraffic} />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex justify-between items-end">
            <div>
              <h2 className="font-semibold text-lg">Top items today</h2>
              <p className="text-xs text-muted">{formatNumber(totalUnits)} units · {formatPHP(totalRevenue)} revenue</p>
            </div>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-background text-muted text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Item</th>
                <th className="text-left px-6 py-3 font-semibold">Category</th>
                <th className="text-right px-6 py-3 font-semibold">Units sold</th>
                <th className="text-right px-6 py-3 font-semibold">Revenue</th>
                <th className="text-right px-6 py-3 font-semibold">Avg. price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {topItems.map((item) => (
                <tr key={item.name} className="hover:bg-background/60">
                  <td className="px-6 py-3 font-medium">{item.name}</td>
                  <td className="px-6 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-dzong-amber/20 text-dzong-terracotta-dark font-semibold">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right tabular-nums">{item.sold}</td>
                  <td className="px-6 py-3 text-right tabular-nums font-semibold">{formatPHP(item.revenue)}</td>
                  <td className="px-6 py-3 text-right tabular-nums text-muted">{formatPHP(Math.round(item.revenue / item.sold))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </main>
    </>
  );
}
