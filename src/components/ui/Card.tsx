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
        bg-slate-800/70 backdrop-blur-md rounded-2xl p-5 border border-white/10
        ${onClick ? 'cursor-pointer hover:bg-slate-800/90 hover:border-white/20 transition-all' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
