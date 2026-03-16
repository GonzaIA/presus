import React from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Card } from '../ui/Card';

export const StepNotes: React.FC = () => {
  const { config, setConfig } = useQuoteStore();

  const clauses = [
    { id: 'validity', label: 'Presupuesto válido por 7 días' },
    { id: 'materials', label: 'No incluye materiales' },
    { id: 'advance', label: 'Requiere anticipo del 50%' },
    { id: 'warranty', label: 'Garantía de 1 año' },
  ];

  const [selectedClauses, setSelectedClauses] = React.useState<string[]>(['validity']);

  const toggleClause = (id: string) => {
    setSelectedClauses(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="font-semibold text-slate-900 mb-4">Condiciones</h3>
        <div className="space-y-3">
          {clauses.map(clause => {
            const isSelected = selectedClauses.includes(clause.id);
            return (
              <div key={clause.id} onClick={() => toggleClause(clause.id)} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-primary/10 border-2 border-primary' : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100'}`}>
                <span className={`font-medium ${isSelected ? 'text-primary' : 'text-slate-700'}`}>{clause.label}</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? 'bg-primary text-white' : 'bg-white border-2 border-slate-300'}`}>
                  {isSelected && <span className="material-symbols-outlined text-sm">check</span>}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-slate-900 mb-4">Configuración Fiscal</h3>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">IVA</span>
          <div className="flex items-center gap-2">
            <input type="number" value={config.iva} onChange={e => setConfig({ iva: parseFloat(e.target.value) || 0 })} className="w-20 px-3 py-2 text-center border-2 border-slate-200 rounded-xl" />
            <span className="text-slate-500">%</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
