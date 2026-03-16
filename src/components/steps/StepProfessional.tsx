import React, { useRef } from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import defaultLogo from '../../assets/Isologo.svg';
import { Camera } from 'lucide-react';

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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Área de Logo */}
      <Card className="flex flex-col items-center py-6">
        <div
          className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 overflow-hidden border-2 border-slate-200 dark:border-slate-700 cursor-pointer hover:border-primary transition-colors relative group"
          onClick={triggerFileInput}
        >
          {profesional.logo ? (
            <img
              src={profesional.logo}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={defaultLogo}
              alt="Default Logo"
              className="w-10 h-10 opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white" size={20} />
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="hidden"
        />
        <button
          onClick={triggerFileInput}
          className="text-xs font-medium text-primary hover:underline"
        >
          Cambiar Logo
        </button>
      </Card>

      {/* Formulario */}
      <div className="space-y-1">
        <Input
          label="Nombre Completo"
          placeholder="Ej: Juan Pérez"
          value={profesional.nombre}
          onChange={(e) => setProfessional({ nombre: e.target.value })}
        />
        <Input
          label="Profesión / Oficio"
          placeholder="Ej: Pintor, Electricista"
          value={profesional.profesion}
          onChange={(e) => setProfessional({ profesion: e.target.value })}
        />
        <Input
          label="Teléfono de Contacto"
          placeholder="Ej: +34 600 000 000"
          type="tel"
          value={profesional.contacto}
          onChange={(e) => setProfessional({ contacto: e.target.value })}
        />
        <Input
          label="Matrícula / NIF"
          placeholder="Opcional"
          value={profesional.matricula}
          onChange={(e) => setProfessional({ matricula: e.target.value })}
        />
      </div>
    </div>
  );
};