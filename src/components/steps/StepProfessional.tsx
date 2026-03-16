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

      <div className="space-y-4">
        <Input label="Nombre Completo" placeholder="Ej: Juan Pérez" value={profesional.nombre} onChange={e => setProfessional({ nombre: e.target.value })} />
        <Input label="Profesión / Oficio" placeholder="Ej: Pintor, Electricista" value={profesional.profesion} onChange={e => setProfessional({ profesion: e.target.value })} />
        <Input label="Teléfono de Contacto" placeholder="Ej: +34 600 000 000" type="tel" value={profesional.contacto} onChange={e => setProfessional({ contacto: e.target.value })} />
        <Input label="Matrícula / NIF" placeholder="Opcional" value={profesional.matricula} onChange={e => setProfessional({ matricula: e.target.value })} />
      </div>
    </div>
  );
};
