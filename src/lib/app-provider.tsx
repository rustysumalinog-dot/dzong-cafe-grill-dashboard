"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  type BranchCode,
  type BranchData,
  branchList,
  defaultBranchCode,
  getBranchData,
} from "./mock-data";

type Theme = "light" | "dark";

interface AppState {
  branchCode: BranchCode;
  setBranchCode: (code: BranchCode) => void;
  data: BranchData;
  theme: Theme;
  toggleTheme: () => void;
  search: string;
  setSearch: (v: string) => void;
  branches: typeof branchList;
}

const AppContext = createContext<AppState | null>(null);

const BRANCH_KEY = "dzong:branch";
const THEME_KEY = "dzong:theme";

function readInitialBranch(): BranchCode {
  if (typeof window === "undefined") return defaultBranchCode;
  const stored = window.localStorage.getItem(BRANCH_KEY);
  if (stored === "LUB" || stored === "ELN" || stored === "COR") return stored;
  return defaultBranchCode;
}

function readInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [branchCode, setBranchCodeState] = useState<BranchCode>(defaultBranchCode);
  const [theme, setTheme] = useState<Theme>("light");
  const [search, setSearch] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setBranchCodeState(readInitialBranch());
    setTheme(readInitialTheme());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(BRANCH_KEY, branchCode);
  }, [branchCode, hydrated]);

  const setBranchCode = useCallback((code: BranchCode) => {
    setBranchCodeState(code);
    setSearch("");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo<AppState>(
    () => ({
      branchCode,
      setBranchCode,
      data: getBranchData(branchCode),
      theme,
      toggleTheme,
      search,
      setSearch,
      branches: branchList,
    }),
    [branchCode, theme, search, setBranchCode, toggleTheme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
