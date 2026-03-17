import React from 'react';

interface InputProps {
  label?: string;
  error?: string;
  asTextarea?: boolean;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  rows?: number;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className = '', 
  asTextarea, 
  rows = 3, 
  ...props 
}) => {
  const baseClasses = `
    w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/50
    text-slate-100 placeholder-slate-500 text-sm
    focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
    transition-colors duration-200
  `;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      {asTextarea ? (
        <textarea
          rows={rows}
          className={`${baseClasses} resize-none ${error ? 'border-red-500' : ''}`}
          {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
        />
      ) : (
        <input
          className={`${baseClasses} ${error ? 'border-red-500' : ''}`}
          {...props as React.InputHTMLAttributes<HTMLInputElement>}
        />
      )}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
};
