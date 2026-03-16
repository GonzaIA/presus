import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'dashed';
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, variant = 'default' }) => {
  const baseStyles = "bg-white dark:bg-slate-900 rounded-xl p-6 shadow-item border transition-all duration-300 hover:shadow-lg";
  
  const variants = {
    default: "border-slate-100 dark:border-slate-800 hover:border-slate-200",
    dashed: "border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary",
  };

  return (
    <div
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow group' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};