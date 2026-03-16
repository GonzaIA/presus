import React, { useRef } from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const StepProfessional: React.FC = () => {
  const { profesional, setProfessional } = useQuoteStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfessional({ logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="space-y-6">
      <Card className="flex flex-col items-center py-8">
        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-4 overflow-hidden border-2 border-slate-200 cursor-pointer hover:border-primary transition-colors relative group" onClick={triggerFileInput}>
          {profesional.logo ? (
            <img src={profesional.logo} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl font-bold text-primary">{profesional.nombre ? profesional.nombre.charAt(0).toUpperCase() : 'P'}</span>
          )}
          <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-white">photo_camera</span>
          </div>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
        <button onClick={triggerFileInput} className="text-sm font-medium text-primary">Cambiar Logo</button>
      </Card>

      <Card>
        <h3 className="font-semibold text-slate-900 mb-4">Información Personal</h3>
        <div className="space-y-4">
          <Input label="Nombre Completo" placeholder="Ej: Juan Pérez" value={profesional.nombre} onChange={e => setProfessional({ nombre: e.target.value })} />
          <Input label="Profesión / Oficio" placeholder="Ej: Pintor, Electricista" value={profesional.profesion} onChange={e => setProfessional({ profesion: e.target.value })} />
          <Input label="Teléfono de Contacto" placeholder="Ej: +54 9 11 1234 5678" type="tel" value={profesional.contacto} onChange={e => setProfessional({ contacto: e.target.value })} />
          <Input label="Matrícula / NIF (Opcional)" placeholder="Número de registro profesional" value={profesional.matricula} onChange={e => setProfessional({ matricula: e.target.value })} />
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-slate-900 mb-4">Información de Pago</h3>
        <div className="space-y-4">
          <Input label="Alias para transferencias (Opcional)" placeholder="Ej: juan.perez.cbu o CVU" value={profesional.alias} onChange={e => setProfessional({ alias: e.target.value })} />
          <p className="text-xs text-slate-500">Este alias se mostrará en el presupuesto para pagos mediante transferencia.</p>
        </div>
      </Card>
    </div>
  );
};
