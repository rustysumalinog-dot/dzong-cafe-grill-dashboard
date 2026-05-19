import { branch } from "@/lib/mock-data";
import { Bell, Search } from "lucide-react";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="bg-card border-b border-border px-4 sm:px-8 py-4 flex items-center justify-between gap-3">
      <div className="min-w-0 pl-10 lg:pl-0">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm text-muted mt-0.5 truncate">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search orders, items, staff..."
            className="pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-background w-56 lg:w-72 focus:outline-none focus:ring-2 focus:ring-dzong-terracotta/30"
          />
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 rounded-lg hover:bg-background border border-border"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-dzong-terracotta" />
        </button>
        <div className="flex items-center gap-2 sm:pl-3 sm:border-l border-border">
          <div className="w-9 h-9 rounded-full bg-dzong-amber flex items-center justify-center font-bold text-dzong-terracotta-dark text-sm">
            {branch.manager
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-semibold">{branch.manager}</div>
            <div className="text-xs text-muted">Branch Manager</div>
          </div>
        </div>
      </div>
    </header>
  );
}
