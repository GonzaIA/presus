import React, { useState } from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { StepProfessional } from '../steps/StepProfessional';
import { StepClient } from '../steps/StepClient';
import { StepItems } from '../steps/StepItems';
import { StepNotes } from '../steps/StepNotes';
import { StepPreview } from '../steps/StepPreview';
import { SplashScreen } from '../steps/SplashScreen';
import { Dashboard } from '../steps/Dashboard';
import { InfoScreen } from '../steps/InfoScreen';

type ViewType = 'dashboard' | 'quote' | 'info';

export const AppLayout: React.FC = () => {
  const { currentStep, nextStep, prevStep, resetQuote, goToStep } = useQuoteStore();
  const [showDashboard, setShowDashboard] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  if (currentStep === 0) {
    return <SplashScreen />;
  }

  const handleClearStep = () => {
    if (confirm('¿Limpiar los datos de este paso?')) {
      switch (currentStep) {
        case 1:
          resetQuote();
          break;
        case 2:
          useQuoteStore.getState().setClient({
            nombre: '',
            direccion: '',
            proyecto: '',
            telefono: '',
            empresa: '',
            email: '',
            notas: ''
          });
          break;
        case 3:
          useQuoteStore.getState().setItems([]);
          break;
        case 4:
          useQuoteStore.getState().setConfig({
            condicionesCustom: '',
            validez: 7,
            ivaEnabled: true,
            iva: 21
          });
          break;
      }
    }
  };

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
      setCurrentView('dashboard');
    } else {
      prevStep();
    }
  };

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    if (view === 'dashboard') {
      setShowDashboard(true);
    } else {
      setShowDashboard(false);
      if (view === 'quote') {
        goToStep(1);
      }
    }
  };

  // Info View
  if (currentView === 'info') {
    return (
      <div className="min-h-screen bg-background-dark flex">
        <aside className="hidden lg:flex lg:w-64 flex-col bg-slate-900/80 backdrop-blur-lg border-r border-white/5">
          <div className="p-6">
            <button onClick={() => handleNavigate('dashboard')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                <span className="material-symbols-outlined text-primary text-xl">description</span>
              </div>
              <span className="text-xl font-bold text-slate-100 font-display">Presspuesto</span>
            </button>
          </div>
          <nav className="flex-1 px-4 space-y-1">
            {[
              { label: 'Inicio', icon: 'home', view: 'dashboard' as ViewType },
              { label: 'Nueva', icon: 'add_circle', view: 'quote' as ViewType },
              { label: 'Info', icon: 'info', view: 'info' as ViewType },
            ].map((item) => (
              <button 
                key={item.label} 
                onClick={() => handleNavigate(item.view)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${currentView === item.view ? 'bg-primary/20 text-primary border border-primary/30' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="hidden lg:flex h-16 items-center justify-between px-8 border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <button onClick={() => handleNavigate('dashboard')} className="flex items-center gap-2 text-slate-400 hover:text-slate-200">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <h1 className="text-lg font-bold text-slate-100 font-display">Info</h1>
            </div>
          </header>
          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            <InfoScreen />
          </main>
        </div>

        {/* Mobile Bottom Tab Bar */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 flex border-t border-white/5 bg-slate-900/95 backdrop-blur-md px-1 py-1 z-50">
          {[
            { icon: 'home', label: 'Inicio', view: 'dashboard' as ViewType },
            { icon: 'add_circle', label: 'Nueva', view: 'quote' as ViewType },
            { icon: 'info', label: 'Info', view: 'info' as ViewType, active: currentView === 'info' }
          ].map((item) => (
            <button 
              key={item.label} 
              onClick={() => item.view && handleNavigate(item.view)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 ${(item as { active?: boolean }).active ? 'text-primary' : 'text-slate-500'}`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    );
  }

  // Dashboard View
  if (showDashboard && currentStep === 1) {
    return (
      <div className="min-h-screen bg-background-dark flex pb-16 lg:pb-0">
        <aside className="hidden lg:flex lg:w-64 flex-col bg-slate-900/80 backdrop-blur-lg border-r border-white/5">
          <div className="p-6">
            <button onClick={() => handleNavigate('dashboard')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                <span className="material-symbols-outlined text-primary text-xl">description</span>
              </div>
              <span className="text-xl font-bold text-slate-100 font-display">Presspuesto</span>
            </button>
          </div>
        <nav className="flex-1 px-4 space-y-1">
            {[
              { label: 'Inicio', icon: 'home', view: 'dashboard' as ViewType },
              { label: 'Nueva', icon: 'add_circle', view: 'quote' as ViewType },
              { label: 'Info', icon: 'info', view: 'info' as ViewType },
            ].map((item) => (
              <button 
                key={item.label} 
                onClick={() => handleNavigate(item.view)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${currentView === item.view ? 'bg-primary/20 text-primary border border-primary/30' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="hidden lg:flex h-16 items-center justify-between px-8 border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
            <h1 className="text-lg font-bold text-slate-100 font-display">Dashboard</h1>
          </header>
          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            <Dashboard onNewQuote={() => setShowDashboard(false)} onLoadQuote={() => setShowDashboard(false)} />
          </main>
        </div>

        {/* Mobile Bottom Tab Bar */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 flex border-t border-white/5 bg-slate-900/95 backdrop-blur-md px-1 py-1 z-50">
          {[
            { icon: 'home', label: 'Inicio', view: 'dashboard' as ViewType, active: true },
            { icon: 'add_circle', label: 'Nueva', view: 'quote' as ViewType },
            { icon: 'info', label: 'Info', view: 'info' as ViewType }
          ].map((item) => (
            <button 
              key={item.label} 
              onClick={() => item.view && handleNavigate(item.view)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 ${(item as { active?: boolean }).active ? 'text-primary' : 'text-slate-500'}`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark flex pb-16 lg:pb-0">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 flex-col bg-slate-900/80 backdrop-blur-lg border-r border-white/5">
        <div className="p-6">
          <button onClick={() => handleNavigate('dashboard')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
              <span className="material-symbols-outlined text-primary text-xl">description</span>
            </div>
            <span className="text-xl font-bold text-slate-100 font-display">Presspuesto</span>
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <button 
            onClick={() => handleNavigate('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${currentView === 'dashboard' ? 'bg-primary/20 text-primary border border-primary/30' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
          >
            <span className="material-symbols-outlined">home</span>
            <span className="font-medium">Inicio</span>
          </button>
          <button 
            onClick={() => handleNavigate('quote')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${currentView === 'quote' ? 'bg-primary/20 text-primary border border-primary/30' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span className="font-medium">Nueva</span>
          </button>
          <button 
            onClick={() => handleNavigate('info')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-slate-400 hover:text-slate-200 hover:bg-white/5"
          >
            <span className="material-symbols-outlined">info</span>
            <span className="font-medium">Info</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Header */}
        <header className="hidden lg:flex h-16 items-center justify-between px-8 border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button onClick={() => handleNavigate('dashboard')} className="flex items-center gap-2 text-slate-400 hover:text-slate-200">
              <span className="material-symbols-outlined">home</span>
              <span>Inicio</span>
            </button>
            <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-200">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-lg font-bold text-slate-100 font-display">{stepTitles[currentStep]}</h1>
            <span className="px-2.5 py-1 bg-slate-800 text-slate-400 text-xs font-medium rounded-full border border-slate-700">Paso {currentStep} de 5</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleClearStep} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
              <span className="material-symbols-outlined">delete_sweep</span>
            </button>
          </div>
        </header>

        {/* Mobile Container */}
        <div 
          className="flex-1 lg:max-w-4xl lg:mx-auto w-full flex flex-col"
          >
          {/* Mobile Header */}
          <header className="lg:hidden bg-slate-900/80 backdrop-blur-md border-b border-white/5 px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <button onClick={() => handleNavigate('dashboard')} className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-lg">home</span>
              </button>
              <h1 className="text-base font-bold text-slate-100 font-display">{stepTitles[currentStep]}</h1>
              <button onClick={handleClearStep} className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined text-sm">delete_sweep</span>
              </button>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentStep ? 'w-6 bg-primary' : i < currentStep ? 'w-2 bg-primary' : 'w-2 bg-slate-700'}`} />
              ))}
            </div>
          </header>

          {/* Desktop Stepper */}
          <div className="hidden lg:flex items-center justify-center gap-3 py-6 px-8">
            {stepTitles.slice(1).map((title, i) => (
              <React.Fragment key={i}>
                <div className={`flex items-center gap-2 ${currentStep === i + 1 ? 'text-primary' : currentStep > i + 1 ? 'text-green-500' : 'text-slate-500'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${currentStep > i + 1 ? 'bg-green-500 text-white' : currentStep === i + 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
                    {currentStep > i + 1 ? <span className="material-symbols-outlined text-sm">check</span> : i + 1}
                  </div>
                  <span className="text-sm font-medium">{title}</span>
                </div>
                {i < 4 && <div className={`flex-1 h-0.5 rounded ${currentStep > i + 1 ? 'bg-green-500' : 'bg-slate-700'}`} style={{ maxWidth: 40 }} />}
              </React.Fragment>
            ))}
          </div>

          {/* Content */}
          <main className="flex-1 p-3 lg:p-6 overflow-y-auto">
            {renderStep()}
          </main>

          {/* Mobile Bottom Navigation */}
          <footer className="lg:hidden flex items-center justify-between px-4 py-3 bg-slate-900/80 backdrop-blur-md border-t border-white/5">
            <button 
              onClick={handleBack} 
              disabled={currentStep === 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg ${currentStep === 1 ? 'text-slate-600' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              <span className="text-sm">Atrás</span>
            </button>
            
            <button 
              onClick={nextStep}
              disabled={currentStep === 5}
              className={`flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-lg ${currentStep === 5 ? 'opacity-50' : 'hover:bg-blue-500'}`}
            >
              <span className="text-sm font-medium">{currentStep === 5 ? 'Fin' : 'Siguiente'}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </footer>

          {/* Desktop Footer */}
          <footer className="hidden lg:flex items-center justify-between p-6 border-t border-white/5 bg-slate-900/30 backdrop-blur-md">
            <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-200">
              <span className="material-symbols-outlined">arrow_back</span>
              <span>Atrás</span>
            </button>
            <div className="flex items-center gap-3">
              <button onClick={handleClearStep} className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                <span className="material-symbols-outlined">delete_sweep</span>
                <span>Limpiar</span>
              </button>
              <button onClick={nextStep} className={`flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-blue-500 hover:shadow-lg hover:shadow-primary/20 ${currentStep === 5 ? 'opacity-50' : ''}`}>
                <span>{currentStep === 5 ? 'Finalizar' : 'Siguiente'}</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </footer>

          {/* Mobile Bottom Tab Bar */}
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 flex border-t border-white/5 bg-slate-900/95 backdrop-blur-md px-1 py-1 z-50">
            {[
              { icon: 'home', label: 'Inicio', view: 'dashboard' as ViewType },
              { icon: 'add_circle', label: 'Nueva', view: 'quote' as ViewType },
              { icon: 'info', label: 'Info', view: 'info' as ViewType }
            ].map((item) => (
              <button 
                key={item.label} 
                onClick={() => item.view && handleNavigate(item.view)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2 ${currentView === item.view ? 'text-primary' : 'text-slate-500'}`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
