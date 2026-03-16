import React, { useState } from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { StepProfessional } from '../steps/StepProfessional';
import { StepClient } from '../steps/StepClient';
import { StepItems } from '../steps/StepItems';
import { StepNotes } from '../steps/StepNotes';
import { StepPreview } from '../steps/StepPreview';
import { SplashScreen } from '../steps/SplashScreen';
import { Dashboard } from '../steps/Dashboard';

export const AppLayout: React.FC = () => {
  const { currentStep, nextStep, prevStep } = useQuoteStore();
  const [showDashboard, setShowDashboard] = useState(true);

  if (currentStep === 0) {
    return <SplashScreen />;
  }

  if (showDashboard && currentStep === 1) {
    return (
      <div className="min-h-screen bg-background flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:w-64 flex-col bg-white border-r border-slate-200">
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xl">bolt</span>
              </div>
              <span className="text-xl font-bold text-slate-900 font-display">SwiftQuote</span>
            </div>
          </div>
          
          <nav className="flex-1 px-4 space-y-1">
            {[
              { label: 'Dashboard', icon: 'dashboard', active: true },
              { label: 'Cotizaciones', icon: 'description' },
              { label: 'Clientes', icon: 'group' },
              { label: 'Estadísticas', icon: 'analytics' },
              { label: 'Ajustes', icon: 'settings' },
            ].map((item) => (
              <a key={item.label} href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.active ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-100'}`}>
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="p-4">
            <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-2xl text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined">diamond</span>
                <span className="font-bold">Plan Pro</span>
              </div>
              <p className="text-xs text-white/80">Funciones ilimitadas</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="hidden lg:flex h-16 items-center justify-between px-8 border-b border-slate-200 bg-white">
            <h1 className="text-lg font-bold text-slate-900 font-display">Dashboard</h1>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                G
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            <Dashboard onNewQuote={() => setShowDashboard(false)} />
          </main>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepProfessional />;
      case 2: return <StepClient />;
      case 3: return <StepItems />;
      case 4: return <StepNotes />;
      case 5: return <StepPreview />;
      default: return <StepProfessional />;
    }
  };

  const stepTitles = ['', 'Tu Identidad', 'Datos Cliente', 'Cotización', 'Condiciones', 'Vista Previa'];

  const handleBack = () => {
    if (currentStep === 1) {
      setShowDashboard(true);
    } else {
      prevStep();
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 flex-col bg-white border-r border-slate-200">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">bolt</span>
            </div>
            <span className="text-xl font-bold text-slate-900 font-display">SwiftQuote</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <button onClick={() => setShowDashboard(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-slate-500 hover:bg-slate-100">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-medium">Dashboard</span>
          </button>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-slate-500 hover:bg-slate-100">
            <span className="material-symbols-outlined">description</span>
            <span className="font-medium">Cotizaciones</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-slate-500 hover:bg-slate-100">
            <span className="material-symbols-outlined">group</span>
            <span className="font-medium">Clientes</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-slate-500 hover:bg-slate-100">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-medium">Ajustes</span>
          </a>
        </nav>

        <div className="p-4">
          <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-2xl text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined">diamond</span>
              <span className="font-bold">Plan Pro</span>
            </div>
            <p className="text-xs text-white/80">Funciones ilimitadas</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Header */}
        <header className="hidden lg:flex h-16 items-center justify-between px-8 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-4">
            <button onClick={handleBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-lg font-bold text-slate-900 font-display">{stepTitles[currentStep]}</h1>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">Paso {currentStep} de 5</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
              G
            </div>
          </div>
        </header>

        {/* Mobile Container */}
        <div className="flex-1 lg:max-w-4xl lg:mx-auto w-full flex flex-col">
          {/* Mobile Header */}
          <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handleBack} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <h1 className="text-lg font-bold text-slate-900 font-display">{stepTitles[currentStep]}</h1>
              <button onClick={nextStep} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentStep ? 'w-8 bg-primary' : i < currentStep ? 'w-2 bg-primary' : 'w-2 bg-slate-200'}`} />
              ))}
            </div>
          </header>

          {/* Desktop Stepper */}
          <div className="hidden lg:flex items-center justify-center gap-3 py-8 px-8">
            {stepTitles.slice(1).map((title, i) => (
              <React.Fragment key={i}>
                <div className={`flex items-center gap-2 ${currentStep === i + 1 ? 'text-primary' : currentStep > i + 1 ? 'text-green-500' : 'text-slate-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep > i + 1 ? 'bg-green-500 text-white' : currentStep === i + 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {currentStep > i + 1 ? <span className="material-symbols-outlined text-lg">check</span> : i + 1}
                  </div>
                  <span className="text-sm font-medium">{title}</span>
                </div>
                {i < 4 && <div className={`flex-1 h-0.5 rounded ${currentStep > i + 1 ? 'bg-green-500' : 'bg-slate-200'}`} style={{ maxWidth: 60 }} />}
              </React.Fragment>
            ))}
          </div>

          {/* Content */}
          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            {renderStep()}
          </main>

          {/* Desktop Footer */}
          <footer className="hidden lg:flex items-center justify-between p-6 border-t border-slate-200 bg-white">
            <button onClick={handleBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
              <span className="material-symbols-outlined">arrow_back</span>
              <span>Atrás</span>
            </button>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900">
                <span className="material-symbols-outlined">save</span>
                <span>Guardar</span>
              </button>
              <button onClick={nextStep} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors">
                <span>{currentStep === 5 ? 'Finalizar' : 'Siguiente'}</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </footer>

          {/* Mobile Bottom Nav */}
          <nav className="lg:hidden flex border-t border-slate-200 bg-white px-2 py-2">
            {[
              { icon: 'home', label: 'Inicio', action: () => setShowDashboard(true) },
              { icon: 'description', label: 'Cots' },
              { icon: 'add_circle', label: 'Nueva', active: true },
              { icon: 'group', label: 'Clientes' },
              { icon: 'settings', label: 'Ajustes' }
            ].map((item) => (
              <button key={item.label} onClick={item.action} className={`flex-1 flex flex-col items-center gap-1 py-2 ${item.active ? 'text-primary' : 'text-slate-400'}`}>
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
