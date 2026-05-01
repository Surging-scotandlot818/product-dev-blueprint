"use client";

import clsx from "clsx";
import { forwardRef, ReactNode } from "react";

export const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}>(function Button({ className, variant = "primary", ...rest }, ref) {
  const styles: Record<string, string> = {
    primary: "bg-ink-900 text-white hover:bg-ink-800 disabled:bg-ink-300",
    secondary: "bg-white text-ink-900 border border-ink-300 hover:bg-ink-50",
    ghost: "bg-transparent text-ink-700 hover:bg-ink-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  return (
    <button
      ref={ref}
      className={clsx(
        "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:cursor-not-allowed",
        styles[variant],
        className,
      )}
      {...rest}
    />
  );
});

export function Field({
  label,
  hint,
  children,
  required,
  htmlFor,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  required?: boolean;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-ink-800">
          {label}
          {required && <span className="text-red-600 ml-0.5">*</span>}
        </span>
      </div>
      {children}
      {hint && <p className="text-xs text-ink-500 mt-1.5 leading-relaxed">{hint}</p>}
    </label>
  );
}

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...rest }, ref) {
    return (
      <input
        ref={ref}
        className={clsx(
          "w-full bg-white border border-ink-300 rounded-md px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400",
          "focus:outline-none focus:ring-2 focus:ring-accent-300 focus:border-accent-400",
          className,
        )}
        {...rest}
      />
    );
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        className={clsx(
          "w-full bg-white border border-ink-300 rounded-md px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 leading-relaxed",
          "focus:outline-none focus:ring-2 focus:ring-accent-300 focus:border-accent-400",
          className,
        )}
        {...rest}
      />
    );
  },
);

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...rest }, ref) {
    return (
      <select
        ref={ref}
        className={clsx(
          "w-full bg-white border border-ink-300 rounded-md px-3 py-2 text-sm text-ink-900",
          "focus:outline-none focus:ring-2 focus:ring-accent-300 focus:border-accent-400",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
    );
  },
);

export function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink-800 cursor-pointer select-none">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-ink-300 text-accent-600 focus:ring-accent-300"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}

export function MultiCheck({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => {
        const on = value.includes(opt.value);
        return (
          <Checkbox
            key={opt.value}
            label={opt.label}
            checked={on}
            onChange={(v) => onChange(v ? [...value, opt.value] : value.filter((x) => x !== opt.value))}
          />
        );
      })}
    </div>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("bg-white border border-ink-200 rounded-xl shadow-sm", className)}>
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "good" | "warn" | "bad" | "accent";
}) {
  const styles: Record<string, string> = {
    neutral: "bg-ink-100 text-ink-700 border-ink-200",
    good: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warn: "bg-amber-50 text-amber-700 border-amber-200",
    bad: "bg-red-50 text-red-700 border-red-200",
    accent: "bg-accent-50 text-accent-700 border-accent-200",
  };
  return (
    <span className={clsx("inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border", styles[tone])}>
      {children}
    </span>
  );
}

export function ProgressBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="h-1.5 w-full bg-ink-100 rounded-full overflow-hidden">
      <div className="h-full bg-accent-500 transition-[width]" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="text-center py-16 px-6 border-2 border-dashed border-ink-200 rounded-xl bg-white">
      <h3 className="text-base font-semibold text-ink-900">{title}</h3>
      <p className="text-sm text-ink-600 mt-1 max-w-md mx-auto">{body}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
