import { useEffect, useState } from "react";
import { CreditCard, DollarSign, FileText, Receipt } from "lucide-react";

import { fetchList, Invoice, Payment, runAction, SalesOrder } from "../api/modules";
import { getApiErrorMessage } from "../api/client";
import { ActionButton } from "../components/ActionButton";
import { DataTable } from "../components/DataTable";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { StatusBadge } from "../components/StatusBadge";

export function FinancePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const [invoiceRows, paymentRows, orderRows] = await Promise.all([
        fetchList<Invoice>("/invoices"),
        fetchList<Payment>("/payments"),
        fetchList<SalesOrder>("/sales-orders"),
      ]);
      setInvoices(invoiceRows);
      setPayments(paymentRows);
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

  async function markPaid(id: number) {
    try {
      await runAction(`/invoices/${id}/mark-paid`);
      await loadData();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  const orderMap = new Map(orders.map((item) => [item.id, item.order_number]));
  const invoiceTotal = invoices.reduce((sum, item) => sum + Number(item.total_amount), 0);
  const paymentTotal = payments.reduce((sum, item) => sum + Number(item.amount), 0);
  const paidInvoices = invoices.filter((item) => item.status === "paid").length;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader title="Finance" description="Invoices, payments, paid status, and outstanding balances from live finance data." />
      {error ? <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div> : null}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Invoice Total" value={`$${invoiceTotal.toLocaleString()}`} icon={DollarSign} tone="green" />
        <StatCard title="Paid Invoices" value={paidInvoices} icon={FileText} tone="green" />
        <StatCard title="Unpaid Invoices" value={invoices.length - paidInvoices} icon={Receipt} tone="yellow" />
        <StatCard title="Payments Received" value={`$${paymentTotal.toLocaleString()}`} icon={CreditCard} tone="green" />
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-950">Invoices</h2>
        <DataTable
          columns={[
            { key: "invoice_number", label: "Invoice Number" },
            { key: "sales_order_id", label: "Sales Order", render: (item) => orderMap.get(Number(item.sales_order_id)) ?? "" },
            { key: "invoice_date", label: "Invoice Date", render: (item) => item.invoice_date ? new Date(String(item.invoice_date)).toLocaleDateString() : "" },
            { key: "due_date", label: "Due Date", render: (item) => item.due_date ? new Date(String(item.due_date)).toLocaleDateString() : "" },
            { key: "status", label: "Status", render: (item) => <StatusBadge status={String(item.status)} /> },
            { key: "total_amount", label: "Amount", render: (item) => `$${Number(item.total_amount).toLocaleString()}` },
          ]}
          data={invoices}
          actions={(item) => <ActionButton variant="success" onClick={() => markPaid(item.id)}>Mark Paid</ActionButton>}
        />
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-950">Payments</h2>
        <DataTable
          columns={[
            { key: "payment_number", label: "Payment" },
            { key: "invoice_id", label: "Invoice ID" },
            { key: "payment_date", label: "Payment Date", render: (item) => item.payment_date ? new Date(String(item.payment_date)).toLocaleDateString() : "" },
            { key: "method", label: "Method" },
            { key: "amount", label: "Amount", render: (item) => `$${Number(item.amount).toLocaleString()}` },
            { key: "status", label: "Status", render: (item) => <StatusBadge status={String(item.status)} /> },
          ]}
          data={payments}
        />
      </section>
    </div>
  );
}
