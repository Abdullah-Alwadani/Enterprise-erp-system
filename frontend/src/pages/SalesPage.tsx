import { useEffect, useState } from "react";
import { DollarSign, ShoppingCart, Truck, Users } from "lucide-react";

import { Customer, fetchList, runAction, SalesOrder } from "../api/modules";
import { getApiErrorMessage } from "../api/client";
import { ActionButton } from "../components/ActionButton";
import { DataTable } from "../components/DataTable";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { StatusBadge } from "../components/StatusBadge";

export function SalesPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const [customerRows, orderRows] = await Promise.all([
        fetchList<Customer>("/customers"),
        fetchList<SalesOrder>("/sales-orders"),
      ]);
      setCustomers(customerRows);
      setOrders(orderRows);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function action(path: string) {
    try {
      await runAction(path);
      await loadData();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  const customerMap = new Map(customers.map((item) => [item.id, item.name]));
  const revenue = orders.reduce((sum, item) => sum + Number(item.total_amount), 0);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader title="Sales" description="Customers, sales orders, confirmations, delivery status, and revenue from live data." />
      {error ? <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div> : null}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Customers" value={customers.length} icon={Users} />
        <StatCard title="Sales Orders" value={orders.length} icon={ShoppingCart} />
        <StatCard title="Delivered Orders" value={orders.filter((item) => item.status === "delivered").length} icon={Truck} tone="green" />
        <StatCard title="Sales Revenue" value={`$${revenue.toLocaleString()}`} icon={DollarSign} tone="green" />
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-950">Customers</h2>
        <DataTable columns={[{ key: "name", label: "Customer" }, { key: "contact_name", label: "Contact" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" }, { key: "status", label: "Status", render: (item) => <StatusBadge status={String(item.status)} /> }]} data={customers} />
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-950">Sales Orders</h2>
        <DataTable
          columns={[
            { key: "order_number", label: "Order Number" },
            { key: "customer_id", label: "Customer", render: (item) => customerMap.get(Number(item.customer_id)) ?? "" },
            { key: "order_date", label: "Order Date", render: (item) => item.order_date ? new Date(String(item.order_date)).toLocaleDateString() : "" },
            { key: "status", label: "Status", render: (item) => <StatusBadge status={String(item.status)} /> },
            { key: "total_amount", label: "Total Amount", render: (item) => `$${Number(item.total_amount).toLocaleString()}` },
          ]}
          data={orders}
          actions={(item) => (
            <div className="flex gap-1">
              <ActionButton variant="secondary" onClick={() => action(`/sales-orders/${item.id}/confirm`)}>Confirm</ActionButton>
              <ActionButton variant="success" onClick={() => action(`/sales-orders/${item.id}/deliver`)}>Deliver</ActionButton>
            </div>
          )}
        />
      </section>
    </div>
  );
}
