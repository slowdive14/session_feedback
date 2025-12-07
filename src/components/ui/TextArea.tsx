interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  label?: string;
  className?: string;
}

export function TextArea({
  value,
  onChange,
  placeholder = '',
  maxLength = 500,
  rows = 4,
  label,
  className = ''
}: TextAreaProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm text-neutral-500 mb-2">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className="w-full px-4 py-3 border border-neutral-200 bg-white text-black text-[15px] placeholder:text-neutral-400 focus:outline-none focus:border-black resize-none transition-colors duration-150"
      />
      {maxLength && (
        <div className="text-right mt-2">
          <span className="text-xs text-neutral-400">
            {value.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
}
