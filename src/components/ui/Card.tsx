import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'dashed';
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, variant = 'default' }) => {
  const baseStyles = "bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-item border";
  
  const variants = {
    default: "border-slate-100 dark:border-slate-800",
    dashed: "border-2 border-dashed border-slate-200 dark:border-slate-700",
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