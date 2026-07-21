import { ShieldCheck, SlidersHorizontal, Users } from "lucide-react";

import { PageHeader } from "../components/PageHeader";

const settings = [
  {
    title: "Role-Based Access",
    description: "Admin, HR, inventory, procurement, sales, finance, and viewer permissions are enforced by the backend.",
    icon: ShieldCheck,
  },
  {
    title: "Demo Environment",
    description: "Seed data provides demo users, departments, products, suppliers, customers, orders, invoices, and audit logs.",
    icon: Users,
  },
  {
    title: "System Configuration",
    description: "Environment variables control API URLs, database connection, JWT secret, and token expiration.",
    icon: SlidersHorizontal,
  },
];

export function SettingsPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Settings" description="System configuration overview for the portfolio demo." />
      <div className="grid gap-4 lg:grid-cols-3">
        {settings.map((item) => (
          <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <item.icon className="h-6 w-6 text-sky-600" />
            <h2 className="mt-4 text-base font-semibold text-slate-950">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
