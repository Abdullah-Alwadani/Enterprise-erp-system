const colors: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  inactive: "bg-slate-100 text-slate-600 ring-slate-200",
  draft: "bg-slate-100 text-slate-700 ring-slate-200",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  issued: "bg-blue-50 text-blue-700 ring-blue-200",
  confirmed: "bg-sky-50 text-sky-700 ring-sky-200",
  delivered: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  received: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  partially_paid: "bg-amber-50 text-amber-700 ring-amber-200",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "in stock": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "low stock": "bg-amber-50 text-amber-700 ring-amber-200",
  overdue: "bg-red-50 text-red-700 ring-red-200",
  read: "bg-slate-100 text-slate-600 ring-slate-200",
};

export function StatusBadge({ status }: { status?: string }) {
  const value = status || "active";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${colors[value] ?? "bg-slate-100 text-slate-700 ring-slate-200"}`}>
      {value.replaceAll("_", " ")}
    </span>
  );
}
