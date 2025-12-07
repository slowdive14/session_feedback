interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'number';
  label?: string;
  className?: string;
}

export function TextInput({
  value,
  onChange,
  placeholder = '',
  disabled = false,
  type = 'text',
  label,
  className = ''
}: TextInputProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm text-neutral-500 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-3 border border-neutral-200 bg-white text-black text-[15px] placeholder:text-neutral-400 focus:outline-none focus:border-black disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors duration-150"
      />
    </div>
  );
}
