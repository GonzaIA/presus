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
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">Condiciones del Presupuesto</h3>
        </div>
        <div className="space-y-3">
          {config.condiciones.map(clause => (
            <div key={clause.id} onClick={() => toggleCondition(clause.id)} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${clause.enabled ? 'bg-primary/10 border-2 border-primary' : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100'}`}>
              <span className={`font-medium ${clause.enabled ? 'text-primary' : 'text-slate-700'}`}>{clause.label}</span>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${clause.enabled ? 'bg-primary text-white' : 'bg-white border-2 border-slate-300'}`}>
                {clause.enabled && <span className="material-symbols-outlined text-sm">check</span>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-slate-900 mb-4">Condiciones Personalizadas</h3>
        <Input asTextarea rows={3} placeholder="Agrega condiciones adicionales personalizadas..." value={config.condicionesCustom} onChange={e => setConfig({ condicionesCustom: e.target.value })} />
      </Card>

      <Card>
        <h3 className="font-semibold text-slate-900 mb-4">Configuración Fiscal</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Aplicar IVA</span>
            <button onClick={() => setConfig({ ivaEnabled: !config.ivaEnabled })} className={`w-12 h-6 rounded-full transition-colors ${config.ivaEnabled ? 'bg-primary' : 'bg-slate-300'}`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${config.ivaEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
          {config.ivaEnabled && (
            <div className="flex items-center gap-4">
              <span className="text-slate-600">Porcentaje de IVA</span>
              <div className="flex items-center gap-2">
                <input type="number" value={config.iva} onChange={e => setConfig({ iva: parseFloat(e.target.value) || 0 })} className="w-20 px-3 py-2 text-center border-2 border-slate-200 rounded-xl" />
                <span className="text-slate-500">%</span>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-slate-900 mb-4">Validez del Presupuesto</h3>
        <div className="flex items-center gap-4">
          <span className="text-slate-600">Válido por</span>
          <div className="flex items-center gap-2">
            <input type="number" value={config.validez} onChange={e => setConfig({ validez: parseInt(e.target.value) || 7 })} className="w-20 px-3 py-2 text-center border-2 border-slate-200 rounded-xl" />
            <span className="text-slate-500">días</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
