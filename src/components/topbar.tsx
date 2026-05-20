"use client";

import { useApp } from "@/lib/app-provider";
import { BranchSwitcher } from "./branch-switcher";
import { LiveClock } from "./live-clock";
import { NotificationsDrawer } from "./notifications-drawer";
import { SearchInput } from "./search-input";
import { ThemeToggle } from "./theme-toggle";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const { data } = useApp();
  const initials = data.branch.manager
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <header className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0 pl-10 lg:pl-0 flex-1 lg:flex-initial">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">{title}</h1>
          <LiveClock />
        </div>
        {subtitle && <p className="text-xs sm:text-sm text-muted mt-0.5 truncate">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
        <BranchSwitcher />
        <SearchInput />
        <ThemeToggle />
        <NotificationsDrawer />
        <div className="hidden md:flex items-center gap-2 pl-3 border-l border-border">
          <div
            className="w-9 h-9 rounded-full bg-dzong-amber flex items-center justify-center font-bold text-dzong-terracotta-dark text-sm"
            aria-label={data.branch.manager}
          >
            {initials}
          </div>
          <div className="hidden lg:block">
            <div className="text-sm font-semibold text-foreground">{data.branch.manager}</div>
            <div className="text-xs text-muted">Branch Manager</div>
          </div>
        </div>
      </div>
    </header>
  );
}
