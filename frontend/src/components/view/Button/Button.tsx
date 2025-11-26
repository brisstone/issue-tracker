import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

const base =
  "inline-flex items-center justify-center rounded-md px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500",
  secondary:
    "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 focus:ring-slate-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-300",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  disabled: boolean;
}

export function Button({
  variant = "primary",
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${base} ${variants[variant]}         ${
        disabled ? "pointer-events-none opacity-50" : ""
      }
`}
      {...rest}
    >
      {children}
    </button>
  );
}
