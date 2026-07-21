import { useEffect, useState } from "react";
import { CheckCircle2, ClipboardList, PackageCheck, Truck } from "lucide-react";

import { fetchList, PurchaseOrder, PurchaseRequest, runAction, Supplier } from "../api/modules";
import { getApiErrorMessage } from "../api/client";
import { ActionButton } from "../components/ActionButton";
import { DataTable } from "../components/DataTable";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { StatusBadge } from "../components/StatusBadge";

export function ProcurementPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [requests, setRequests] = useState<PurchaseRequest[]>([]);
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const [supplierRows, requestRows, orderRows] = await Promise.all([
        fetchList<Supplier>("/suppliers"),
        fetchList<PurchaseRequest>("/purchase-requests"),
        fetchList<PurchaseOrder>("/purchase-orders"),
      ]);
      setSuppliers(supplierRows);
      setRequests(requestRows);
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

  const supplierMap = new Map(suppliers.map((item) => [item.id, item.name]));

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader title="Procurement" description="Suppliers, purchase requests, approvals, purchase orders, and receiving status." />
      {error ? <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div> : null}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Suppliers" value={suppliers.length} icon={Truck} />
        <StatCard title="Pending Requests" value={requests.filter((item) => item.status === "pending").length} icon={ClipboardList} tone="yellow" />
        <StatCard title="Approved Requests" value={requests.filter((item) => item.status === "approved").length} icon={CheckCircle2} tone="green" />
        <StatCard title="Open Purchase Orders" value={orders.filter((item) => item.status !== "received").length} icon={PackageCheck} />
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-950">Suppliers</h2>
        <DataTable columns={[{ key: "name", label: "Supplier" }, { key: "contact_name", label: "Contact" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" }, { key: "status", label: "Status", render: (item) => <StatusBadge status={String(item.status)} /> }]} data={suppliers} />
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-950">Purchase Requests</h2>
        <DataTable
          columns={[
            { key: "request_number", label: "Request ID" },
            { key: "requested_by", label: "Requested By" },
            { key: "needed_by", label: "Needed By", render: (item) => item.needed_by ? new Date(String(item.needed_by)).toLocaleDateString() : "" },
            { key: "status", label: "Status", render: (item) => <StatusBadge status={String(item.status)} /> },
            { key: "notes", label: "Notes" },
          ]}
          data={requests}
          actions={(item) => (
            <div className="flex gap-1">
              <ActionButton variant="success" onClick={() => action(`/purchase-requests/${item.id}/approve`)}>Approve</ActionButton>
              <ActionButton variant="danger" onClick={() => action(`/purchase-requests/${item.id}/reject`)}>Reject</ActionButton>
            </div>
          )}
        />
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-950">Purchase Orders</h2>
        <DataTable
          columns={[
            { key: "order_number", label: "PO Number" },
            { key: "supplier_id", label: "Supplier", render: (item) => supplierMap.get(Number(item.supplier_id)) ?? "" },
            { key: "order_date", label: "Order Date", render: (item) => item.order_date ? new Date(String(item.order_date)).toLocaleDateString() : "" },
            { key: "status", label: "Status", render: (item) => <StatusBadge status={String(item.status)} /> },
            { key: "total_amount", label: "Total Amount", render: (item) => `$${Number(item.total_amount).toLocaleString()}` },
          ]}
          data={orders}
          actions={(item) => <ActionButton variant="secondary" onClick={() => action(`/purchase-orders/${item.id}/receive`)}>Receive</ActionButton>}
        />
      </section>
    </div>
  );
}
