import { Navigate } from "react-router-dom";

import { AppLayout } from "../layouts/AppLayout";
import { getToken } from "../utils/auth";

export function ProtectedRoute() {
  if (!getToken()) {
    return <Navigate to="/login" replace />;
  }

  return <AppLayout />;
}
