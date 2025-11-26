import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
  }

export function TextArea({ label, ...rest}:TextAreaProps ) {
    return (
        <label className="block space-y-1 text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      <textarea
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        {...rest}
      />
    </label>  
    )
}