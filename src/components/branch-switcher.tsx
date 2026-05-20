"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, MapPin, Check } from "lucide-react";
import { useApp } from "@/lib/app-provider";
import { cn } from "@/lib/utils";

export function BranchSwitcher() {
  const { branchCode, setBranchCode, branches, data } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg bg-card hover:bg-background transition-colors"
      >
        <MapPin size={15} className="text-dzong-terracotta shrink-0" />
        <div className="text-left min-w-0 hidden sm:block">
          <div className="text-[10px] text-muted leading-tight uppercase tracking-wide">Branch</div>
          <div className="font-semibold text-foreground leading-tight truncate max-w-[120px]">
            {data.branch.shortLocation}
          </div>
        </div>
        <span className="font-semibold text-foreground sm:hidden">
          {data.branch.shortLocation}
        </span>
        <ChevronDown size={14} className={cn("text-muted transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute top-full left-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
        >
          <li className="px-4 py-2 text-[10px] uppercase tracking-wide text-muted border-b border-border bg-background/50">
            Select branch
          </li>
          {branches.map((b) => {
            const selected = b.code === branchCode;
            return (
              <li key={b.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    setBranchCode(b.code);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-background transition-colors",
                    selected && "bg-dzong-amber/10"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold",
                      selected
                        ? "bg-dzong-terracotta text-white"
                        : "bg-dzong-amber/20 text-dzong-terracotta-dark"
                    )}
                  >
                    {b.code}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{b.location}</div>
                    <div className="text-xs text-muted truncate">{b.address}</div>
                  </div>
                  {selected && <Check size={16} className="text-dzong-terracotta shrink-0 mt-1" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
