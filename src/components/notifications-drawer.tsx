"use client";

import { useEffect, useState } from "react";
import { Bell, X, AlertOctagon, MessageSquareWarning, Ship, UserX } from "lucide-react";
import { useApp } from "@/lib/app-provider";
import { cn } from "@/lib/utils";

interface NotificationItem {
  id: string;
  icon: typeof Bell;
  title: string;
  body: string;
  time: string;
  severity: "critical" | "warning" | "info";
}

function buildNotifications(branchCode: string, criticalSkuCount: number, lateCount: number, unansweredReviews: number, ferryDays: number): NotificationItem[] {
  const items: NotificationItem[] = [];

  if (criticalSkuCount > 0) {
    items.push({
      id: "stock-critical",
      icon: AlertOctagon,
      title: `${criticalSkuCount} item${criticalSkuCount > 1 ? "s" : ""} at critical stock`,
      body: "Below safety stock level. Prepare a supply order before the next ferry cutoff.",
      time: "Just now",
      severity: "critical",
    });
  }

  if (ferryDays <= 2) {
    items.push({
      id: "ferry-near",
      icon: Ship,
      title: `Next ferry in ${ferryDays} day${ferryDays !== 1 ? "s" : ""}`,
      body: "Order cutoff approaching. Confirm supply requirements with the head cook.",
      time: "2h ago",
      severity: "warning",
    });
  }

  if (lateCount > 0) {
    items.push({
      id: "staff-late",
      icon: UserX,
      title: `${lateCount} staff member${lateCount > 1 ? "s" : ""} late today`,
      body: "Check the staff page for shift coverage.",
      time: "1h ago",
      severity: "warning",
    });
  }

  if (unansweredReviews > 0) {
    items.push({
      id: "reviews-pending",
      icon: MessageSquareWarning,
      title: `${unansweredReviews} review${unansweredReviews > 1 ? "s" : ""} awaiting reply`,
      body: "Maintain response rate above 90% to support the brand score.",
      time: "Earlier today",
      severity: "info",
    });
  }

  if (items.length === 0) {
    items.push({
      id: "all-clear",
      icon: Bell,
      title: "Walang alerts ngayon",
      body: `Smooth sailing sa ${branchCode} branch. Lahat ng KPI ay nasa target.`,
      time: "—",
      severity: "info",
    });
  }

  return items;
}

const severityStyles: Record<NotificationItem["severity"], string> = {
  critical: "text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-300",
  warning: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300",
  info: "text-sky-600 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-300",
};

export function NotificationsDrawer() {
  const { data, branchCode } = useApp();
  const [open, setOpen] = useState(false);

  const criticalSkuCount = data.inventory.filter((i) => i.status === "critical").length;
  const lateCount = data.staff.filter((s) => s.status === "late").length;
  const unansweredReviews = data.reviews.filter((r) => !r.responded).length;
  const notifications = buildNotifications(
    branchCode,
    criticalSkuCount,
    lateCount,
    unansweredReviews,
    data.nextFerry.daysAway
  );
  const unread = notifications.filter((n) => n.id !== "all-clear").length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Notifications (${unread})`}
        className="relative p-2 rounded-lg hover:bg-background border border-border text-foreground transition-colors"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-dzong-terracotta text-white text-[10px] font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <aside
            role="dialog"
            aria-label="Notifications"
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-96 bg-card border-l border-border flex flex-col shadow-2xl"
          >
            <header className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">Notifications</h2>
                <p className="text-xs text-muted">{unread} active alert{unread !== 1 ? "s" : ""}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close notifications"
                className="p-1.5 rounded-lg hover:bg-background text-muted"
              >
                <X size={18} />
              </button>
            </header>
            <ul className="flex-1 overflow-y-auto divide-y divide-border">
              {notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <li key={n.id} className="px-6 py-4 hover:bg-background/60 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={cn("w-9 h-9 shrink-0 rounded-lg flex items-center justify-center", severityStyles[n.severity])}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <div className="font-semibold text-sm text-foreground">{n.title}</div>
                          <div className="text-xs text-muted shrink-0">{n.time}</div>
                        </div>
                        <p className="text-xs text-muted mt-1 leading-relaxed">{n.body}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <footer className="px-6 py-3 border-t border-border text-center">
              <span className="text-xs text-muted">Auto-refresh every 60s · Demo data</span>
            </footer>
          </aside>
        </>
      )}
    </>
  );
}
