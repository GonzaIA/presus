import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Stepper } from './Stepper';
import { StepProfessional } from '../steps/StepProfessional';
import { StepClient } from '../steps/StepClient';
import { StepItems } from '../steps/StepItems';
import { StepNotes } from '../steps/StepNotes';
import { StepPreview } from '../steps/StepPreview';
import { SplashScreen } from '../steps/SplashScreen';
import { Button } from '../ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Home, FileText, Users, Settings, PlusCircle } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { currentStep, nextStep, prevStep } = useQuoteStore();

  // Si es el paso 0 (Splash), renderizar solo el SplashScreen
  if (currentStep === 0) {
    return <SplashScreen />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepProfessional />;
      case 2:
        return <StepClient />;
      case 3:
        return <StepItems />;
      case 4:
        return <StepNotes />;
      case 5:
        return <StepPreview />;
      default:
        return <StepProfessional />;
    }
  };

  const stepTitles = {
    1: 'Tu Identidad',
    2: 'Datos Cliente',
    3: 'Cotización',
    4: 'Condiciones',
    5: 'Vista Previa'
  };

  return (
    <div className="min-h-screen bg-background-light flex flex-col relative max-w-[480px] mx-auto border-x border-slate-200 dark:border-slate-800 shadow-xl">
      
      {/* Header con Título y Stepper */}
      <header className="pt-6 px-4 pb-2 sticky top-0 bg-background-light/80 backdrop-blur-md z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-primary dark:text-white text-2xl font-bold leading-tight tracking-tight flex-1 text-center pr-10" style={{ fontFamily: 'var(--font-display)' }}>
            {stepTitles[currentStep as keyof typeof stepTitles]}
          </h2>
        </div>
        <Stepper />
      </header>

      {/* Contenido Principal con Animación */}
      <main className="flex-1 px-4 py-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer de Navegación (Solo para pasos 1-4) */}
      {currentStep < 5 && (
        <footer className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 sticky bottom-0">
          <div className="flex justify-between items-center">
            <Button
              variant="secondary"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 h-10 px-4 text-sm"
            >
              <ChevronLeft size={16} />
              Atrás
            </Button>
            
            <span className="text-xs text-slate-500 font-medium">
              Paso {currentStep} de 5
            </span>

            <Button
              variant="primary"
              onClick={nextStep}
              className="flex items-center gap-2 h-10 px-4 text-sm"
            >
              Siguiente
              <ChevronRight size={16} />
            </Button>
          </div>
        </footer>
      )}

      {/* Bottom Navigation */}
      <nav className="flex border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pb-6 pt-2">
        <a className="flex-1 flex flex-col items-center gap-1 text-slate-400 cursor-pointer">
          <Home size={20} />
          <span className="text-[10px] font-medium">Inicio</span>
        </a>
        <a className="flex-1 flex flex-col items-center gap-1 text-slate-400 cursor-pointer">
          <FileText size={20} />
          <span className="text-[10px] font-medium">Cotizaciones</span>
        </a>
        <a className="flex-1 flex flex-col items-center gap-1 text-primary cursor-pointer relative">
          <div className="absolute -top-3 bg-primary text-white rounded-full p-1 shadow-lg">
            <PlusCircle size={20} className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium mt-1">Nueva</span>
        </a>
        <a className="flex-1 flex flex-col items-center gap-1 text-slate-400 cursor-pointer">
          <Users size={20} />
          <span className="text-[10px] font-medium">Clientes</span>
        </a>
        <a className="flex-1 flex flex-col items-center gap-1 text-slate-400 cursor-pointer">
          <Settings size={20} />
          <span className="text-[10px] font-medium">Ajustes</span>
        </a>
      </nav>
    </div>
  );
};