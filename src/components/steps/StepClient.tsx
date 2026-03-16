import React from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const StepClient: React.FC = () => {
  const { cliente, setClient } = useQuoteStore();

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="font-semibold text-slate-900 mb-4">Datos del Cliente</h3>
        <div className="space-y-4">
          <Input label="Nombre del Cliente" placeholder="Ej: Juan García" value={cliente.nombre} onChange={e => setClient({ nombre: e.target.value })} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Empresa (Opcional)" placeholder="Ej: Empresa XYZ" value={cliente.empresa} onChange={e => setClient({ empresa: e.target.value })} />
            <Input label="Teléfono (Opcional)" placeholder="Ej: +54 9 11 1234 5678" type="tel" value={cliente.telefono} onChange={e => setClient({ telefono: e.target.value })} />
          </div>
          <Input label="Email (Opcional)" placeholder="cliente@email.com" type="email" value={cliente.email} onChange={e => setClient({ email: e.target.value })} />
          <Input label="Dirección (Opcional)" placeholder="Ej: Calle Principal 123" value={cliente.direccion} onChange={e => setClient({ direccion: e.target.value })} />
          <Input label="Título del Proyecto" placeholder="Ej: Pintura de Fachada" value={cliente.proyecto} onChange={e => setClient({ proyecto: e.target.value })} />
          <Input label="Notas Adicionales (Opcional)" asTextarea rows={2} placeholder="Información extra..." value={cliente.notas} onChange={e => setClient({ notas: e.target.value })} />
        </div>
      </Card>
    </div>
  );
};
