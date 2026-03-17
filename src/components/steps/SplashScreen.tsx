import React, { useEffect, useState } from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Button } from '../ui/Button';

export const SplashScreen: React.FC = () => {
  const { goToStep } = useQuoteStore();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
            <span className="material-symbols-outlined text-primary text-xl">description</span>
          </div>
          <span className="text-xl font-bold text-slate-100 font-display">Presspuesto</span>
        </div>
        <button className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 backdrop-blur-md">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm space-y-8">
          {/* Main Illustration */}
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-elevated shadow-primary/20">
              <span className="material-symbols-outlined text-5xl text-white">description</span>
            </div>
            <h1 className="text-3xl font-black text-slate-100 font-display leading-tight tracking-tight">
              Crea Presupuestos<br/>en Segundos
            </h1>
            <p className="text-slate-400">La forma más rápida y profesional de generar cotizaciones para tu negocio.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-warning">schedule</span>
                <span className="text-xs text-slate-500">Ahorra</span>
              </div>
              <p className="text-2xl font-bold text-slate-100">80%</p>
              <p className="text-xs text-slate-500">del tiempo</p>
            </div>
            <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-success">trending_up</span>
                <span className="text-xs text-slate-500">Más ventas</span>
              </div>
              <p className="text-2xl font-bold text-slate-100">3x</p>
              <p className="text-xs text-slate-500">respuestas</p>
            </div>
          </div>

          {/* CTA Buttons */}
          {showButtons && (
            <div className="space-y-3 pt-4">
              <Button fullWidth className="h-12" onClick={() => goToStep(1)}>
                <span className="material-symbols-outlined">person_add</span>
                Continuar como Invitado
              </Button>
              <Button variant="glass" fullWidth className="h-12">
                <span className="material-symbols-outlined">login</span>
                Iniciar Sesión
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 pb-8">
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-4 text-white shadow-lg shadow-primary/20">
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
