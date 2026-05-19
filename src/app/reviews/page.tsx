import { Topbar } from "@/components/topbar";
import { KpiCard } from "@/components/kpi-card";
import { reviews, reviewStats } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Star, MessageSquare, TrendingUp, Reply } from "lucide-react";

const sentimentStyles: Record<string, string> = {
  positive: "bg-green-100 text-green-700",
  neutral: "bg-gray-100 text-gray-600",
  negative: "bg-red-100 text-red-700",
};

const sourceStyles: Record<string, string> = {
  Google: "bg-blue-100 text-blue-700",
  Facebook: "bg-indigo-100 text-indigo-700",
  TripAdvisor: "bg-emerald-100 text-emerald-700",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={14}
          className={cn(n <= rating ? "fill-dzong-amber text-dzong-amber" : "text-gray-300")}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const pendingReply = reviews.filter((r) => !r.responded);

  return (
    <>
      <Topbar title="Customer Reviews" subtitle="Google · Facebook · TripAdvisor" />
      <main className="flex-1 p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Avg. rating" value={`${reviewStats.average} ★`} icon={Star} hint={`${reviewStats.total} total reviews`} />
          <KpiCard label="This week" value={reviewStats.thisWeek.toString()} icon={MessageSquare} hint="new reviews" />
          <KpiCard label="Response rate" value={`${reviewStats.responseRate}%`} icon={Reply} hint="target ≥ 90%" />
          <KpiCard label="Pending replies" value={pendingReply.length.toString()} icon={TrendingUp} hint="awaiting response" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {reviewStats.bySource.map((s) => (
            <div key={s.source} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className={cn("text-xs px-2 py-0.5 rounded-full font-semibold", sourceStyles[s.source])}>
                  {s.source}
                </span>
                <Stars rating={Math.round(s.avg)} />
              </div>
              <div className="text-2xl font-bold">{s.avg.toFixed(1)} <span className="text-base text-muted font-normal">/ 5</span></div>
              <div className="text-xs text-muted mt-1">{s.count} reviews</div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-semibold text-lg">Recent reviews</h2>
            <p className="text-xs text-muted">Most recent first</p>
          </div>
          <ul className="divide-y divide-border">
            {reviews.map((r) => (
              <li key={r.id} className="px-6 py-5 hover:bg-background/60">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-dzong-amber/40 flex items-center justify-center text-dzong-terracotta font-bold text-sm shrink-0">
                    {r.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold">{r.author}</span>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-semibold", sourceStyles[r.source])}>
                        {r.source}
                      </span>
                      <Stars rating={r.rating} />
                      <span className="text-xs text-muted">· {r.date}</span>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-semibold ml-auto", sentimentStyles[r.sentiment])}>
                        {r.sentiment}
                      </span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{r.text}</p>
                    <div className="mt-3 flex items-center gap-3">
                      {r.responded ? (
                        <span className="text-xs text-green-700 inline-flex items-center gap-1 font-semibold">
                          <Reply size={12} /> Responded
                        </span>
                      ) : (
                        <button className="text-xs px-3 py-1.5 rounded-lg bg-dzong-terracotta text-white font-semibold hover:bg-dzong-terracotta-dark inline-flex items-center gap-1">
                          <Reply size={12} /> Reply now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
