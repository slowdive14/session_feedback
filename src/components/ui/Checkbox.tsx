interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
  const baseClass = "flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all duration-150 border border-neutral-200";
  const checkedClass = checked ? "border-black bg-neutral-50" : "hover:border-neutral-400";
  const boxClass = checked ? "bg-black border-black" : "border-neutral-300";

  return (
    <label htmlFor={id} className={`${baseClass} ${checkedClass}`}>
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={`w-4 h-4 border transition-all duration-150 flex items-center justify-center ${boxClass}`}>
          {checked && (
            <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
              <path d="M10 3L4.5 9L2 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>
      <span className="text-[15px] text-black">{label}</span>
    </label>
  );
}
