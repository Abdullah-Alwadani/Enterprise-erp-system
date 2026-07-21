import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Boxes, DollarSign, PackagePlus, Warehouse } from "lucide-react";

import { createRecord, deleteRecord, fetchList, Product, ProductCategory, Supplier, updateRecord } from "../api/modules";
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

export function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const [productRows, categoryRows, supplierRows] = await Promise.all([
        fetchList<Product>("/products"),
        fetchList<ProductCategory>("/product-categories"),
        fetchList<Supplier>("/suppliers"),
      ]);
      setProducts(productRows);
      setCategories(categoryRows);
      setSuppliers(supplierRows);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const categoryMap = useMemo(() => new Map(categories.map((item) => [item.id, item.name])), [categories]);
  const supplierMap = useMemo(() => new Map(suppliers.map((item) => [item.id, item.name])), [suppliers]);
  const lowStockProducts = products.filter((item) => item.quantity_on_hand <= item.reorder_level);
  const inventoryValue = products.reduce((sum, product) => sum + Number(product.quantity_on_hand) * Number(product.unit_price), 0);
  const productFields: FormField[] = [
    { name: "sku", label: "SKU", required: true },
    { name: "name", label: "Product Name", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "unit_price", label: "Unit Price", type: "number", required: true },
    { name: "quantity_on_hand", label: "Quantity on Hand", type: "number", required: true },
    { name: "reorder_level", label: "Reorder Level", type: "number", required: true },
    { name: "category_id", label: "Category", type: "select", required: true, options: categories.map((item) => ({ label: item.name, value: item.id })) },
    { name: "supplier_id", label: "Supplier", type: "select", options: suppliers.map((item) => ({ label: item.name, value: item.id })) },
    { name: "status", label: "Status", type: "select", options: [{ label: "Active", value: "active" }, { label: "Low Stock", value: "low_stock" }, { label: "Inactive", value: "inactive" }] },
  ];

  const filteredProducts = products.filter((product) => {
    const categoryName = categoryMap.get(product.category_id) ?? "";
    const supplierName = product.supplier_id ? supplierMap.get(product.supplier_id) ?? "" : "";
    const text = `${product.sku} ${product.name} ${categoryName} ${supplierName}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (category ? String(product.category_id) === category : true);
  });

  async function saveProduct(payload: Record<string, unknown>) {
    try {
      const nextPayload = {
        ...payload,
        status: Number(payload.quantity_on_hand ?? editing?.quantity_on_hand ?? 0) <= Number(payload.reorder_level ?? editing?.reorder_level ?? 0) ? "low_stock" : (payload.status ?? "active"),
      };
      if (editing) {
        await updateRecord<Product>("/products", editing.id, nextPayload);
      } else {
        await createRecord<Product>("/products", nextPayload);
      }
      setModalOpen(false);
      setEditing(null);
      await loadData();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  async function removeProduct(product: Product) {
    if (!confirm(`Delete product ${product.name}?`)) return;
    try {
      await deleteRecord<Product>("/products", product.id);
      await loadData();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader title="Inventory Control" description="Products, categories, suppliers, stock status, and reorder alerts from live API data." actions={<ActionButton icon={<PackagePlus className="h-4 w-4" />} onClick={() => { setEditing(null); setModalOpen(true); }}>Add Product</ActionButton>} />
      {error ? <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div> : null}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Products" value={products.length} icon={Boxes} />
        <StatCard title="Active Products" value={products.filter((item) => item.status !== "inactive").length} icon={Warehouse} tone="green" />
        <StatCard title="Low Stock Products" value={lowStockProducts.length} icon={AlertTriangle} tone="yellow" />
        <StatCard title="Inventory Value" value={`$${inventoryValue.toLocaleString()}`} icon={DollarSign} tone="green" />
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-base font-semibold text-slate-950">Products</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <SearchInput value={search} onChange={setSearch} />
            <FilterSelect label="Category" value={category} onChange={setCategory} options={categories.map((item) => ({ label: item.name, value: item.id }))} />
          </div>
        </div>
        <DataTable
          columns={[
            { key: "sku", label: "SKU" },
            { key: "name", label: "Product Name" },
            { key: "category_id", label: "Category", render: (item) => categoryMap.get(Number(item.category_id)) ?? "Unassigned" },
            { key: "supplier_id", label: "Supplier", render: (item) => item.supplier_id ? supplierMap.get(Number(item.supplier_id)) ?? "" : "" },
            { key: "quantity_on_hand", label: "Quantity" },
            { key: "reorder_level", label: "Reorder Level" },
            { key: "unit_price", label: "Unit Price", render: (item) => `$${Number(item.unit_price).toLocaleString()}` },
            { key: "stock_status", label: "Stock Status", render: (item) => <StatusBadge status={Number(item.quantity_on_hand) <= Number(item.reorder_level) ? "low_stock" : String(item.status)} /> },
          ]}
          data={filteredProducts}
          onEdit={(item) => { setEditing(item as Product); setModalOpen(true); }}
          onDelete={(item) => removeProduct(item as Product)}
        />
      </section>
      <section className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-base font-semibold text-amber-900">Low Stock Alerts</h2>
          <div className="mt-4 space-y-3">
            {lowStockProducts.map((item) => (
              <div key={item.id} className="rounded-lg bg-white p-3 text-sm text-amber-900 shadow-sm">
                {item.name} has {item.quantity_on_hand} units on hand. Reorder level is {item.reorder_level}.
              </div>
            ))}
            {lowStockProducts.length === 0 ? <p className="text-sm text-amber-800">No low-stock products found.</p> : null}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-slate-950">Product Categories</h2>
          <DataTable columns={[{ key: "name", label: "Category" }, { key: "description", label: "Description" }, { key: "status", label: "Status", render: (item) => <StatusBadge status={String(item.status)} /> }]} data={categories as RecordItem[]} />
        </div>
      </section>
      <FormModal open={modalOpen} title={editing ? "Edit Product" : "Add Product"} fields={productFields} initialValue={editing} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={saveProduct} />
    </div>
  );
}
