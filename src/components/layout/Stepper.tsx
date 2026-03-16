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
  const { currentStep, goToStep } = useQuoteStore();

  return (
    <div className="mb-6">
      {/* Barra de progreso delgada */}
      <div className="h-1 bg-gray-200 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>

      {/* Indicadores de pasos (simplificado para mobile) */}
      <div className="flex justify-between items-center px-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex flex-col items-center cursor-pointer ${
              currentStep === step.id ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => goToStep(step.id)}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                currentStep >= step.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.id}
            </div>
            <span className="text-xs mt-1 hidden sm:block">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};