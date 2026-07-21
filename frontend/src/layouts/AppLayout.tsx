import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Bell,
  Boxes,
  Building2,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Receipt,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";

import { getCurrentUser } from "../api/auth";
import { clearToken } from "../utils/auth";
import type { CurrentUser } from "../types/auth";

const navigationGroups = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Notifications", href: "/notifications", icon: Bell },
    ],
  },
  {
    label: "Operations",
    items: [
      { name: "HR", href: "/hr", icon: Users },
      { name: "Inventory", href: "/inventory", icon: Boxes },
      { name: "Procurement", href: "/procurement", icon: ClipboardList },
      { name: "Sales", href: "/sales", icon: ShoppingCart },
    ],
  },
  {
    label: "Finance",
    items: [
      { name: "Finance", href: "/finance", icon: Receipt },
    ],
  },
  {
    label: "Analysis",
    items: [
      { name: "Reports", href: "/reports", icon: BarChart3 },
      { name: "Audit Logs", href: "/audit-logs", icon: ShieldCheck },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser).catch(() => {
      clearToken();
      navigate("/login", { replace: true });
    });
  }, [navigate]);

  function logout() {
    clearToken();
    navigate("/login", { replace: true });
  }

  const breadcrumb = location.pathname
    .split("/")
    .filter(Boolean)
    .map((part) => part.replace(/([A-Z])/g, " $1").replaceAll("-", " "))
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1));

  return (
    <div className="min-h-screen bg-slate-100">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-slate-950 text-white transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Enterprise ERP</p>
              <p className="text-xs text-slate-400">Operations Suite</p>
            </div>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="h-[calc(100vh-4rem)] space-y-5 overflow-y-auto px-3 py-4">
          {navigationGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 text-xs font-semibold uppercase text-slate-500">{group.label}</p>
              <div className="mt-2 space-y-1">
                {group.items.map((item) => {
                  const active = location.pathname === item.href;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                        active ? "bg-sky-500 text-white" : "text-slate-300 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-slate-900">{breadcrumb[breadcrumb.length - 1] ?? "Dashboard"}</p>
            <p className="text-xs text-slate-500">{breadcrumb.length ? breadcrumb.join(" / ") : "Overview"}</p>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-950">{user?.full_name ?? "Loading user"}</p>
              <p className="text-xs text-slate-500">{user?.role.name ?? ""}</p>
            </div>
            <button onClick={logout} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
