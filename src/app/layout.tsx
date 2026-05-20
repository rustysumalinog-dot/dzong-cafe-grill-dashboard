import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { AppProvider } from "@/lib/app-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dzong.vercel.app"),
  title: {
    default: "Dzong Cafe & Grill — Branch Console",
    template: "%s · Dzong Cafe & Grill",
  },
  description:
    "Branch operations dashboard for Dzong Cafe & Grill. Fictional brand demo showcasing a multi-module restaurant ops console — sales, inventory, staff, and reviews — across three island branches.",
  applicationName: "Dzong Branch Console",
  authors: [{ name: "Rusty Sumalinog", url: "https://github.com/rustysumalinog-dot" }],
  keywords: [
    "restaurant dashboard",
    "branch operations",
    "Next.js",
    "Tailwind",
    "portfolio",
    "Philippines",
  ],
  openGraph: {
    type: "website",
    title: "Dzong Cafe & Grill — Branch Console",
    description:
      "A multi-module restaurant ops dashboard. Live demo built with Next.js 16, Tailwind v4, and Recharts.",
    url: "https://dzong.vercel.app",
    siteName: "Dzong Branch Console",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dzong Cafe & Grill — Branch Console",
    description: "Live restaurant ops dashboard demo · Next.js + Tailwind + Recharts.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('dzong:theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`.trim();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full">
        <AppProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">{children}</div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
