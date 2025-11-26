import type { ReactNode, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    children: ReactNode;
  }

export function Select({ label, children, ...rest }: SelectProps) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      <select
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        {...rest}
      >
        {children}
      </select>
    </label>
  );
}
