import { useEffect, useMemo, useState } from "react";
import { Download, FileBarChart, PackageSearch, Receipt, ShoppingCart, Users } from "lucide-react";

import { fetchReport, ReportResponse } from "../api/modules";
import { getApiErrorMessage } from "../api/client";
import { ActionButton } from "../components/ActionButton";
import { DataTable } from "../components/DataTable";
import { FilterSelect } from "../components/FilterSelect";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { StatusBadge } from "../components/StatusBadge";
import type { RecordItem } from "../types/crud";

const reportOptions = ["sales", "inventory", "procurement", "finance", "hr"];

export function ReportsPage() {
  const [reportType, setReportType] = useState("sales");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [report, setReport] = useState<ReportResponse>({});

  async function loadReport() {
    setLoading(true);
    setError("");
    try {
      const params: Record<string, string> = {};
      if (status) params.status = status;
      setReport(await fetchReport(reportType, params));
    } catch (err) {
      setError(getApiErrorMessage(err));
      setReport({});
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReport();
  }, [reportType, status]);

  const rows = useMemo(() => {
    if (report.items?.length) {
      return report.items.map((item) => ({
        ...item,
        reference: item.order_number ?? item.sku ?? item.employee_code ?? item.invoice_number ?? item.id,
        amount: item.total_amount ?? 0,
      }));
    }
    if (reportType === "finance") {
      return [
        { id: 1, reference: "Invoice Total", status: "finance", amount: report.invoice_total ?? 0 },
        { id: 2, reference: "Payments", status: "finance", amount: report.payment_total ?? 0 },
        { id: 3, reference: "Outstanding", status: "finance", amount: report.outstanding_total ?? 0 },
      ];
    }
    return [];
  }, [report, reportType]);

  function exportCsv() {
    const keys = ["reference", "status", "amount"];
    const csv = [keys.join(","), ...rows.map((row) => keys.map((key) => JSON.stringify(row[key as keyof typeof row] ?? "")).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${reportType}-report.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="Filter, review, and export live ERP reporting data." actions={<ActionButton icon={<Download className="h-4 w-4" />} onClick={exportCsv}>Export CSV</ActionButton>} />
      {error ? <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div> : null}
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-950">Report Filter Panel</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <FilterSelect label="Report Type" value={reportType} onChange={setReportType} options={reportOptions} />
          <input type="date" className="h-10 rounded-lg border border-slate-200 px-3 text-sm" />
          <input type="date" className="h-10 rounded-lg border border-slate-200 px-3 text-sm" />
          <FilterSelect label="Status" value={status} onChange={setStatus} options={["active", "pending", "approved", "rejected", "issued", "received", "confirmed", "delivered", "paid", "unpaid", "partially_paid", "overdue"]} />
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Sales Report" value={reportType === "sales" ? report.count ?? 0 : "-"} icon={ShoppingCart} />
        <StatCard title="Inventory Report" value={reportType === "inventory" ? report.count ?? 0 : "-"} icon={PackageSearch} tone="green" />
        <StatCard title="Procurement Report" value={reportType === "procurement" ? report.count ?? 0 : "-"} icon={FileBarChart} tone="yellow" />
        <StatCard title="Finance Report" value={reportType === "finance" ? `$${Number(report.outstanding_total ?? 0).toLocaleString()}` : "-"} icon={Receipt} tone="green" />
        <StatCard title="HR Report" value={reportType === "hr" ? report.employees ?? 0 : "-"} icon={Users} />
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-950">Report Results</h2>
        {loading ? <LoadingSpinner /> : (
          <DataTable
            columns={[
              { key: "reference", label: "Reference" },
              { key: "status", label: "Status", render: (item) => <StatusBadge status={String(item.status ?? reportType)} /> },
              { key: "amount", label: "Amount", render: (item) => Number(item.amount) > 0 ? `$${Number(item.amount).toLocaleString()}` : "N/A" },
            ]}
            data={rows as RecordItem[]}
          />
        )}
      </section>
    </div>
  );
}
