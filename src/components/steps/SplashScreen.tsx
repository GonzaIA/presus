import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Button } from '../ui/Button';
import Logo from '../../assets/Isologo.svg';

export const SplashScreen: React.FC = () => {
  const { goToStep } = useQuoteStore();
  const [showLogin, setShowLogin] = useState(false);

  // Animación automática después de 2 segundos para mostrar opciones de login
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleGuestAccess = () => {
    goToStep(1); // Ir al Paso 1 (Identidad)
  };

  return (
    <div className="min-h-screen bg-background-light flex flex-col relative max-w-[480px] mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-8 pb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <img src={Logo} alt="Logo" className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">SwiftQuote AI</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200/50">
          <span className="material-symbols-outlined text-slate-600">account_circle</span>
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-4">
        <div className="relative overflow-hidden rounded-xl bg-primary aspect-[16/9] flex flex-col justify-end p-6 shadow-soft" style={{ backgroundImage: 'linear-gradient(180deg, rgba(37, 99, 235, 0) 0%, rgba(15, 23, 42, 0.8) 100%)' }}>
          <div className="absolute inset-0 z-[-1] opacity-40 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center"></div>
          <h2 className="text-white text-2xl font-bold leading-tight">Genera Presupuestos Profesionales en Segundos</h2>
          <p className="text-white/80 text-sm mt-2">La forma inteligente de gestionar tus estimaciones y facturas.</p>
        </div>
      </section>

      {/* Main Actions */}
      <main className="flex-1 px-6 py-4 space-y-6">
        {/* Botón de acceso principal (animado) */}
        <motion.div
          initial={false}
          animate={showLogin ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <Button variant="secondary" fullWidth className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">login</span>
            Iniciar Sesión
          </Button>
          <Button 
            variant="primary" 
            fullWidth 
            onClick={handleGuestAccess}
            className="flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">person_add</span>
            Continuar como Invitado
          </Button>
        </motion.div>
      </main>
    </div>
  );
};