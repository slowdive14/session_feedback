interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  type = 'button',
  className = ''
}: ButtonProps) {
  const baseStyles = 'px-6 py-3.5 font-medium transition-all duration-150 text-[15px] tracking-tight';

  const variantStyles = {
    primary: 'bg-black text-white hover:bg-neutral-800 active:bg-neutral-900 disabled:bg-neutral-300 disabled:cursor-not-allowed',
    secondary: 'bg-white text-black border border-neutral-200 hover:border-black hover:bg-neutral-50 active:bg-neutral-100',
    ghost: 'text-neutral-500 hover:text-black'
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
    >
      {children}
    </button>
  );
}
