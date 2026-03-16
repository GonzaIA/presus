import React from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Card } from '../ui/Card';
import './StepNotes.css';

export const StepNotes: React.FC = () => {
  const { config, setConfig } = useQuoteStore();

  const clauses = [
    { id: 'validity', label: 'Presupuesto válido por 7 días', key: 'validez' },
    { id: 'materials', label: 'No incluye materiales', key: 'incluyeMateriales' },
    { id: 'advance', label: 'Requiere anticipo del 50%', key: 'anticipo' },
    { id: 'warranty', label: 'Garantía de 1 año', key: 'garantia' },
  ];

  // Estado local para las cláusulas seleccionadas (simulado)
  const [selectedClauses, setSelectedClauses] = React.useState<string[]>(['validity']);

  const toggleClause = (id: string) => {
    setSelectedClauses(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
        Condiciones y Cláusulas
      </h3>
      
      <div className="grid grid-cols-1 gap-3">
        {clauses.map((clause) => {
          const isSelected = selectedClauses.includes(clause.id);
          return (
            <Card
              key={clause.id}
              onClick={() => toggleClause(clause.id)}
              className={`cursor-pointer transition-all border-slate-100 dark:border-slate-800 ${isSelected ? 'border-[#2463eb] bg-[#2463eb]/5 dark:bg-[#2463eb]/10' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-medium ${isSelected ? 'text-[#2463eb]' : 'text-slate-700 dark:text-slate-300'}`}>
                  {clause.label}
                </span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected
                    ? 'border-[#2463eb] bg-[#2463eb] text-white'
                    : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Configuración de IVA */}
      <Card className="mt-6">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Configuración Fiscal
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-slate-700 dark:text-slate-300">Porcentaje de IVA</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={config.iva}
              onChange={(e) => setConfig({ iva: parseFloat(e.target.value) || 0 })}
              className="w-16 px-2 py-1 text-right rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950"
            />
            <span>%</span>
          </div>
        </div>
      </Card>
    </div>
  );
};