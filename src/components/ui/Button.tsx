import React from 'react';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'danger' | 'ghost';
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
  const baseStyles = "h-11 px-5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark hover:shadow-glow disabled:bg-slate-300",
    secondary: "bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
    whatsapp: "bg-whatsapp text-white hover:shadow-lg",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    ghost: "text-slate-500 hover:text-slate-700 hover:bg-slate-100",
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
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
      `}
    >
      {children}
    </button>
  );
};
