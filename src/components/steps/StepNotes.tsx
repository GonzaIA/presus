import React from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

export const StepNotes: React.FC = () => {
  const { config, setConfig, updateCondition } = useQuoteStore();

  const toggleCondition = (id: string) => {
    const condition = config.condiciones.find(c => c.id === id);
    if (condition) {
      updateCondition(id, { enabled: !condition.enabled });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <h3 className="font-semibold text-slate-900 mb-3 text-sm">Condiciones</h3>
        <div className="space-y-2">
          {config.condiciones.map(clause => (
            <div 
              key={clause.id} 
              onClick={() => toggleCondition(clause.id)} 
              className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${clause.enabled ? 'bg-primary/10 border border-primary' : 'bg-slate-50 border border-transparent hover:bg-slate-100'}`}
            >
              <span className={`text-sm ${clause.enabled ? 'text-primary font-medium' : 'text-slate-600'}`}>
                {clause.label}
              </span>
              <div className={`w-4 h-4 rounded flex items-center justify-center ${clause.enabled ? 'bg-primary' : 'bg-slate-300'}`}>
                {clause.enabled && <span className="material-symbols-outlined text-white text-xs">check</span>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-slate-900 mb-3 text-sm">Condiciones Extra</h3>
        <Input 
          asTextarea 
          rows={2} 
          placeholder="Agrega condiciones personalizadas..." 
          value={config.condicionesCustom} 
          onChange={e => setConfig({ condicionesCustom: e.target.value })} 
        />
      </Card>

      <Card>
        <h3 className="font-semibold text-slate-900 mb-3 text-sm">Válidez</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Válido por</span>
          <input 
            type="number" 
            value={config.validez} 
            onChange={e => setConfig({ validez: parseInt(e.target.value) || 7 })} 
            className="w-16 px-3 py-2 text-center border border-slate-200 rounded-lg text-sm"
          />
          <span className="text-sm text-slate-500">días</span>
        </div>
      </Card>
    </div>
  );
};
