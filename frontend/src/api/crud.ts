import { apiClient } from "./client";
import type { RecordItem } from "../types/crud";

export async function listItems<T extends RecordItem>(endpoint: string, params?: Record<string, string>) {
  const response = await apiClient.get<T[]>(endpoint, { params });
  return response.data;
}

export async function getItem<T extends RecordItem>(endpoint: string, id: number) {
  const response = await apiClient.get<T>(`${endpoint}/${id}`);
  return response.data;
}

export async function createItem<T extends RecordItem>(endpoint: string, payload: Record<string, unknown>) {
  const response = await apiClient.post<T>(endpoint, payload);
  return response.data;
}

export async function updateItem<T extends RecordItem>(endpoint: string, id: number, payload: Record<string, unknown>) {
  const response = await apiClient.put<T>(`${endpoint}/${id}`, payload);
  return response.data;
}

export async function deleteItem<T extends RecordItem>(endpoint: string, id: number) {
  const response = await apiClient.delete<T>(`${endpoint}/${id}`);
  return response.data;
}

export async function postAction<T extends RecordItem>(path: string) {
  const response = await apiClient.post<T>(path);
  return response.data;
}
