import { apiClient } from "./client";
import type { RecordItem } from "../types/crud";

export type Department = RecordItem & {
  name: string;
  description?: string;
};

export type Employee = RecordItem & {
  employee_code: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  job_title: string;
  hire_date?: string;
  department_id: number;
};

export type ProductCategory = RecordItem & {
  name: string;
  description?: string;
};

export type Supplier = RecordItem & {
  name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export type Product = RecordItem & {
  sku: string;
  name: string;
  description?: string;
  unit_price: number;
  quantity_on_hand: number;
  reorder_level: number;
  category_id: number;
  supplier_id?: number;
};

export type Customer = Supplier;

export type PurchaseRequest = RecordItem & {
  request_number: string;
  requested_by: string;
  needed_by?: string;
  notes?: string;
};

export type PurchaseOrder = RecordItem & {
  order_number: string;
  supplier_id: number;
  purchase_request_id?: number;
  order_date?: string;
  total_amount: number;
};

export type SalesOrder = RecordItem & {
  order_number: string;
  customer_id: number;
  order_date?: string;
  total_amount: number;
  notes?: string;
};

export type Invoice = RecordItem & {
  invoice_number: string;
  sales_order_id: number;
  invoice_date?: string;
  due_date?: string;
  total_amount: number;
};

export type Payment = RecordItem & {
  payment_number: string;
  invoice_id: number;
  payment_date?: string;
  amount: number;
  method?: string;
};

export type ReportResponse = {
  count?: number;
  total?: number;
  low_stock?: number;
  employees?: number;
  departments?: number;
  invoice_total?: number;
  payment_total?: number;
  outstanding_total?: number;
  items?: RecordItem[];
};

export async function fetchList<T>(endpoint: string, params?: Record<string, string>) {
  const response = await apiClient.get<T[]>(endpoint, { params });
  return response.data;
}

export async function createRecord<T>(endpoint: string, payload: Record<string, unknown>) {
  const response = await apiClient.post<T>(endpoint, payload);
  return response.data;
}

export async function updateRecord<T>(endpoint: string, id: number, payload: Record<string, unknown>) {
  const response = await apiClient.put<T>(`${endpoint}/${id}`, payload);
  return response.data;
}

export async function deleteRecord<T>(endpoint: string, id: number) {
  const response = await apiClient.delete<T>(`${endpoint}/${id}`);
  return response.data;
}

export async function runAction<T>(endpoint: string) {
  const response = await apiClient.post<T>(endpoint);
  return response.data;
}

export async function fetchReport(name: string, params?: Record<string, string>) {
  const response = await apiClient.get<ReportResponse>(`/reports/${name}`, { params });
  return response.data;
}
