import React from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';

const steps = [
  { id: 1, label: 'Tú' },
  { id: 2, label: 'Cliente' },
  { id: 3, label: 'Cotización' },
  { id: 4, label: 'Notas' },
  { id: 5, label: 'Preview' },
];

export const Stepper: React.FC = () => {
  const { currentStep } = useQuoteStore();

  return (
    <div className="flex w-full flex-row items-center justify-center gap-2 py-4">
      {steps.map((step) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        
        return (
          <div
            key={step.id}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              isActive 
                ? 'w-10 bg-primary shadow-sm shadow-primary/40 ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark' 
                : isCompleted
                  ? 'flex-1 bg-primary'
                  : 'flex-1 bg-slate-200 dark:bg-slate-800'
            }`}
          />
        );
      })}
    </div>
  );
};