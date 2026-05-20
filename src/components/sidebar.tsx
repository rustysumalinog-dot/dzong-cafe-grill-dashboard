"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, ShoppingBag, Package, Users, Star, Menu, X } from "lucide-react";
import { useApp } from "@/lib/app-provider";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/sales", label: "Sales & POS", icon: ShoppingBag },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/staff", label: "Staff", icon: Users },
  { href: "/reviews", label: "Reviews", icon: Star },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data } = useApp();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        className="lg:hidden fixed top-3.5 left-3 z-40 p-2 rounded-lg bg-gray-900 text-white shadow-lg"
      >
        <Menu size={20} />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        />
      )}

      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 shrink-0 bg-gray-900 text-white flex flex-col transition-transform duration-200 ease-out",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-dzong-amber flex items-center justify-center text-dzong-terracotta-dark font-black text-lg">
              D
            </div>
            <div>
              <div className="font-bold text-base leading-tight">Dzong Cafe & Grill</div>
              <div className="text-xs text-white/70">Branch Console</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
            className="lg:hidden p-1 -mr-1 text-white/70 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-white text-dzong-terracotta"
                    : "text-white/85 hover:bg-white/10"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 text-xs text-white/70">
          <div className="font-semibold text-white">{data.branch.location}</div>
          <div className="font-mono opacity-70">{data.branch.fullCode}</div>
          <div className="mt-2 opacity-60">v0.2.0 · Portfolio Demo</div>
          <div className="mt-1 opacity-50 text-[10px] leading-tight">
            Fictional brand. Not a real business.
          </div>
        </div>
      </aside>
    </>
  );
}
