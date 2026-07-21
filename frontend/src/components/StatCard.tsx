import type { LucideIcon } from "lucide-react";

type Trend = {
  label: string;
  direction?: "up" | "down" | "flat";
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  tone = "blue",
}: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: Trend;
  tone?: "blue" | "green" | "yellow" | "red";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    yellow: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
  };

  const trendColor =
    trend?.direction === "down"
      ? "text-red-600"
      : trend?.direction === "flat"
        ? "text-slate-500"
        : "text-emerald-600";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{value}</p>
        </div>
        <div className={`rounded-lg p-2.5 ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend ? <p className={`mt-4 text-xs font-semibold ${trendColor}`}>{trend.label}</p> : null}
    </div>
  );
}
