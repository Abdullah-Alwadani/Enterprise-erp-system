import { Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./routes/ProtectedRoute";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { AuditLogsPage } from "./pages/AuditLogsPage";
import { FinancePage } from "./pages/FinancePage";
import { HRPage } from "./pages/HRPage";
import { InventoryPage } from "./pages/InventoryPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ProcurementPage } from "./pages/ProcurementPage";
import { ReportsPage } from "./pages/ReportsPage";
import { SalesPage } from "./pages/SalesPage";
import { SettingsPage } from "./pages/SettingsPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/hr" element={<HRPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/procurement" element={<ProcurementPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/audit-logs" element={<AuditLogsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
