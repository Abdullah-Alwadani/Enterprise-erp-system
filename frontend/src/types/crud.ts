import type { ReactNode } from "react";

export type RecordItem = {
  id: number;
  status?: string;
  is_active?: boolean;
  [key: string]: unknown;
};

export type FieldType = "text" | "number" | "date" | "datetime-local" | "email" | "textarea" | "select";

export type FieldOption = {
  label: string;
  value: string | number;
};

export type FormField = {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  options?: FieldOption[];
  optionEndpoint?: string;
  optionLabelKey?: string;
  optionValueKey?: string;
};

export type TableColumn<T extends RecordItem = RecordItem> = {
  key: keyof T | string;
  label: string;
  render?: (item: T) => ReactNode;
};
