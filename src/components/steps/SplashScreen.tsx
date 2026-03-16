import React, { useEffect, useState } from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Button } from '../ui/Button';
import Logo from '../../assets/Isologo.svg';

export const SplashScreen: React.FC = () => {
  const { goToStep } = useQuoteStore();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <img src={Logo} alt="Logo" className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-900 font-display">SwiftQuote</span>
        </div>
        <button className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-slate-500">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm space-y-8">
          {/* Main Illustration */}
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-elevated">
              <span className="material-symbols-outlined text-5xl text-white">description</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 font-display leading-tight">
              Crea Presupuestos<br/>en Segundos
            </h1>
            <p className="text-slate-500">La forma más rápida y profesional de generar cotizaciones para tu negocio.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-card">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-warning">schedule</span>
                <span className="text-xs text-slate-500">Ahorra</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">80%</p>
              <p className="text-xs text-slate-400">del tiempo</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-card">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-success">trending_up</span>
                <span className="text-xs text-slate-500">Más ventas</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">3x</p>
              <p className="text-xs text-slate-400">respuestas</p>
            </div>
          </div>

          {/* CTA Buttons */}
          {showButtons && (
            <div className="space-y-3 pt-4">
              <Button fullWidth className="h-12" onClick={() => goToStep(1)}>
                <span className="material-symbols-outlined">person_add</span>
                Continuar como Invitado
              </Button>
              <Button variant="secondary" fullWidth className="h-12">
                <span className="material-symbols-outlined">login</span>
                Iniciar Sesión
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 pb-8">
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">diamond</span>
              <span className="font-bold">Plan Pro</span>
            </div>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Ver planes</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
