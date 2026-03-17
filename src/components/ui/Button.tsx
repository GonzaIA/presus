import React from 'react';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'danger' | 'ghost' | 'glass';
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const baseStyles = "h-11 px-5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-blue-500 shadow-lg shadow-primary/20 hover:shadow-glow-primary disabled:bg-slate-700 disabled:text-slate-500",
    secondary: "bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-600",
    whatsapp: "bg-whatsapp text-white hover:bg-green-500 shadow-lg shadow-whatsapp/20",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
    ghost: "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50",
    glass: "bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600 backdrop-blur-md",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100
      `}
    >
      {children}
    </button>
  );
};
