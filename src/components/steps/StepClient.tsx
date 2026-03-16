import React from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Input } from '../ui/Input';

export const StepClient: React.FC = () => {
  const { cliente, setClient } = useQuoteStore();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
        Datos del Cliente
      </h3>
      
      <div className="space-y-1">
        <Input
          label="Nombre del Cliente"
          placeholder="Ej: Empresa XYZ S.L."
          value={cliente.nombre}
          onChange={(e) => setClient({ nombre: e.target.value })}
        />
        <Input
          label="Dirección (Opcional)"
          placeholder="Ej: Calle Principal 123"
          value={cliente.direccion}
          onChange={(e) => setClient({ direccion: e.target.value })}
        />
        <Input
          label="Título del Proyecto"
          placeholder="Ej: Pintura de Fachada"
          value={cliente.proyecto}
          onChange={(e) => setClient({ proyecto: e.target.value })}
        />
      </div>
    </div>
  );
};