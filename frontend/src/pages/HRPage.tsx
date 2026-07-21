import { useEffect, useMemo, useState } from "react";
import { BriefcaseBusiness, Building2, UserPlus, Users } from "lucide-react";

import { createRecord, deleteRecord, Department, Employee, fetchList, updateRecord } from "../api/modules";
import { getApiErrorMessage } from "../api/client";
import { ActionButton } from "../components/ActionButton";
import { DataTable } from "../components/DataTable";
import { FilterSelect } from "../components/FilterSelect";
import { FormModal } from "../components/FormModal";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
import { SearchInput } from "../components/SearchInput";
import { StatCard } from "../components/StatCard";
import { StatusBadge } from "../components/StatusBadge";
import type { FormField, RecordItem } from "../types/crud";

const employeeBaseFields: FormField[] = [
  { name: "employee_code", label: "Employee Code", required: true },
  { name: "first_name", label: "First Name", required: true },
  { name: "last_name", label: "Last Name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone" },
  { name: "job_title", label: "Job Title", required: true },
  { name: "hire_date", label: "Hire Date", type: "date" },
  { name: "status", label: "Status", type: "select", options: [{ label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }] },
];

export function HRPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Employee | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const [departmentRows, employeeRows] = await Promise.all([
        fetchList<Department>("/departments"),
        fetchList<Employee>("/employees"),
      ]);
      setDepartments(departmentRows);
      setEmployees(employeeRows);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const departmentMap = useMemo(() => new Map(departments.map((item) => [item.id, item.name])), [departments]);
  const departmentOptions = departments.map((item) => ({ label: item.name, value: item.id }));
  const employeeFields: FormField[] = [
    ...employeeBaseFields.slice(0, 7),
    { name: "department_id", label: "Department", type: "select", required: true, options: departmentOptions },
    ...employeeBaseFields.slice(7),
  ];

  const filteredEmployees = employees.filter((employee) => {
    const departmentName = departmentMap.get(employee.department_id) ?? "";
    const text = `${employee.employee_code} ${employee.first_name} ${employee.last_name} ${employee.email} ${employee.job_title} ${departmentName}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (department ? String(employee.department_id) === department : true);
  });

  async function saveEmployee(payload: Record<string, unknown>) {
    try {
      if (editing) {
        await updateRecord<Employee>("/employees", editing.id, payload);
      } else {
        await createRecord<Employee>("/employees", payload);
      }
      setModalOpen(false);
      setEditing(null);
      await loadData();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  async function removeEmployee(employee: Employee) {
    if (!confirm(`Delete employee ${employee.first_name} ${employee.last_name}?`)) return;
    try {
      await deleteRecord<Employee>("/employees", employee.id);
      await loadData();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="HR Management"
        description="Employees, departments, job assignments, and workforce records from the live database."
        actions={<ActionButton icon={<UserPlus className="h-4 w-4" />} onClick={() => { setEditing(null); setModalOpen(true); }}>Add Employee</ActionButton>}
      />
      {error ? <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div> : null}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Employees" value={employees.length} icon={Users} />
        <StatCard title="Active Employees" value={employees.filter((item) => item.status === "active").length} icon={BriefcaseBusiness} tone="green" />
        <StatCard title="Departments" value={departments.length} icon={Building2} />
        <StatCard title="Inactive Records" value={employees.filter((item) => item.status !== "active").length} icon={Users} tone="yellow" />
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-base font-semibold text-slate-950">Employees</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <SearchInput value={search} onChange={setSearch} />
            <FilterSelect label="Department" value={department} onChange={setDepartment} options={departments.map((item) => ({ label: item.name, value: item.id }))} />
          </div>
        </div>
        <DataTable
          columns={[
            { key: "employee_code", label: "Employee ID" },
            { key: "name", label: "Name", render: (item) => `${item.first_name} ${item.last_name}` },
            { key: "department_id", label: "Department", render: (item) => departmentMap.get(Number(item.department_id)) ?? "Unassigned" },
            { key: "job_title", label: "Job Title" },
            { key: "status", label: "Status", render: (item) => <StatusBadge status={String(item.status)} /> },
            { key: "hire_date", label: "Hire Date" },
          ]}
          data={filteredEmployees}
          onEdit={(item) => { setEditing(item as Employee); setModalOpen(true); }}
          onDelete={(item) => removeEmployee(item as Employee)}
        />
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-950">Departments</h2>
        <DataTable
          columns={[
            { key: "name", label: "Department Name" },
            { key: "description", label: "Description" },
            { key: "status", label: "Status", render: (item) => <StatusBadge status={String(item.status)} /> },
          ]}
          data={departments as RecordItem[]}
        />
      </section>
      <FormModal
        open={modalOpen}
        title={editing ? "Edit Employee" : "Add Employee"}
        fields={employeeFields}
        initialValue={editing}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSubmit={saveEmployee}
      />
    </div>
  );
}
