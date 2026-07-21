import { apiClient } from "./client";
import type { AuditActivity, ChartDatum, DashboardSummary } from "../types/dashboard";

export async function getDashboardSummary() {
  const response = await apiClient.get<DashboardSummary>("/dashboard/summary");
  return response.data;
}

export async function getSalesChart() {
  const response = await apiClient.get<ChartDatum[]>("/dashboard/sales-chart");
  return response.data;
}

export async function getInventoryChart() {
  const response = await apiClient.get<ChartDatum[]>("/dashboard/inventory-chart");
  return response.data;
}

export async function getProcurementChart() {
  const response = await apiClient.get<ChartDatum[]>("/dashboard/procurement-chart");
  return response.data;
}

export async function getFinanceChart() {
  const response = await apiClient.get<ChartDatum[]>("/dashboard/finance-chart");
  return response.data;
}

export async function getRecentActivities() {
  const response = await apiClient.get<AuditActivity[]>("/dashboard/recent-activities");
  return response.data;
}
