import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Boxes,
  ClipboardList,
  DollarSign,
  FileText,
  PackageCheck,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  getDashboardSummary,
  getFinanceChart,
  getInventoryChart,
  getProcurementChart,
  getRecentActivities,
  getSalesChart,
} from "../api/dashboard";
import { getApiErrorMessage } from "../api/client";
import { ChartCard } from "../components/ChartCard";
import { DataTable } from "../components/DataTable";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { StatusBadge } from "../components/StatusBadge";
import type { AuditActivity, ChartDatum, DashboardSummary } from "../types/dashboard";
import type { RecordItem } from "../types/crud";

type DashboardState = {
  summary: DashboardSummary;
  sales: ChartDatum[];
  inventory: ChartDatum[];
  procurement: ChartDatum[];
  finance: ChartDatum[];
  activities: AuditActivity[];
};

export function DashboardPage() {
  const [data, setData] = useState<DashboardState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      setError("");
      try {
        const [summary, sales, inventory, procurement, finance, activities] = await Promise.all([
          getDashboardSummary(),
          getSalesChart(),
          getInventoryChart(),
          getProcurementChart(),
          getFinanceChart(),
          getRecentActivities(),
        ]);
        setData({ summary, sales, inventory, procurement, finance, activities });
      } catch (err) {
        setError(getApiErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const recentActivityRows = useMemo(() => {
    return (data?.activities ?? []).map((activity) => ({
      ...activity,
      status: activity.action,
      date: new Date(activity.created_at).toLocaleString(),
      record: `${activity.entity_name ?? "System"}${activity.entity_id ? ` #${activity.entity_id}` : ""}`,
    }));
  }, [data]);

  if (loading) return <LoadingSpinner />;

  if (error || !data) {
    return (
      <div className="space-y-6">
        <PageHeader title="Executive Dashboard" description="Live ERP performance from the local SQLite backend." />
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          The dashboard could not load live data. Start the backend, run the seed script, then refresh this page. {error}
        </div>
        <EmptyState title="Live dashboard data will appear after the API is running." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Executive Dashboard" description="Live operational performance from the SQLite ERP database." />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Total Employees" value={data.summary.employees} icon={Users} trend={{ label: "Seeded HR records" }} />
        <StatCard title="Active Products" value={data.summary.products} icon={Boxes} trend={{ label: "Catalog records" }} tone="green" />
        <StatCard title="Pending Purchase Requests" value={data.summary.pending_purchase_requests} icon={ClipboardList} trend={{ label: "Awaiting review", direction: data.summary.pending_purchase_requests > 0 ? "down" : "flat" }} tone="yellow" />
        <StatCard title="Monthly Revenue" value={`$${data.summary.monthly_sales_revenue.toLocaleString()}`} icon={DollarSign} trend={{ label: "From sales orders" }} tone="green" />
        <StatCard title="Unpaid Invoices" value={data.summary.unpaid_invoices} icon={FileText} trend={{ label: "Finance follow-up", direction: data.summary.unpaid_invoices > 0 ? "down" : "flat" }} tone="red" />
        <StatCard title="Low Stock Items" value={data.summary.low_stock_products} icon={AlertTriangle} trend={{ label: "Below reorder level", direction: data.summary.low_stock_products > 0 ? "down" : "flat" }} tone="yellow" />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <ChartCard title="Revenue by Month" subtitle="Sales order totals grouped by order month.">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.sales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Inventory by Category" subtitle="Available stock grouped by product category.">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.inventory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Procurement Status" subtitle="Purchase requests grouped by approval status.">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.procurement}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#d97706" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Invoice Status" subtitle="Invoice totals grouped by payment status.">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.finance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#dc2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-950">Recent Activity</h2>
            <p className="mt-1 text-sm text-slate-500">Latest audited workflow events across modules.</p>
          </div>
          <PackageCheck className="h-5 w-5 text-blue-600" />
        </div>
        <DataTable
          columns={[
            { key: "module", label: "Module" },
            { key: "record", label: "Record" },
            { key: "status", label: "Action", render: (item) => <StatusBadge status={String(item.status ?? "")} /> },
            { key: "date", label: "Date" },
          ]}
          data={recentActivityRows as RecordItem[]}
        />
      </section>
    </div>
  );
}
