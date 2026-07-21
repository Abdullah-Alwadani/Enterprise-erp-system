import { apiClient } from "./client";
import type { CurrentUser, LoginResponse } from "../types/auth";

export async function login(email: string, password: string) {
  const response = await apiClient.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
}

export async function getCurrentUser() {
  const response = await apiClient.get<CurrentUser>("/auth/me");
  return response.data;
}
