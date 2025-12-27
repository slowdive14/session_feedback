import type { ReactNode } from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: ReactNode;
  variant?: 'default' | 'highlight';
}

export function Checkbox({
  id,
  label,
  checked,
  onChange,
  icon,
  variant = 'default'
}: CheckboxProps) {
  const isHighlight = variant === 'highlight';

  return (
    <label
      htmlFor={id}
      className={`
        group flex items-center gap-3 px-4 py-4 cursor-pointer
        transition-all duration-200 rounded-xl border-2
        ${checked
          ? isHighlight
            ? 'border-emerald-500 bg-emerald-50'
            : 'border-black bg-neutral-50'
          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50'
        }
        focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2
      `}
    >
      {/* Icon (optional) */}
      {icon && (
        <div className={`text-xl transition-transform duration-200 ${checked ? 'scale-110' : 'group-hover:scale-105'}`}>
          {icon}
        </div>
      )}

      {/* Checkbox Box */}
      <div className="relative flex items-center justify-center shrink-0">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`
            w-5 h-5 rounded-md border-2 transition-all duration-200
            flex items-center justify-center
            ${checked
              ? isHighlight
                ? 'bg-emerald-500 border-emerald-500'
                : 'bg-black border-black'
              : 'border-neutral-300 group-hover:border-neutral-400'
            }
          `}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M10 3L4.5 9L2 6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Label */}
      <span
        className={`text-[15px] transition-colors duration-200 ${
          checked ? 'text-black font-medium' : 'text-neutral-700'
        }`}
      >
        {label}
      </span>

      {/* Selected Indicator */}
      {checked && (
        <div className="ml-auto">
          <div className={`w-2 h-2 rounded-full ${isHighlight ? 'bg-emerald-500' : 'bg-black'}`} />
        </div>
      )}
    </label>
  );
}
