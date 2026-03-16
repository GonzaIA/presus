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
  step?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, asTextarea, rows = 2, ...props }) => {
  const baseClasses = `
    w-full px-4 py-3
    bg-slate-50 dark:bg-slate-950
    border border-slate-200 dark:border-slate-800
    rounded-xl
    text-slate-900 dark:text-slate-100 placeholder-slate-400
    focus:border-primary focus:ring-2 focus:ring-primary/20
    outline-none transition-all text-sm
  `;

  if (asTextarea) {
    return (
      <div className="w-full mb-4">
        {label && (
          <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">
            {label}
          </label>
        )}
        <textarea
          rows={rows}
          className={`${baseClasses} resize-none ${className}`}
          {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
        />
        {error && <p className="mt-1 text-xs text-red-500 ml-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">
          {label}
        </label>
      )}
      <input
        className={`${baseClasses} ${className}`}
        {...props as React.InputHTMLAttributes<HTMLInputElement>}
      />
      {error && <p className="mt-1 text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
};