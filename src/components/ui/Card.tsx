import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`
        bg-white rounded-2xl p-5 shadow-card border border-slate-100
        ${onClick ? 'cursor-pointer hover:shadow-soft hover:border-slate-200 transition-all' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
