"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Package, Users, Star } from "lucide-react";
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

  return (
    <aside className="w-64 shrink-0 bg-gray-900 text-white flex flex-col">
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-dzong-amber flex items-center justify-center text-dzong-terracotta-dark font-black text-lg">
            D
          </div>
          <div>
            <div className="font-bold text-base leading-tight">Dzong Cafe & Grill</div>
            <div className="text-xs text-white/70">Branch Console</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
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
        <div className="font-semibold text-white">Lubang Island</div>
        <div>Occidental Mindoro</div>
        <div className="mt-2 opacity-60">v0.1.0 · Portfolio Demo</div>
        <div className="mt-1 opacity-50 text-[10px] leading-tight">
          Fictional brand. Not a real business.
        </div>
      </div>
    </aside>
  );
}
