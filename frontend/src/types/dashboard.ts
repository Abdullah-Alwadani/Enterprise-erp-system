export type DashboardSummary = {
  employees: number;
  products: number;
  low_stock_products: number;
  suppliers: number;
  pending_purchase_requests: number;
  purchase_orders: number;
  sales_orders: number;
  invoices: number;
  unpaid_invoices: number;
  monthly_sales_revenue: number;
};

export type ChartDatum = {
  status?: string;
  label?: string;
  count?: number;
  total?: number;
  quantity?: number;
};

export type AuditActivity = {
  id: number;
  action: string;
  module: string;
  entity_name?: string | null;
  entity_id?: number | null;
  created_at: string;
};
